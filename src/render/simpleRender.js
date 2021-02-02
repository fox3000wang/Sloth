/*
  http://freemarker.foofun.cn/dgui_template_overallstructure.html
  插值 #{ and } 
  列表 <#> </#>
  注释 <#-- 和 -->
*/
const fs = require('fs');

function loadTemplate(path) {
  const file = fs.readFileSync(path);
  return file.toString();
}

function removeComment(code) {
  return code.replace(/<#--([.\s\S]*)-->/g, '');
}

function replaceKey(code, key, value) {
  console.log(`${code}, ${key}, ${value}`);
  const reg = new RegExp('#{' + key + '}');
  return code.replace(reg, value);
}

function replaceList(code, key, value) {
  const reg = new RegExp(`^/<#list ${key}>([\s\S]*)</#list>/g`);
  code = code.replace(reg, (...[, $1]) => {
    console.log($1);
  });
  return code;
}

function render(template, data) {
  let code = loadTemplate(template);

  code = removeComment(code);
  //console.log(code);
  //console.log(data);

  Object.keys(data).map(key => {
    value = data[key];

    if (typeof value === 'string') {
      code = replaceKey(code, key, value);
    }
    // if ({}.toString.call(value) === '[object Array]') {
    //   code = replaceList(code, key, value);
    // }
  });

  return code;
}

module.exports = render;
