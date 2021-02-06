import fs from 'fs';
import path from 'path';
import config from '../config';

import render from '../render/simplerender';
import write from '../writer/simpleWriter';

/**
 * 递归所有模板生成代码
 * @param source 模板绝对路径
 * @param target 输出绝对路径
 * @param table 数据
 */
function generateCode(source:string, target:string, table:any) {
  console.log(`[generateCode] ${source}`);
  const dirs = fs.readdirSync(source);

  dirs.forEach((dir:string) => {
    if(config.ignoreFiles.indexOf(dir) > 0){  
      return;
    }
    const outputPath = path.join(target, dir);
    const tempPath = path.join(source, dir);
    const stats = fs.statSync(tempPath);

    if (stats.isFile()) {
      if (dir.endsWith('.temp')) {
        // .temp 格式结尾属于模板
        let subName = dir.replace('.temp', '');
        subName = subName.replace(/./g, ($0, $1) =>
          $1 === 0 ? $0.toUpperCase() : $0
        );
        const outputFile = path.join(target, `${table.tableName}${subName}`);

        if (!fs.existsSync(outputFile)) {
          generateFile(tempPath, outputFile, table);
        }
      } else {
        // 其他的都属于配置，只用复制黏贴
        const outputConfig = path.join(target, dir);
        if (!fs.existsSync(outputConfig)) {
          const code = render(tempPath, {});
          write(outputConfig, code);
        }
      }
    } else {
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
  const code = render(source, data);
  write(target, code);
}

export default generateCode;
