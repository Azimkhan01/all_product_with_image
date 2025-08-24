const fs = require("fs");
const path = require("path");

// Load both files
const products = JSON.parse(fs.readFileSync(path.join(__dirname, "All_Products_WithImages.json"), "utf-8"));
const descriptions = JSON.parse(fs.readFileSync(path.join(__dirname, "description.json"), "utf-8"));

// Create a lookup map for faster matching (ID -> description text)
const descriptionMap = {};
descriptions.forEach(item => {
  if (item.ID) {
    descriptionMap[item.ID] = item.Descirption;
  }
});

// Merge description into products
const mergedProducts = products.map(product => {
  const desc = descriptionMap[product.id];
  if (desc) {
    return {
      ...product,
      description: desc   // add/update description
    };
  }
  return product;
});

// Save merged result
fs.writeFileSync(
  path.join(__dirname, "All_Products_WithDescriptions.json"),
  JSON.stringify(mergedProducts, null, 2),
  "utf-8"
);

console.log("✅ Merged file created: All_Products_WithDescriptions.json");
