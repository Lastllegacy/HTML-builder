const fs = require('fs')
const path = require('node:path')

const initialStylesDir = ( file = '.') => {
   return path.resolve(__dirname, 'styles', file)
} 

const bundleCssDir = path.resolve(__dirname, 'project-dist', 'bundle.css')

fs.readdir(initialStylesDir(), (err, files) => {
   
   if(err) throw err ;

   let bundleStyles = ''

   files.forEach( file => {

      let styleFile = initialStylesDir(file)

      if(path.extname(styleFile) === ".css") {

         fs.readFile(styleFile, (err, data) => {
            if (err) throw err;

            bundleStyles = bundleStyles + data + '\n';

            fs.writeFile(bundleCssDir, bundleStyles, (err) => {
               if(err) throw err;
            })

         })

      }
   })
})