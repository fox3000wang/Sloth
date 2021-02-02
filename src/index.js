const path = require('path');
const config = require('../config');
const render = require('./render/simplerender');
const write = require('./writer/simpleWriter');
const read = require('./reader/xlsxReader');

console.log('---------- build start. ----------');

const data = read();

console.log(data);

data.forEach(sheet => {
  const code = render('template/module.temp', sheet.sheet[0]);

  const fileParh = path.join(__dirname, `${config.output}/${sheet.name}`);

  write(fileParh, code);
});

console.log('---------- build end. ---------- ');
