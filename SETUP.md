# Owner Setup

## Stripe

For every paid product/event/practitioner session, paste the existing Stripe Price ID into the sheet.

Stripe Product -> Pricing -> copy the value that starts with `price_`.

Required Vercel env values:

```txt
STRIPE_SECRET_KEY=sk_live_...
SITE_URL=https://your-domain.com
STRIPE_SUCCESS_URL=https://your-domain.com/success.html
STRIPE_CANCEL_URL=https://your-domain.com/shop.html
```

## Products sheet

Publish a Google Sheet tab as CSV with these columns:

```csv
id,name,cat,catLabel,price,priceId,flag,glyph,status
```

The `id` must match the site product id, such as `s1`. Set `status` to `active`.

## Events sheet

```csv
id,day,date,num,title,titleEm,time,host,price,priceId,room,desc,badge,discipline,status
```

Use a Stripe `priceId` for paid reservations. Free events submit to the reservation webhook.

## Practitioners sheet

```csv
id,name,discipline,practice,bio,price,priceId,glyph,email,phone,bookingUrl,status
```

Practitioners can submit to `/practitioner-intake.html`; the owner reviews rows before setting `status` to `active`.

## Webhooks

Use Google Apps Script, Zapier, Make, or Airtable webhooks:

```txt
RESERVATION_WEBHOOK_URL=
PRACTITIONER_INTAKE_WEBHOOK_URL=
PRACTITIONER_BOOKING_WEBHOOK_URL=
CONTACT_WEBHOOK_URL=
```

If a webhook is blank, the public form gives a setup message instead of pretending the request was sent.
