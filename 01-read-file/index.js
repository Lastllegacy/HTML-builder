const fs = require('fs');
const path = require('node:path');
const { stdout } = require('process');

const txtDir = path.join(__dirname, '/text.txt')

const reading  = fs.createReadStream(txtDir, 'utf-8')

reading.pipe(stdout);



