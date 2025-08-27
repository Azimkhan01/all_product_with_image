// const fs = require('fs');
// const axios = require('axios');

// // const URL = 'https://script.google.com/macros/s/AKfycbzrkVFRmlpQpnE2kmTcPWInk3drGxdl0U9OlG9Kkcnm2qihwCAcXwTdmg2TDZh0SzqKoQ/exec';
// const URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLj9ekrqO0a0arkeeXGcWpFETaUZBR_KqT1DgBrz8HDn7WPbbz-Gftz-f2AAcu4V_xMLOmL7jTw7qFqhVzaIyvoTBWfvmRldcbUXcwTq61ZHla33LVFxZMNY4mHTwVrI-0TgeXJ1dDKHkY7vQwbg6CeE_FL4bLU--bge2a-yBxyd7Fg--hLJC0AvrYxCYb77_G6zHfYC9Gv_mZXvfA-l6FSDnJrL8YG4dQHJuqUBhD2KBxpAw2xsYf8Ywf_op2_Z9MKenJfm613Me_100aqWqUk3X0DgYg&lib=MfVvOQIj5FnJyBi_VUizwfwY0VAoHi_0T';

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

// const URL = 'https://script.google.com/macros/s/AKfycbzrkVFRmlpQpnE2kmTcPWInk3drGxdl0U9OlG9Kkcnm2qihwCAcXwTdmg2TDZh0SzqKoQ/exec';
const URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhD9UL9T-wPVzJvJjZS5N1j7_hwjTMryzx16KvPYLnJ5Wa3r9qN_JWGc-WgK6Cbre9ARojywepWxWh77b5msi-9Ho_ZjFGt625hgxvoFh2p1Cx-cnbBgr2VLfuOPZOT1EPq5-sLj6NTs5ewG6qStZN0Rtg36VWL7tsWOwSPImmOgXyXBZuhuhrCiMralfIthkEoHXQzs4bwSCuB8AlBHyQJaowQk2Aire73fvQwm-2xoesjxLE33vfCVGf4nIKKHLya-cIRVX46xna10OEXyCOwuTq39Q&lib=MMGBW__kJqNwUf6zrF2oDNE1qhupCZHy3';

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
