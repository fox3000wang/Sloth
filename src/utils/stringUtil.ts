import fs from 'fs';

/**
 * 下滑线转小驼峰
 * @param code
 */
export function toLittleCamelCase(code:string):string{
  return code.replace(/[-\|_](\w)/g, (...[, $1]) => $1.toUpperCase());
}

/**
 * 下滑线转大驼峰
 * @param code
 */
export function toBigCamelCase(code:string):string{  
  code = toLittleCamelCase(code);
  return code.replace(/^./, ($0) => $0.toUpperCase());
}

/**
 * 大小驼峰转下滑线
 * * @param code 
 */
export function toLineCase(code:string):string{  
  code = code.replace(/\B([A-Z])/g, (...[, $1]) => `_${$1.toLowerCase()}`);
  return code.replace(/^./, ($0) => $0.toLowerCase());
}

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

export function fileToString(path:string):string {
  const file = fs.readFileSync(path);
  return file.toString();
}
