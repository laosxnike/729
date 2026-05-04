const Stripe = require("stripe");
const { Resend } = require("resend");

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function normalizeKey(key) {
  return String(key || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function splitCsvRows(csv) {
  const rows = [];
  let row = "";
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      row += char + next;
      index += 1;
      continue;
    }

    if (char === '"') inQuotes = !inQuotes;

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (row.trim()) rows.push(row);
      row = "";
      if (char === "\r" && next === "\n") index += 1;
      continue;
    }

    row += char;
  }

  if (row.trim()) rows.push(row);
  return rows;
}

function parseCsvLine(line) {
  const cells = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(cell.trim());
      cell = "";
      continue;
    }

    cell += char;
  }

  cells.push(cell.trim());
  return cells;
}

function csvToRows(csv) {
  const rows = splitCsvRows(csv);
  if (rows.length < 2) return [];
  const headers = parseCsvLine(rows[0]).map(normalizeKey);

  return rows.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return headers.reduce((row, header, index) => {
      row[header] = cells[index] || "";
      return row;
    }, {});
  });
}

async function fetchCsv(url) {
  if (!url) return [];
  const response = await fetch(url);
  if (!response.ok) throw new Error(`CSV fetch failed: ${response.status}`);
  return csvToRows(await response.text());
}

function value(row, ...keys) {
  for (const key of keys) {
    const found = row[normalizeKey(key)];
    if (found) return String(found).trim();
  }
  return "";
}

function numberValue(row, ...keys) {
  const raw = value(row, ...keys);
  if (!raw) return 0;
  const parsed = Number(String(raw).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function active(row) {
  const status = value(row, "status").toLowerCase();
  return !status || status === "active" || status === "published";
}

function readMap(envName) {
  try {
    return JSON.parse(process.env[envName] || "{}");
  } catch {
    return {};
  }
}

async function loadProducts() {
  const priceMap = readMap("PRODUCT_PRICE_MAP");
  const rows = await fetchCsv(process.env.PRODUCTS_CSV_URL);
  return rows.filter(active).map((row) => {
    const id = value(row, "id", "slug", "sku");
    return {
      id,
      name: value(row, "name", "title", "product"),
      cat: value(row, "cat", "category") || "card",
      catLabel: value(row, "catLabel", "categoryLabel", "collection"),
      price: numberValue(row, "price", "amount", "cost"),
      priceId: value(row, "priceId", "stripePriceId", "stripe price id") || priceMap[id] || "",
      flag: value(row, "flag", "badge"),
      glyph: value(row, "glyph", "icon") || "card"
    };
  }).filter((item) => item.id && item.name);
}

async function loadEvents() {
  const priceMap = readMap("EVENT_PRICE_MAP");
  const rows = await fetchCsv(process.env.EVENTS_CSV_URL);
  return rows.filter(active).map((row) => {
    const id = value(row, "id", "slug");
    return {
      id,
      day: value(row, "day"),
      date: value(row, "date"),
      num: numberValue(row, "num", "dayNumber"),
      title: value(row, "title", "name", "event"),
      titleEm: value(row, "titleEm", "emphasis"),
      time: value(row, "time", "startTime"),
      host: value(row, "host", "instructor", "practitioner"),
      price: numberValue(row, "price", "cost"),
      priceId: value(row, "priceId", "stripePriceId", "stripe price id") || priceMap[id] || "",
      room: value(row, "room", "location"),
      desc: value(row, "desc", "description", "details"),
      badge: value(row, "badge", "flag"),
      discipline: value(row, "discipline", "category", "type")
    };
  }).filter((item) => item.id && item.title);
}

async function loadPractitioners() {
  const priceMap = readMap("PRACTITIONER_PRICE_MAP");
  const rows = await fetchCsv(process.env.PRACTITIONERS_CSV_URL);
  return rows.filter(active).map((row) => {
    const id = value(row, "id", "slug");
    return {
      id,
      name: value(row, "name"),
      discipline: value(row, "discipline", "service", "category"),
      practice: value(row, "practice", "title", "specialty"),
      bio: value(row, "bio", "about", "description"),
      price: numberValue(row, "price", "rate"),
      priceId: value(row, "priceId", "stripePriceId", "stripe price id") || priceMap[id] || "",
      glyph: value(row, "glyph", "icon") || "meditation",
      email: value(row, "email"),
      phone: value(row, "phone"),
      bookingUrl: value(row, "bookingUrl", "booking link", "website")
    };
  }).filter((item) => item.id && item.name);
}

async function loadContent() {
  const [products, events, practitioners] = await Promise.all([
    loadProducts(),
    loadEvents(),
    loadPractitioners()
  ]);

  return { products, events, practitioners };
}

async function postWebhook(url, payload) {
  if (!url) return { ok: false, missing: true };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return { ok: response.ok, status: response.status };
}

async function sendEmail(subject, html, toOverride) {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!apiKey || !ownerEmail) return { ok: false, missing: true };

  const resend = new Resend(apiKey);
  const to = toOverride || ownerEmail;
  const from = process.env.EMAIL_FROM || "Community 729 <notifications@resend.dev>";

  try {
    const { error } = await resend.emails.send({ from, to, subject, html });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function fmtPayloadHtml(payload) {
  return Object.entries(payload)
    .filter(([k]) => k !== "type")
    .map(([k, v]) => `<tr><td style="padding:4px 8px;font-weight:600;color:#555;white-space:nowrap">${k}</td><td style="padding:4px 8px">${String(v).replace(/</g, "&lt;")}</td></tr>`)
    .join("");
}

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-04-22.dahlia"
  });
}

module.exports = {
  fmtPayloadHtml,
  getStripe,
  json,
  loadContent,
  parseJsonBody,
  postWebhook,
  readMap,
  sendEmail
};
