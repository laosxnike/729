const { json, parseJsonBody, postWebhook, sendEmail, fmtPayloadHtml } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseJsonBody(req);
    if (!body.name || !body.email || !body.discipline) {
      return json(res, 400, { error: "Name, email, and discipline are required." });
    }

    const payload = {
      type: "practitioner-intake",
      status: "draft",
      createdAt: new Date().toISOString(),
      ...body
    };

    const webhookResult = await postWebhook(process.env.PRACTITIONER_INTAKE_WEBHOOK_URL, payload);
    if (!webhookResult.missing && !webhookResult.ok) {
      return json(res, 502, { error: "Practitioner intake webhook rejected the request." });
    }

    const ownerNotified = webhookResult.ok
      ? true
      : (await sendEmail(
          `New Practitioner Application — ${body.name}`,
          `<h2 style="margin:0 0 16px">New Practitioner Application</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${fmtPayloadHtml(payload)}</table><p style="margin-top:16px;color:#888;font-size:12px">Status: draft — add to your Practitioners sheet to publish.</p>`
        )).ok;

    // Confirmation email to the practitioner
    await sendEmail(
      "Your application to Community 729 was received",
      `<p>Hi ${body.name},</p>
<p>Thank you for applying to join the Community 729 practitioner directory. We received your application for <strong>${body.discipline}</strong>${body.practice ? ` (${body.practice})` : ""} and will be in touch within a few business days.</p>
<p>If you have any questions in the meantime, please reply to this email or reach out directly.</p>
<p>Warmly,<br>The Community 729 Team</p>`,
      body.email
    );

    if (!ownerNotified && webhookResult.missing) {
      return json(res, 503, { error: "Intake form is not connected yet. Please contact us directly." });
    }

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, { error: error.message || "Practitioner intake failed" });
  }
};
