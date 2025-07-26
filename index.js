const xlsx = require("xlsx");
const fs = require("fs");

// Load the workbook
const workbook = xlsx.readFile("./Botanix_Data.xlsx");

// Step 1: Process the Category sheet
const categorySheet = workbook.Sheets["Category"];
const categoryDataRaw = xlsx.utils.sheet_to_json(categorySheet, { defval: "" });

// Build category map: { category_id: category_name }
const categoryMap = new Map();
categoryDataRaw.forEach((item) => {
  const id = String(item.category_id || "").trim();
  const name = String(item["category name"] || "").trim();
  if (id && !categoryMap.has(id)) {
    categoryMap.set(id, name);
  }
});

// Save category map to JSON
const uniqueCategories = Array.from(categoryMap.entries()).map(([id, name]) => ({
  category_id: id,
  category_name: name,
}));
fs.writeFileSync("categories.json", JSON.stringify(uniqueCategories, null, 2));
console.log("✅ Saved categories.json");

// Step 2: Process all other sheets
let globalId = 1;
const allGeneratedIds = new Set();
const generateId = (num) => `P${num.toString().padStart(4, "0")}`;

// Define custom headers (cleaned up and fixed)
const customHeaders = [
  "Extract Name",
  "Botanical Name",
  "Part Used",
  "Typical Extraction Ratio",
  "Active Compound",
  "Primary Benefit",
  "Category",
  "Unit in Order",    // fixed
  "Package Size",     // fixed
  "Appearance"
];

// Process each sheet
workbook.SheetNames.forEach((sheetName) => {
  if (sheetName === "Category") return;

  console.log(`🔄 Processing sheet: ${sheetName}`);

  const sheet = workbook.Sheets[sheetName];

  // Read data using custom headers
  const jsonData = xlsx.utils.sheet_to_json(sheet, {
    header: customHeaders,
    range: 1, // skip broken headers
    defval: "",
  });

  const updatedData = jsonData.map((row, index) => {
    const updatedRow = { ...row };

    // Normalize and map category
    const categoryId = String(updatedRow.Category || "").trim();
    updatedRow.category_name = categoryMap.get(categoryId) || "Unknown";

    if (!categoryMap.has(categoryId) && categoryId) {
      console.warn(`⚠️ Unknown category "${categoryId}" in ${sheetName}, row ${index + 2}`);
    }

    // Assign unique ID
    const newId = generateId(globalId++);
    if (allGeneratedIds.has(newId)) {
      throw new Error(`❌ Duplicate ID detected: ${newId}`);
    }

    updatedRow.id = newId;
    allGeneratedIds.add(newId);

    return updatedRow;
  });

  // Save JSON file (sanitize sheet name)
  const safeFileName = sheetName.replace(/[\/\\?%*:|"<>]/g, "-");
  fs.writeFileSync(`${safeFileName}.json`, JSON.stringify(updatedData, null, 2));
  console.log(`✅ Saved ${safeFileName}.json`);
});

console.log(`🎉 Done! Total unique product IDs: ${allGeneratedIds.size}`);
