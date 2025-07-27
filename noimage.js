const fs = require('fs');

// Read the file
const products = JSON.parse(fs.readFileSync('All_Products_WithImages.json', 'utf-8'));

// Find products with no images
const productsWithoutImages = products.filter(product => !product.images || product.images.length === 0);

// Print results
console.log(`Total products without images: ${productsWithoutImages.length}`);
console.log(productsWithoutImages.map(p => ({
    id: p.id,
    name: p['Extract Name'],
    category: p['category_name']
})));

// Optional: Save to a file
fs.writeFileSync('Products_Without_Images.json', JSON.stringify(productsWithoutImages, null, 2), 'utf-8');

console.log('✅ File created: Products_Without_Images.json');
