const fs = require('fs');

// Read the product and photo JSON files
const products = JSON.parse(fs.readFileSync('All_Products.json', 'utf-8'));
const photos = JSON.parse(fs.readFileSync('photo.json', 'utf-8'));

const newdata = products.map((data) => {
  // Clean and normalize names
  const extractName = data['Extract Name']?.trim() || '';
  const categoryName = data['category_name']?.trim() || '';

  // Find the correct category in photo.json
  const categoryKey = Object.keys(photos).find(key => key === categoryName);

  // Match extract name inside the category (case-insensitive)
  const particulardata = photos[categoryKey]?.filter(dat =>
    dat.nam?.trim().toLowerCase() === extractName.toLowerCase()
  );

  return {
    ...data,
    images: particulardata?.[0]?.images || [] // Add images or empty array
  };
});

// Write merged data to a new JSON file
fs.writeFileSync('All_Products_WithImages.json', JSON.stringify(newdata, null, 2), 'utf-8');

console.log('✅ File created: All_Products_WithImages.json');






// const fs = require('fs');

// // Read the product and photo JSON files
// const products = JSON.parse(fs.readFileSync('All_Products.json', 'utf-8'));
// const photos = JSON.parse(fs.readFileSync('photo.json', 'utf-8'));

// const newdata = products.map((data) => {
//   // Clean and normalize names
//   const extractName = data['Extract Name']?.trim() || '';
//   const categoryName = data['category_name']?.trim() || '';

//   // Find matching category in photo.json
//   const categoryKey = Object.keys(photos).find(key => key === categoryName);

//   // Match by extract name (case-insensitive)
//   const particulardata = photos[categoryKey]?.filter(dat =>
//     dat.nam?.trim().toLowerCase() === extractName.toLowerCase()
//   );

//   // Get raw image URLs (if found)
//   const rawImages = particulardata?.[0]?.images || [];

//   // Convert each image to direct Google Drive view link
//   const images = rawImages.map((img) => {
//     const match = img.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]{10,})/);
//     const fileId = match?.[1];
//     return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : img;
//   });

//   return {
//     ...data,
//     images, // add transformed image URLs
//   };
// });

// // Write merged data to a new JSON file
// fs.writeFileSync('All_Products_WithImages.json', JSON.stringify(newdata, null, 2), 'utf-8');

// console.log('✅ File created: All_Products_WithImages.json');
