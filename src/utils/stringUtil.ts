
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

