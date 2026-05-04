const { json, parseJsonBody, postWebhook, sendEmail, fmtPayloadHtml } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.email || !body.practitionerId) {
      return json(res, 400, { error: "Email and practitioner are required." });
    }

    const payload = { type: "practitioner-booking", createdAt: new Date().toISOString(), ...body };

    const webhookResult = await postWebhook(process.env.PRACTITIONER_BOOKING_WEBHOOK_URL, payload);
    if (!webhookResult.missing) {
      if (!webhookResult.ok) return json(res, 502, { error: "Practitioner booking webhook rejected the request." });
      return json(res, 200, { ok: true });
    }

    const emailResult = await sendEmail(
      `New Practitioner Booking — ${body.practitionerName || body.practitionerId}`,
      `<h2 style="margin:0 0 16px">New Practitioner Booking Request</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${fmtPayloadHtml(payload)}</table>`
    );
    if (emailResult.missing) return json(res, 503, { error: "Booking is not connected yet. Please contact us directly." });
    if (!emailResult.ok) return json(res, 502, { error: "Could not send booking notification." });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Practitioner booking failed" });
  }
};
