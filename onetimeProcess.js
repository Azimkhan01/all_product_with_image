// processData.js
const fs = require("fs");
const path = require("path");

// Resolve path to JSON file
const filePath = path.resolve(__dirname, "All_Products_WithDescriptions.json");

// Read JSON file
let rawData = fs.readFileSync(filePath, "utf-8");

// Parse JSON
let data;
try {
  data = JSON.parse(rawData);
} catch (err) {
  console.error("❌ Error parsing JSON file:", err.message);
  process.exit(1);
}

// Function to modify Botanical Name
function modifyBotanicalName(item) {
  const category = item.category_name?.toLowerCase() || "";

  if (category.includes("fruit extract") || category.includes("herbal extract")) {
    if (!item["Extract Name"].toLowerCase().includes("extract")) {
      item["Extract Name"] += " Extract";
    }
  } else if (category.includes("herbal powder")) {
    if (!item["Extract Name"].toLowerCase().includes("powder")) {
      item["Extract Name"] += " Powder";
    }
  }

  return item;
}

// Process products
let updatedData = data.map(modifyBotanicalName);

// Save updated JSON
const outPath = path.resolve(__dirname, "Updated_Products.json");
fs.writeFileSync(outPath, JSON.stringify(updatedData, null, 2), "utf-8");

console.log("✅ Processing complete. File saved as", outPath);
