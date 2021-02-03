/*
  http://freemarker.foofun.cn/dgui_template_overallstructure.html
  插值 #{ and } 
  列表 <#list > </#>
  注释 <#-- 和 -->
*/
const fs = require('fs');

function loadTemplate(path) {
  const file = fs.readFileSync(path);
  return file.toString();
}

function removeComment(code) {
  // const reg = new RegExp(`<#--([.\\s\\S]*)-->`);
  // return code.replace(reg, '');
  return code.replace(/<#--([.\s\S]*)-->/g, '');
}

function replaceKey(code, key, value) {
  // 默认小写下滑线
  let reg = new RegExp(`#{${key}}`, 'g');
  code = code.replace(reg, value);

  // 大写下滑线 UpperCase
  reg = new RegExp(`#u{${key}}`, 'g');
  code = code.replace(reg, value.toUpperCase());

  // 小驼峰 little camel-case
  reg = new RegExp(`#l{${key}}`, 'g');
  code = code.replace(
    reg,
    value.replace(/[-\|_](\w)/g, (...[, $1]) => $1.toUpperCase())
  );

  return code;
}

function replaceList(code, key, value) {
  const reg = new RegExp(`<#list ${key}>([.\\s\\S]*)</#list>`, 'g');
  code = code.replace(reg, (...[, $1]) => {
    result = '';
    value.forEach(element => {
      result += $1;
      Object.keys(element).map(key => {
        result = replaceKey(result, `sheet\\.${key}`, element[key]);
      });
    });
    return result;
  });
  return code;
}

function render(template, data) {
  let code = loadTemplate(template);
  code = removeComment(code);
  code.toUpperCase;

  Object.keys(data).map(key => {
    value = data[key];

    if (typeof value === 'string') {
      code = replaceKey(code, key, value);
    }
    if ({}.toString.call(value) === '[object Array]') {
      code = replaceList(code, key, value);
    }
  });

  return code;
}

module.exports = render;
