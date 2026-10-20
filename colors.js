const fs = require("fs");

const html = fs
  .readFileSync("thank-you-email.html", "utf8")
  .replace(/<style[\s\S]*?<\/style>/, "");

const counts = {};
for (const color of html.match(/#[0-9a-fA-F]{6}/g)) {
  const c = color.toLowerCase();
  counts[c] = (counts[c] || 0) + 1;
}

console.table(counts);