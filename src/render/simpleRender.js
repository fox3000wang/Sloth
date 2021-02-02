const fs = require('fs');

function loadTemplate(path) {
  const file = fs.readFileSync(path);
  return file.toString();
}

function render(template, data) {
  let code = loadTemplate(template);
  Object.keys(data).map(key => {
    const reg = new RegExp('#{' + key + '}');
    code = code.replace(reg, data[key]);
  });

  return code;
}

module.exports = render;
