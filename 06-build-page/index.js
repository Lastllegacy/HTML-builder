const fs = require('fs')
const path = require('node:path')

const projDistDir = (file = '.') => {
   return path.resolve(__dirname, "project-dist" , file)
}

const stylesDir = (file = '.') => {
   return path.resolve(__dirname, 'styles', file)
} 

const assetsDir = (file = '.') => {
   return path.resolve(__dirname, 'assets', file)
}

const bundleStyle = () => {
   fs.readdir(stylesDir(), (err,files) => {
      if(err) throw err;

      let bundleStyles = ''

      files.forEach( file => {

         let styleFile = stylesDir(file)
   
         if(path.extname(styleFile) === ".css") {
   
            fs.readFile(styleFile, (err, data) => {
               if (err) throw err;
   
               bundleStyles = bundleStyles + data + '\n';
   
               fs.writeFile(projDistDir('style.css'), bundleStyles, (err) => {
                  if(err) throw err;
               })
   
            })
   
         }
      })
      
   })

}

const copyAssets = (folder) => {
   fs.readdir(assetsDir(folder), (err,files) => {
      if(err) throw err;

      fs.mkdir(projDistDir(...["./assets/"+folder]), {recursive:true} , (err) => {
         if(err) throw err;
         files.forEach(file => {
            fs.copyFile(assetsDir(...[folder+"/"+file]), projDistDir(...["./assets/"+folder+"/"+file]), (err) => {
               if(err) throw err
            })
         })
      })

      
      
   })
}

const htmlGenerator = () => {
   fs.readFile(__dirname + '/template.html', 'utf-8', (err, data) => {
   if (err) throw err;
   let htmlTemplate = data;
   let htmlTagsRaw = htmlTemplate.match(/{{.*}}/gm).sort()
   let htmlTagsModules = htmlTemplate.match(/{{.*}}/gm).map(tag => tag.replace('{{','').replace('}}','')).sort();

   const componentsDir = (file = '') => {
      return path.resolve(__dirname, 'components' ,file)
   } 

   fs.readdir(componentsDir(), (err,files) => {
      if(err) throw err;
      files.sort()
      for (let i=0; i < files.length; i++) {
         fs.readFile(componentsDir(files[i]), 'utf-8', (err,data) => {
            if(err) throw err
            htmlTemplate = htmlTemplate.replace(htmlTagsRaw[i],data)
            fs.writeFile(projDistDir('index.html'), htmlTemplate ,"utf-8", err => {
               if (err) throw err
            })
         })
      }
   })

})

}

fs.mkdir(projDistDir(), {recursive:true}, err => {
   if(err) throw err

   fs.mkdir(projDistDir("assets"), {recursive:true} , err => {
      if(err) throw err;
   })
   
   bundleStyle()
   copyAssets('fonts')
   copyAssets('img')
   copyAssets('svg')
   htmlGenerator()
})



