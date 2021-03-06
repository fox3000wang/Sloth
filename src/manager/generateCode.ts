import fs from 'fs';
import path from 'path';
import config from '../config';
import render from '../render/generalRender';
import { toBigCamelCase, toLittleCamelCase } from '../utils/stringUtil';
import write from '../writer/simpleWriter';

/**
 * 递归所有模板生成代码
 * @param source 模板绝对路径
 * @param target 输出绝对路径
 * @param table 数据
 */
function generateCode(source:string, target:string, table:any) {
  console.log(`[generateCode] ${target}`);
  
  const dirs = fs.readdirSync(source);
  dirs.forEach((dir:string) => {
    if(config.ignoreFiles.indexOf(dir) > 0){  
      return;
    }
    const tempPath = path.join(source, dir);
    const stats = fs.statSync(tempPath);

    // 如果是文件, 则根据配置文件, 按照策略模式走各自的策略
    if (stats.isFile()) {
      if(dir.endsWith(config.general.suffix)) { // .temp
        const rule = config.general.suffix;
        let subName = toBigCamelCase(dir.replace(rule, ''));
        const outputFile = path.join(target, `${toLittleCamelCase(table.tableName)}${subName}`);
        
        if (!fs.existsSync(outputFile)) {
          generateFile(tempPath, outputFile, table);
        }
      } else if (dir.endsWith(config.column.suffix)) { 
        // 
      } else {
        // 其他的都属于配置，只用复制黏贴
        const outputConfig = path.join(target, dir);
        if (!fs.existsSync(outputConfig)) {
          const code = render(tempPath, {});
          write(outputConfig, code);
        }
      }
    } else {
      const outputPath = path.join(target, dir);
      generateCode(tempPath, outputPath, table);
    }
  });
}

/**
 * 生成一个文件
 * @param source 模板
 * @param target 输出
 * @param data 数据
 */
export function generateFile(source:string, target:string, data:any):void{
  console.log(`[generateFile] ${target}`);
  write(target, render(source, data));
}

export default generateCode;
