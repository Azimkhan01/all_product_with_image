write a node script such that there is two json file one name is all_produt and other is photo.json  so the structure of all product is 
[
  {
    "Extract Name": "Curcumin 95% ",
    "Botanical Name": "Turmeric",
    "Part Used": "Rhizome (root)",
    "Typical Extraction Ratio": "",
    "Active Compound": 0.95,
    "Primary Benefit": "Contains curcumin, a powerful anti-inflammatory and antioxidant.",
    "Category": "53bcb1a7-d565-4dc2-b2e7-e33f44f75435",
    "Unit in Order": "kg",
    "Package Size": "1 kg",
    "Appearance": "25kg",
    "category_name": "Phytochemicals",
    "id": "P0311"
  },
  {
    "Extract Name": "Beta-Carotene 10%",
    "Botanical Name": "Carrot",
    "Part Used": "Root",
    "Typical Extraction Ratio": "",
    "Active Compound": 0.1,
    "Primary Benefit": "Rich in beta-carotene (Vitamin A) for eye health, fiber, and antioxidants.",
    "Category": "53bcb1a7-d565-4dc2-b2e7-e33f44f75435",
    "Unit in Order": "kg",
    "Package Size": "1 kg",
    "Appearance": "25kg",
    "category_name": "Phytochemicals",
    "id": "P0312"
  },....]
and photo.json is 
{
  "Vitamins And Minerals": [
    ...
  ],
  "Herbal Powder": [... ],
  "Herbal Extract": [... ],
  "Fruit Extract": [
    ...
   ],
  "Phytochemical": [
   ...
  ]
}

so i want that from all the product there is category name so take that cetegory anme and in trhat find with that category name in the photo folder with the name of the product and insert that image in that particular folderr 