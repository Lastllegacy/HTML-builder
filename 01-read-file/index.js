const fs = require('fs');
const path = require('node:path')

const txtDir = path.join(__dirname, '/text.txt')

const stream = new fs.ReadStream(txtDir, {encoding:'utf-8'});

stream.on('readable', () => {
   const data = stream.read();
   console.log(data)
})

stream.on('error' , (err) => {
   if(err.code == 'ENOENT') console.log('Файл не найден!')
   else {
      console.error(err)
   }
})

