const fs = require('fs');

fs.createReadStream(__dirname + '/text.txt', 'utf-8').on('data', (chunk => {
  console.log(chunk);
}));