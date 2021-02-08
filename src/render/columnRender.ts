import { toBigCamelCase, toLittleCamelCase } from '../utils/stringUtil';
import { replaceKey } from './generalRender';

function columnRender(code:string, key:string, value:string):string {
  let lineReg = new RegExp(`(.*)(#.?{${key}.*?})+.*?\n`, 'g');
  code = code.replace(lineReg, $0 => {
    // console.log(`######### ${$0}`);
    return `${$0}${replaceKey($0, key, value)}`;
  });
  return code;
}

export function removeColumnComment(code:string){
  return code.replace(/(.*)(#)(.?)({)([.\s\S]*?)(})([.\s\S]*?)\n/g, '');
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