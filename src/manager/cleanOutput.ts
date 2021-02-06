import fs from 'fs';
import path from 'path';
import config from '../config';

/**
 * 清理输出目录
 * @param {*} target 需要删除的绝对路径
 */
function cleanOutput(target:string):void {
  console.log(`[cleanOutput] ${target}`);
  if(!target){
    throw Error(`target can't be null`);
  }
  
  const dirs = fs.readdirSync(target);
  dirs.forEach(dir => {
    const outputPath = path.join(target, dir);
    const stats = fs.statSync(outputPath);

    if (stats.isFile()) {
      fs.unlinkSync(outputPath);
    } else {
      if (!isignore(outputPath)) {
        cleanOutput(outputPath);
        fs.rmdir(outputPath, e => {
          // directory not empty 文件夹非空无法删除直接无视
        });
      }
    }
  });
}

function isignore(outputPath:string):boolean {
  let result:boolean = false;
  config.ignoreDir.forEach((e:string) => {
    if (outputPath.indexOf(e) >= 0) {
      result = true;
    }
  });
  return result;
}

export default cleanOutput;
//cleanOutput();
