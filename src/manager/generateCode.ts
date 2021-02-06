import fs from 'fs';
import path from 'path';
import config from '../config';

import render from '../render/simplerender';
import write from '../writer/simpleWriter';

/**
 * 一个sheet的数据去递归所有模板生成代码
 * @param sheet
 */
function generateCode(source:string, target:string, sheet:any) {
  console.log(`[generateCode] ${source}`);
  const dirs = fs.readdirSync(source);

  dirs.forEach(dir => {
    if (dir.endsWith('.DS_Store')) {
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
        const outputFile = path.join(target, `${sheet.sheetName}${subName}`);

        if (!fs.existsSync(outputFile)) {
          const code = render(tempPath, sheet);
          write(outputFile, code);
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
      generateCode(tempPath, outputPath, sheet);
    }
  });
}

export default generateCode;
