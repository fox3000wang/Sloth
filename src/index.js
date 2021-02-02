const pug = require('pug');
const path = require('path');
const fs = require('fs');

const user = {
  name: 'name',
  property: 'string',
};
console.log('---------- build start. ----------');

const fileParh = path.join(__dirname, `../output/${user.name}.ts`);

fs.open(fileParh, 'w', (err, fd) => {
  err && console.error(err);

  const source = render('template/module.temp', user);
  fs.writeFileSync(fd, source);
});

console.log('---------- build end. ---------- ');

function render(template, data) {
  const file = fs.readFileSync(template);

  let code = file.toString();
  Object.keys(data).map(key => {
    const reg = new RegExp('#{' + key + '}');
    code = code.replace(reg, data[key]);
  });

  return code;
}
