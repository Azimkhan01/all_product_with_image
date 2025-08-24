const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

// Load the Excel file
const filePath = path.join(__dirname, "description.xlsx");
const workbook = xlsx.readFile(filePath);

// Get Sheet1
const sheetName = "Sheet1";
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = xlsx.utils.sheet_to_json(worksheet);

// Save to description.json
const jsonPath = path.join(__dirname, "description.json");
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");

console.log("✅ description.json file is created successfully at:", jsonPath);
