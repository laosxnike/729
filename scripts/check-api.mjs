import { existsSync } from "node:fs";

const required = [
  "api/content.js",
  "api/checkout.js",
  "api/reservations.js",
  "api/practitioner-intake.js",
  "api/practitioner-booking.js",
  "api/inquiries.js",
  "shared.js",
  "shop.html",
  "calendar.html",
  "practitioners.html",
  "practitioner-intake.html"
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error(`Missing files:\n${missing.join("\n")}`);
  process.exit(1);
}

console.log("Backend files present");
