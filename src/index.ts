const watch = require('watch');
import config from './config';
import readXlsx from './reader/xlsxReader';
import cleanOutput from './manager/cleanOutput';
import makeOutputDir from './manager/makeOutputDir';
import generateCode, {generateFile} from './manager/generateCode';
import { toBigCamelCase } from './utils/stringUtil';
import generateColumnCode from './manager/generateColumnCode';

let xlsxData:any;

async function main() {
  console.log(`[main] ---------- build start. ----------`);
  
  if (config.autoClean) {
    cleanOutput(config.output);
  }
  makeOutputDir(config.template, config.output);

  xlsxData = readXlsx(config.xlsxFile);
  xlsxData.forEach((sheet:any) => {
    generateCode(config.template, config.output, sheet);
    generateColumnCode(config.template, config.output, sheet.tableName);

  });
  console.log(`[main] ---------- build end. ----------`);
}

// watch模板变化
watch.watchTree(config.template, function (file:string, curr:any, prev:any) {
  console.log(`[watch.watchTree] ${file} ${curr} ${prev}`);
  if (typeof file == 'object' && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
  } else if (curr.nlink === 0) {
    // f was removed
  } else {
    // f was changed
    console.log(`[watch.watchTree] file was changed`);
    if(file.endsWith(config.general.suffix)){
      reloadData(file);
    }
    if(file.endsWith(config.column.suffix)){
      // reloadData(file); 这里还有bug
      main(); 
    }
  }
});

const reloadData = (file:string) => {
  xlsxData.forEach((sheet:any) => {
    let outputFile:string = file.replace(config.template, config.output)
    outputFile = outputFile.replace(config.general.suffix, '');
    
    let index:number = outputFile.lastIndexOf('/');
    outputFile = outputFile.substr(0,index+1) + sheet.sheetName + toBigCamelCase(outputFile.substr(index+1));  
    generateFile(file, outputFile, sheet);
  });
}


main();