/*
  http://freemarker.foofun.cn/dgui_template_overallstructure.html
  插值 #{ and } 
  列表 <#list > </#>
  注释 <#-- 和 -->
*/
import fs from 'fs';
import { toLittleCamelCase, toBigCamelCase } from '../utils/stringUtil';
import config from '../config';

function loadTemplate(path:string):string {
  const file = fs.readFileSync(path);
  return file.toString();
}

/**
 * 移除注释包括后面的换行
 * @param code 
 */
export function removeComment(code:string):string {
  return code.replace(/(<#--)([.\s\S]*?)(-->)\s/g, '');
}

/**
 * 从code里找到key,用value替换
 * @param code 
 * @param key 
 * @param value 
 */
export function replaceKey(code:string, key:string, value:string):string {
  // 默认小写下滑线
  let reg = new RegExp(`#{${key}}`, 'g');
  code = code.replace(reg, value);

  // 大写下滑线 UpperCase
  reg = new RegExp(`#u{${key}}`, 'g');
  code = code.replace(reg, value.toUpperCase());

  // 小驼峰 little camel-case
  reg = new RegExp(`#l{${key}}`, 'g');
  code = code.replace(reg, toLittleCamelCase(value));

  // 大驼峰 big camel-case
  reg = new RegExp(`#b{${key}}`, 'g');
  code = code.replace(reg, toBigCamelCase(value));

  return code;
}

export function replaceList(code:string, key:string, value:Array<any>):string {
  const reg = new RegExp(`<#list ${key}>([.\\s\\S]*?)(</#list>)`, 'g');
  code = code.replace(reg, (...[, $1]) => {
    let result:string = '';
    value.forEach((element:any) => {
      result += $1.replace(/\n/, '');
      Object.keys(element).map(key => {
        result = replaceKey(result, `${config.dataSource}\\.${key}`, element[key]);
      });
    });
    result = result.replace(/\n+$/, '');
    return result;
  });
  return code;
}

export function render(template:string, data:any):string {
  let code:string = loadTemplate(template);
  code = removeComment(code);
  code.toUpperCase;

  Object.keys(data).map(key => {
    const value = data[key];

    if (typeof value === 'string') {
      code = replaceKey(code, key, value);
    }
    if ({}.toString.call(value) === '[object Array]') {
      code = replaceList(code, key, value);
    }
  });

  return code;
}

export default render;