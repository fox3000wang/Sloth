/*
  http://freemarker.foofun.cn/dgui_template_overallstructure.html
  插值 #{ and } 
  列表 <#list > </#>
  注释 <#-- 和 -->
*/
import fs from 'fs';
import config from '../config';
import { removeComment, toNormal, toUpper, toLittleCamel, toBigCamel, fileToString } from '../utils/stringUtil';

/**
 * 从code里找到key,用value替换
 * @param code 
 * @param key 
 * @param value 
 */
const operators = [toNormal, toUpper, toLittleCamel, toBigCamel];
export function replaceKey(code:string, key:string, value:string):string {
  operators.forEach((fn:Function) => code = fn(code, key, value));
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

function render(template:string, data:any):string {
  let code:string = fileToString(template);
  code = removeComment(code);
  //code.toUpperCase; // why？

  Object.keys(data).map(key => {
    const value = data[key];

    if (typeof value === 'string') {
      code = replaceKey(code, key, value);
    }

    if ({}.toString.call(value) === '[object Array]') {
      console.log(`[render] ${code}, ${key}, ${value}`);
      code = replaceList(code, key, value);
    }
  });

  return code;
}

export default render;