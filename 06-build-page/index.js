const fs = require('fs/promises');

const srcUrl = __dirname;
const distUrl = `${__dirname}/project-dist`;

(async function(){
  await fs.rm(distUrl, {force: true, recursive: true});
  await fs.mkdir(distUrl, {recursive: true});
  replace();
  build();
  copy(`${srcUrl}/assets`, `${distUrl}/assets`);
})();

async function replace(){
  let templateContent = await fs.readFile(`${srcUrl}/template.html`, 'utf-8');
  const components = await Promise.all(templateContent.match(/(?<={{).*(?=}})/g).map(async (fileName) => [fileName, await (async function () {
    try {
      await fs.access(`${srcUrl}/components/${fileName}.html`);      
      return await fs.readFile(`${srcUrl}/components/${fileName}.html`);
    }
    catch(err) {
      if (err.code === 'ENOENT') console.log(`Компонент ${fileName}.html не найден`);
      return '';
    }
  })()
  ]));
  for(let [componentName, componentContent] of components){
    templateContent = templateContent.replace(`{{${componentName}}}`, componentContent);
  }

  await fs.writeFile(`${distUrl}/index.html`, templateContent);
}

async function build(){
  const stylesUrl = `${srcUrl}/styles`;
  const fileNames = (await fs.readdir(stylesUrl, {withFileTypes: true})).filter((file) => file.isFile() && file.name.endsWith('.css'));
  const bundleContent = (await Promise.all(fileNames.map(async (file) => await fs.readFile(`${stylesUrl}/${file.name}`)))).join('');
  await fs.writeFile(`${distUrl}/style.css`, bundleContent);
}

async function copy(fromUrl, toUrl){
  await fs.mkdir(toUrl, {recursive: true});
  const files = await fs.readdir(fromUrl, {withFileTypes: true});
  files.map((file) => {
    file.isDirectory() ? copy(`${fromUrl}/${file.name}`, `${toUrl}/${file.name}`) : fs.copyFile(`${fromUrl}/${file.name}`, `${toUrl}/${file.name}`);
  });
}