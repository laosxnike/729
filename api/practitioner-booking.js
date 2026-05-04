const { json, parseJsonBody, postWebhook } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.email || !body.practitionerId) {
      return json(res, 400, { error: "Email and practitioner are required." });
    }

    const result = await postWebhook(process.env.PRACTITIONER_BOOKING_WEBHOOK_URL, {
      type: "practitioner-booking",
      createdAt: new Date().toISOString(),
      ...body
    });

    if (result.missing) return json(res, 503, { error: "Practitioner booking webhook is not connected yet." });
    if (!result.ok) return json(res, 502, { error: "Practitioner booking webhook rejected the request." });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Practitioner booking failed" });
  }
};
