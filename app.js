// const fs = require('fs');
// const axios = require('axios');

// const URL = 'https://script.google.com/macros/s/AKfycbzrkVFRmlpQpnE2kmTcPWInk3drGxdl0U9OlG9Kkcnm2qihwCAcXwTdmg2TDZh0SzqKoQ/exec';

// function convertToThumbnail(url, size = 600) {
//   const match = url.match(/id=([^&]+)/);
//   if (match && match[1]) {
//     return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${size}`;
//   }
//   return url;
// }

// function processObject(obj) {
//   if (!obj || typeof obj !== 'object') return;

//   if (Array.isArray(obj)) {
//     obj.forEach((item, index) => {
//       if (typeof item === 'string' && item.includes('drive.google.com/uc?')) {
//         obj[index] = convertToThumbnail(item);
//       } else if (typeof item === 'object') {
//         processObject(item);
//       }
//     });
//   } else {
//     for (let key in obj) {
//       if (key === 'images' && Array.isArray(obj[key])) {
//         obj[key] = obj[key].map(url => {
//           if (typeof url === 'string' && url.includes('drive.google.com/uc?')) {
//             return convertToThumbnail(url);
//           }
//           return url;
//         });
//       } else if (typeof obj[key] === 'object' && obj[key] !== null) {
//         processObject(obj[key]);
//       }
//     }
//   }
// }

// axios.get(URL)
//   .then(response => {
//     let data = response.data;

//     processObject(data);

//     fs.writeFile('photo.json', JSON.stringify(data, null, 2), err => {
//       if (err) {
//         console.error('Error writing file:', err);
//       } else {
//         console.log('✅ Data saved to photo.json with thumbnail URLs!');
//       }
//     });
//   })
//   .catch(error => {
//     console.error('Axios fetch error:', error);
//   });


  const fs = require('fs');
const axios = require('axios');

const URL = 'https://script.google.com/macros/s/AKfycbzrkVFRmlpQpnE2kmTcPWInk3drGxdl0U9OlG9Kkcnm2qihwCAcXwTdmg2TDZh0SzqKoQ/exec';

function processObject(obj) {
  if (!obj || typeof obj !== 'object') return;

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      if (typeof item === 'object') {
        processObject(item);
      }
    });
  } else {
    for (let key in obj) {
      if (key === 'images' && Array.isArray(obj[key])) {
        // ✅ Do nothing (keep original URLs as they are)
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        processObject(obj[key]);
      }
    }
  }
}

axios.get(URL)
  .then(response => {
    let data = response.data;

    processObject(data);

    fs.writeFile('photo.json', JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('✅ Data saved to photo.json without thumbnail conversion!');
      }
    });
  })
  .catch(error => {
    console.error('Axios fetch error:', error);
  });
