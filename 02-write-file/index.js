const fs = require("fs");
const path = require("node:path");
const { stdin, stdout } = require("process");

// const rl = readline.createInterface({input, output});

const txtFileDir = path.join(__dirname, "text.txt");

const writing = fs.createWriteStream(txtFileDir)


stdin.on('data', (chunk) => {
   const stringedChunk = chunk.toString();

   if(stringedChunk.match('exit')) return process.exit()

   writing.write(stringedChunk)
})

writing.on('error' , (err) => {
   if(err) throw err;
})

process.on('exit' , () => stdout.write('Bye see you next time.'))
process.on('SIGINT', () => process.exit());

stdout.write('Hello! Type something here, to test the function!\n')


