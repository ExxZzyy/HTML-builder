const fs = require('fs/promises');

const stylesUrl = `${__dirname}/styles`;
const distUrl = `${__dirname}/project-dist`;

(async function(){
  const fileNames = (await fs.readdir(stylesUrl, {withFileTypes: true})).filter((file) => file.isFile() && file.name.endsWith('.css'));
  const bundleContent = (await Promise.all(fileNames.map(async (file) => await fs.readFile(`${stylesUrl}/${file.name}`)))).join('');
  await fs.writeFile(`${distUrl}/bundle.css`, bundleContent);
})();