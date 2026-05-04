# Community 729 Backend Handoff

The finished static site stays intact. This repo adds the backend layer needed to run it on Vercel:

- `api/content` reads products, events, and practitioners from Google Sheet CSV links.
- `api/checkout` creates Stripe Checkout Sessions using existing Stripe `price_...` IDs.
- `api/reservations` sends free event RSVPs and waitlist requests to a webhook.
- `api/inquiries` sends contact and rental inquiry forms to the owner's webhook.
- `api/practitioner-intake` lets practitioners submit profile info into the owner's workflow.
- `api/practitioner-booking` lets visitors request sessions with a practitioner.

See `SETUP.md` for the owner spreadsheet columns and required Vercel environment variables.
