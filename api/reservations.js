const { json, parseJsonBody, postWebhook, sendEmail, fmtPayloadHtml } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.email) return json(res, 400, { error: "Email is required to reserve a spot." });

    const payload = { type: "reservation", createdAt: new Date().toISOString(), ...body };

    const webhookResult = await postWebhook(process.env.RESERVATION_WEBHOOK_URL, payload);
    if (!webhookResult.missing) {
      if (!webhookResult.ok) return json(res, 502, { error: "Reservation webhook rejected the request." });
      return json(res, 200, { ok: true });
    }

    const emailResult = await sendEmail(
      `New Reservation — ${body.eventTitle || body.eventId || "Event"}`,
      `<h2 style="margin:0 0 16px">New Reservation</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${fmtPayloadHtml(payload)}</table>`
    );
    if (emailResult.missing) return json(res, 503, { error: "Reservations are not connected yet. Please contact us directly." });
    if (!emailResult.ok) return json(res, 502, { error: "Could not send reservation notification." });

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Reservation failed" });
  }
};
