const { json } = require("./_shared");

module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const e = process.env;
  json(res, 200, {
    stripe: !!e.STRIPE_SECRET_KEY,
    email: !!(e.RESEND_API_KEY && e.OWNER_EMAIL),
    reservationWebhook: !!e.RESERVATION_WEBHOOK_URL,
    contactWebhook: !!e.CONTACT_WEBHOOK_URL,
    intakeWebhook: !!e.PRACTITIONER_INTAKE_WEBHOOK_URL,
    bookingWebhook: !!e.PRACTITIONER_BOOKING_WEBHOOK_URL,
    productsSheet: !!e.PRODUCTS_CSV_URL,
    eventsSheet: !!e.EVENTS_CSV_URL,
    practitionersSheet: !!e.PRACTITIONERS_CSV_URL,
    siteUrl: e.SITE_URL || null
  });
};
