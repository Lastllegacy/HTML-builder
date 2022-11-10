const fs = require('fs');
const path = require('node:path')

const txtDir = path.join(__dirname, '/text.txt')

const stream = new fs.ReadStream(txtDir, {encoding:'utf-8'});

fs.readFile(txtDir, (err,data) => {
   if(err) throw err;
   console.log(data.toString());
})

stream.on('error' , (err) => {
   if(err.code == 'ENOENT') console.log('Файл не найден!')
   else {
      console.error(err)
   }
})

