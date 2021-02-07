import { toBigCamelCase, toLittleCamelCase } from '../utils/stringUtil';

function columnRender(code:string, key:string, value:string):string {
  
  let reg = new RegExp(`#{${key}}`, 'g');
  code = code.replace(reg, $0 => `${$0}\n${value}`);

  reg = new RegExp(`#u{${key}}`, 'g');
  code = code.replace(reg, $0 => `${$0}\n${value.toUpperCase()}`);

  reg = new RegExp(`#l{${key}}`, 'g');
  code = code.replace(reg, $0 => `${$0}\n${toLittleCamelCase(value)}`);

  reg = new RegExp(`#b{${key}}`, 'g');
  code = code.replace(reg, $0 => `${$0}\n${toBigCamelCase(value)}`);

  return code;
}

export function removeColumnComment(code:string){
  return code.replace(/(\/\/)(.*)(#)(.?)({)([.\s\S]*?)(})([.\s\S]*?)\s/g, '');
}

export default columnRender;

const testCase:string = `

// #{tableName}
record_cn
dict_cn
user


// #u{tableName}
RECORD_CN
DICT_CN
USER


// #l{tableName}
recordCn
dictCn
user


// #b{tableName}
RecordCn
DictCn
User
`;
//console.log(removeColumnComment(testCase));