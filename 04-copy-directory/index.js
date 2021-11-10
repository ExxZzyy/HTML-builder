const fs = require('fs/promises');

const srcDir = `${__dirname}/files`;
const distDir = `${__dirname}/files-copy`;

(async function () {
  try {
    await fs.mkdir(distDir, {recursive:true});
    const filesDel = await fs.readdir(distDir);
    filesDel.map((fileName) => {
      fs.unlink(`${distDir}/${fileName}`);
    });
    const files = await fs.readdir(srcDir);
    files.map((fileName) => {
      fs.copyFile(`${srcDir}/${fileName}`, `${distDir}/${fileName}`);
    });
  }
  catch (err) {
    console.error(err);
  }
})();

