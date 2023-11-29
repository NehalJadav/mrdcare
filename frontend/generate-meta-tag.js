const fs = require('fs').promises;
const path = require('path');

async function writeMetaJsonFiles() {
  const metaJson = path.resolve(process.cwd(), 'public', 'meta.json');
  const metaVersionJson = path.resolve(process.cwd(), 'src', 'metaVersion.json');
  const currentDate = new Date();
  const appVersion = currentDate.getTime();
  const jsonData = {
    version: appVersion
  };
  const jsonContent = JSON.stringify(jsonData);

  try {
    await fs.writeFile(metaVersionJson, jsonContent, 'utf8');
    console.log(`metaVersion.json file has been saved with v${appVersion}`);
  } catch (err) {
    console.error('An error occurred while writing JSON Object to metaVersion.json');
    throw err;
  }

  try {
    await fs.writeFile(metaJson, jsonContent, 'utf8');
    console.log(`meta.json file has been saved with v${appVersion}`);
  } catch (err) {
    console.error('An error occurred while writing JSON Object to meta.json');
    throw err;
  }
}

writeMetaJsonFiles().catch(err => {
  console.error('An error occurred:', err);
});