const path = require('path');
const config = require('./config');
const render = require('./render/simplerender');
const write = require('./writer/simpleWriter');
const read = require('./reader/xlsxReader');
const getTemplateInfo = require('./templateMgr');

console.log('---------- build start. ----------');

const xlsxData = read();

xlsxData.forEach(sheet => {
  // const code = render('template/module/module.temp', sheet);

  console.log(sheet);
  getTemplateInfo(sheet);

  //const fileParh = `${config.output}/${sheet.sheetName}.ts`;
  //console.log(`[output] ${sheet.sheetName}: ${code}`);

  //write(path.join(__dirname, fileParh), code);
});

console.log('---------- build end. ---------- ');
