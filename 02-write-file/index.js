const fs = require("fs");
const path = require('node:path');
const { stdin: input, stdout: output } = require("node:process");
const readline = require('node:readline')

const rl = readline.createInterface({input, output})

const userTxt = await rl.question("Hello, please enter some text to see how write to file works \n" , (answer) => {
   try {
      rl.close()
      return answer
   } catch (err) {
      throw err
   }
})

console.log(userTxt);

// fs.writeFile('text.txt', userTxt, (err) => {
//    if(err) throw err;
// })