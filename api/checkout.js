const { getStripe, json, loadContent, parseJsonBody, readMap } = require("./_shared");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const stripe = getStripe();
  if (!stripe) return json(res, 503, { error: "Stripe is not connected yet." });

  try {
    const body = await parseJsonBody(req);
    const { products, events, practitioners } = await loadContent();
    const catalog = [...products, ...events, ...practitioners];
    const requested = Array.isArray(body.items) ? body.items : [];
    const fallbackPrices = {
      ...readMap("PRODUCT_PRICE_MAP"),
      ...readMap("EVENT_PRICE_MAP"),
      ...readMap("PRACTITIONER_PRICE_MAP")
    };

    if (!requested.length) return json(res, 400, { error: "No checkout items provided." });

    const lineItems = [];
    const metadata = {};

    for (const item of requested) {
      const source = catalog.find((entry) => entry.id === item.id);
      const priceId = source?.priceId || fallbackPrices[item.id] || "";
      if (!priceId) {
        return json(res, 400, {
          error: `${source?.name || source?.title || item.name || item.id} is missing a Stripe Price ID.`
        });
      }

      lineItems.push({
        price: priceId,
        quantity: Math.max(1, Number(item.qty || 1))
      });
      metadata[item.id] = String(item.qty || 1);
    }

    const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.email || undefined,
      line_items: lineItems,
      metadata: {
        source: "community-729",
        ...metadata
      },
      success_url: process.env.STRIPE_SUCCESS_URL || `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL || `${siteUrl}/shop.html`
    });

    json(res, 200, { url: session.url });
  } catch (error) {
    json(res, 500, { error: error.message || "Checkout failed" });
  }
};
