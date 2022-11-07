const fs = require("fs");
const path = require("node:path");
const { stdin: input, stdout: output } = require("node:process");
const readline = require('node:readline');
// const { stdin } = require("process");

const rl = readline.createInterface({input, output});

const txtFileDir = path.join(__dirname, "text.txt");

let consoleMessage = '';

const consoleQuest = () => {
   rl.question("Hello :) Write here to test the function\n" , answer => {
   try {
      if(answer.includes('exit'))  {
         console.log('Goodbye! See you next time ;)')
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