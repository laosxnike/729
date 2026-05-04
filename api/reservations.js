const { json, parseJsonBody, postWebhook } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.email) return json(res, 400, { error: "Email is required to reserve a spot." });

    const result = await postWebhook(process.env.RESERVATION_WEBHOOK_URL, {
      type: "reservation",
      createdAt: new Date().toISOString(),
      ...body
    });

    if (result.missing) return json(res, 503, { error: "Reservation webhook is not connected yet." });
    if (!result.ok) return json(res, 502, { error: "Reservation webhook rejected the request." });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Reservation failed" });
  }
};
