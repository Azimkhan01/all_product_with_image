const fs = require('fs');

// Read the product and photo JSON files
let products = JSON.parse(fs.readFileSync('All_Products.json', 'utf-8'));
const photos = JSON.parse(fs.readFileSync('photo.json', 'utf-8'));

console.log(Object.keys(photos))


// let newData = products.map((data,i)=>{
//   // console.log(data)

  
// })
// let i=0
// for(data of products)
// {

//     console.log('====================================');
//   console.log(data['Botanical Name'])
//   console.log(data['category_name'])
//   console.log(Object.keys(photos).includes(data['category_name']))
//   console.log('====================================');
// i++
// if(i==500)
// {
//   break
// }



// }

products = products.map((data)=>{data['Extract Name'] = data['Extract Name'].trim()
  return data
}) 

const newdata = 
products.map((data,i)=>{
  
  const categorykey = Object.keys(photos).filter((da,i)=> da == data["category_name"])
  // console.log("the category found is this:",categorykey)

  const particulardata = photos[categorykey].filter((dat,i)=> dat.nam == data['Extract Name'].trim()||dat.nam == data['Extract Name'].trim()   )
  // console.log(particulardata)

  return {...data,images:particulardata[0]}
})
let d = newdata
fs.writeFileSync('All_Products_WithImages.json', JSON.stringify(d, null, 2), 'utf-8');

// console.log(newdata)