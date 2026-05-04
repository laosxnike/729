const { json, parseJsonBody, postWebhook } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.name || !body.email || !body.type) {
      return json(res, 400, { error: "Name, email, and inquiry type are required." });
    }

    const result = await postWebhook(process.env.CONTACT_WEBHOOK_URL, {
      type: body.type,
      createdAt: new Date().toISOString(),
      ...body
    });

    if (result.missing) return json(res, 503, { error: "Contact webhook is not connected yet." });
    if (!result.ok) return json(res, 502, { error: "Contact webhook rejected the request." });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Inquiry failed" });
  }
};
