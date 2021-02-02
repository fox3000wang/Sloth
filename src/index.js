const path = require('path');
const config = require('../config');
const render = require('./render/simplerender');
const write = require('./writer/simpleWriter');
const read = require('./reader/xlsxReader');

console.log('---------- build start. ----------');

const data = read();

console.log(data);

data.forEach(sheet => {
  const code = render('template/module.temp', sheet);

  const fileParh = `${config.output}/${sheet.sheetName}.ts`;

  console.log(code);
  write(path.join(__dirname, fileParh), code);
});

console.log('---------- build end. ---------- ');
