const fs = require("fs");
const path = require("node:path");
const { stdout } = require("process");

const secretPath = path.resolve(__dirname,'./secret-folder')

const pathHelper = file => {
   return path.resolve(secretPath, file)
} 

fs.readdir(secretPath,(err,files) => {
   if(err) throw err
   files.forEach(file => {
         fs.stat(pathHelper(file), (err,stats) => {
            if(err) throw err;
            else if (stats.isFile()) {
               stdout.write(file.split('.')[0] + " - " + path.extname(file) + " - " + (stats.size / 1024) + 'kb\n')
            }
         })
      
   })
})