const { json, parseJsonBody, postWebhook } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.name || !body.email || !body.discipline) {
      return json(res, 400, { error: "Name, email, and discipline are required." });
    }

    const result = await postWebhook(process.env.PRACTITIONER_INTAKE_WEBHOOK_URL, {
      type: "practitioner-intake",
      status: "draft",
      createdAt: new Date().toISOString(),
      ...body
    });

    if (result.missing) return json(res, 503, { error: "Practitioner intake webhook is not connected yet." });
    if (!result.ok) return json(res, 502, { error: "Practitioner intake webhook rejected the request." });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Practitioner intake failed" });
  }
};
