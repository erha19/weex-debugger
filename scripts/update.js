const fse = require('fs-extra');
const path = require('path');
const package = require('../package.json');

const localFilePath = path.join(__dirname, '../frontend/lib/i18n/locale.js');
const localFileContent = fse.readFileSync(localFilePath).toString();

const versionReg = /\"VERSION\":\".+\"/ig;

fse.writeFileSync(localFilePath, localFileContent.replace(versionReg, `"VERSION":"weex devtool ${package.version}"`));

fse.copySync(path.resolve('src/worker/'), path.resolve('lib/worker/'))