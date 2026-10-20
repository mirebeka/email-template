const fs = require("fs");

const commonData = {
  logo_url: "../assets/logo.png",
  tutorials_url:
    "https://www.etsy.com/shop/NeedleNoodleDesign?ref=seller-platform-mcnav&section_id=57765964",
};

const testCases = [
  {
    name: "short-name",
    data: {
      customer_name: "Anna",
      order_number: "1234567890",
      pattern_name: "Christmas Tree Embroidery Pattern",
      price: "€6.99",
    },
  },
  {
    name: "long-name",
    data: {
      customer_name: "Alexandra-Maria Kowalczyk-Szabó",
      order_number: "1234567898",
      pattern_name: "Wildflower Bouquet Hoop Embroidery Pattern Bundle",
      price: "€7.99",
    },
  },
  {
    name: "special-characters",
    data: {
      customer_name: "Zoë <b>O'Brien</b> & Co",
      order_number: "1234567897",
      pattern_name: "Stick & Stitch Halloween Bundle",
      price: "€12.99",
    },
  },
];

// Escape special characters so a value like "<b>Anna</b>" cannot break the HTML
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


function render(template, data) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    return key in data ? escapeHtml(data[key]) : match;
  });
}

const template = fs.readFileSync("thank-you-email.html", "utf8");

// Start from a clean previews folder on every run
fs.rmSync("previews", { recursive: true, force: true });
fs.mkdirSync("previews", { recursive: true });

for (const testCase of testCases) {
  const data = { ...commonData, ...testCase.data };
  const html = render(template, data);

  // Warn if any placeholder was not replaced
  const leftovers = html.match(/\{\{\s*\w+\s*\}\}/g);
  if (leftovers) {
    console.warn(`Unreplaced placeholders in ${testCase.name}:`, leftovers);
  }

  const fileName = `previews/thank-you-${testCase.name}.html`;
  fs.writeFileSync(fileName, html);
  console.log(`Created: ${fileName}`);
}