const fs = require("fs");
const path = require("node:path");
const { stdin: input, stdout: output } = require("node:process");
const readline = require('node:readline');

const rl = readline.createInterface({input, output});

const txtFileDir = path.join(__dirname, "text.txt");

let consoleMessage = '';

const consoleQuest = () => {
   rl.question("Hello! Write something to test the function\n" , answer => {

   process.on('beforeExit', () => {
      console.log('Goodbye! See you next time :)');
   })

   try {
      if(answer.includes('exit') )  {
         rl.close()
      } else {
         consoleMessage += answer;
         fs.writeFile(txtFileDir, consoleMessage, (err) => {
            if(err) throw err;
         })
         consoleQuest()
      }
      
   } catch (err) {
      throw err
   }

})
}

consoleQuest()


