
let fs = require('fs');


  let datas = [];
  fs.readdir('../data/', (err, files) => {
    
    files.forEach(file => {
      console.log(file);
      datas.push(file);
    });
  });
  console.log(datas);
