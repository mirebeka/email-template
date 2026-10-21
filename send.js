const fs = require("fs");
const nodemailer = require("nodemailer");

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;

for (const [name, value] of Object.entries({
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  MAIL_TO,
})) {
  if (!value) {
    console.error(`Missing ${name}. Copy .env.example to .env and fill it in.`);
    process.exit(1);
  }
}

const data = {
  logo_url:
    "https://raw.githubusercontent.com/mirebeka/email-template/main/assets/logo-placeholder.png",
  logo_alt: "Logo",
  shop_name: "Example Shop",
  shop_tagline: "Hand embroidery patterns",
  shop_url: "https://example.com/shop",
  instagram_url: "https://example.com/instagram",
  instagram_handle: "@exampleshop",
  tutorials_url: "https://example.com/tutorials",
  customer_name: "Anna",
  order_number: "1234567890",
  pattern_name: "Christmas Tree Embroidery Pattern",
  price: "€6.99",
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function render(template, values) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) =>
    key in values ? escapeHtml(values[key]) : match,
  );
}

const html = render(fs.readFileSync("thank-you-email.html", "utf8"), data);

const leftovers = html.match(/\{\{\s*\w+\s*\}\}/g);
if (leftovers) {
  console.warn("Unreplaced placeholders:", leftovers);
}


const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

transporter
  .sendMail({
    from: `"Template test" <${SMTP_USER}>`,
    to: MAIL_TO,
    subject: `Thank you for your order, ${data.customer_name}!`,
    text: "Thank you for your order! Open this email in an HTML-capable client.",
    html,
  })
  .then((info) => console.log("Sent:", info.messageId))
  .catch((err) => {
    console.error("Send failed:", err.message);
    process.exit(1);
  });
