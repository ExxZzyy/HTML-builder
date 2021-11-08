const fs = require('fs');

fs.readdir(__dirname + '/secret-folder', {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.filter((file)=> file.isFile()).map((file)=> {
    fs.stat(`${__dirname}/secret-folder/${file.name}`, (err, stats) => {
      const fileModules = file.name.split('.');
      const fileExtension = fileModules.pop();
      const fileName = fileModules.join('.');
      console.log(`${fileName} - ${fileExtension} - ${stats.size/1000}kb`);
    });
  });
});