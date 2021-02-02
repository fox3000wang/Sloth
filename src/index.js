const pug = require('pug');
const path = require('path');
const fs = require('fs');

const render = require('./render/simplerender');
const write = require('./writer/simpleWriter');

const user = {
  name: 'name',
  property: 'string',
};

console.log('---------- build start. ----------');

const code = render('template/module.temp', user);

const fileParh = path.join(__dirname, `../output/${user.name}.ts`);

write(fileParh, code);

console.log('---------- build end. ---------- ');
