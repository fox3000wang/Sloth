import fs from 'fs';
import path from 'path';
import config from '../config';
import { toBigCamelCase, toLittleCamelCase } from '../utils/stringUtil';
import { loadFile } from '../render/generalRender';
import columnRender, { removeColumnComment } from '../render/columnRender';
import write from '../../src/writer/simpleWriter';

let column:any = {};

export function cleanColumnCode(){
  column = {};
}

function generateColumnCode(source:string, target:string, tableName:string) {
  console.log(`[generatecolumnCode] ${target}`);
  
  traverse(source, target, tableName);

  Object.keys(column).map(path => {
    write(path, removeColumnComment(column[path]));
  });
}

function traverse(source:string, target:string, tableName:string){
  
  const dirs = fs.readdirSync(source);
  dirs.forEach((dir:string) => {
    if(config.ignoreFiles.indexOf(dir) > 0){  
      return;
    }
    
    const tempPath = path.join(source, dir);
    const stats = fs.statSync(tempPath);

    if (stats.isFile()) {
      if(dir.endsWith(config.column.suffix)) { // .col
        let subName = dir.replace(config.column.suffix, '');
        const outputFile = path.join(target, `${subName}`);
        if(!column[outputFile]){
          column[outputFile] = loadFile(tempPath);
        }
        let code = column[outputFile];
        code = columnRender(code, config.dataSourceName, tableName);
        column[outputFile] = code;
        //console.log(`====> ${JSON.stringify(column)}`);
      }
    } else {
      const outputPath = path.join(target, dir);
      traverse(tempPath, outputPath, tableName);
    }
  });
}

export default generateColumnCode;
