const pug = require('pug');
const path = require('path');
const fs = require('fs');

const user = {
  name: 'name',
  property: 'string',
};

console.log('build start.');

const compiledFunction = pug.compileFile('template/module.pug');

console.log(compiledFunction(user));

const fileParh = path.join(__dirname, `../output/${user.name}.ts`);

fs.open(fileParh, 'w', (err, fd) => {
  err && console.error(err);
  fs.writeFileSync(fd, compiledFunction(user));
});

console.log('build end.');
