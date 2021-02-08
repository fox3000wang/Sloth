import { toLittleCamelCase, toBigCamelCase } from '../utils/stringUtil';

/**
 * 移除注释包括后面的换行
 * @param code 
 */
export function removeComment(code:string):string {
  return code.replace(/(<#--)([.\s\S]*?)(-->)\s/g, '');
}

export function toNormal(code:string, key:string, value:string):string{
  const reg = new RegExp(`#{${key}}`, 'g');
  return code.replace(reg, value);
}

export function toUpper(code:string, key:string, value:string):string{
  const reg = new RegExp(`#u{${key}}`, 'g');
  return code.replace(reg, value.toUpperCase());
}

export function toLittleCamel(code:string, key:string, value:string):string{
  const reg = new RegExp(`#l{${key}}`, 'g');
  return code.replace(reg, toLittleCamelCase(value));
}

export function toBigCamel(code:string, key:string, value:string):string{
  const reg = new RegExp(`#b{${key}}`, 'g');
  return code.replace(reg, toBigCamelCase(value));
}
