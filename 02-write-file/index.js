const fs = require('fs');

function writeFile(data) {
  if (data.toString() === 'exit\r\n') process.exit();
  fs.appendFile(__dirname + '/text.txt', data, 'utf-8', (err) => {
    if (err) throw err;
  });
}

console.log('Hello! Start typing:');

process.stdin.on('data', (chunk) => writeFile(chunk));

writeFile('');

process.on('exit', () => {
  console.log('Bye!');
});

process.on('SIGINT', () => {
  process.exit();
});


