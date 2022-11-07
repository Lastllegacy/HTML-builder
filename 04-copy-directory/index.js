const fs = require("fs")
const path = require("node:path")

const filesDir = (file = '.') => {
   return path.resolve(__dirname, 'files', file)
} 

const copyFilesDir = (file = '.') => {
   return path.resolve(__dirname, "files-copy" , file)
} 

fs.mkdir(copyFilesDir(), {recursive:true}, err => {
   if(err) throw err
   
   fs.readdir(filesDir(), (err,files) => {
      if(err) throw err;

      files.forEach(file => {
         fs.copyFile(filesDir(file), copyFilesDir(file), (err) => {
            if(err) throw err
         })
      })
   })
})


