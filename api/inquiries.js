const { json, parseJsonBody, postWebhook, sendEmail, fmtPayloadHtml } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.name || !body.email || !body.type) {
      return json(res, 400, { error: "Name, email, and inquiry type are required." });
    }

    const payload = { type: body.type, createdAt: new Date().toISOString(), ...body };

    const webhookResult = await postWebhook(process.env.CONTACT_WEBHOOK_URL, payload);
    if (!webhookResult.missing) {
      if (!webhookResult.ok) return json(res, 502, { error: "Contact webhook rejected the request." });
      return json(res, 200, { ok: true });
    }

    const typeLabel = body.type === "rental" ? "Rental Inquiry" : "Contact Inquiry";
    const emailResult = await sendEmail(
      `New ${typeLabel} — ${body.name}`,
      `<h2 style="margin:0 0 16px">New ${typeLabel}</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${fmtPayloadHtml(payload)}</table>`
    );
    if (emailResult.missing) return json(res, 503, { error: "Contact form is not connected yet. Please email us directly." });
    if (!emailResult.ok) return json(res, 502, { error: "Could not send inquiry notification." });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Inquiry failed" });
  }
};
