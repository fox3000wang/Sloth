import fs from 'fs';
import path from 'path';
import config from '../config';
import shell from 'shelljs';

/**
 * 清理输出目录
 * @param {*} target 需要删除的绝对路径
 */
function cleanOutput(target:string):Promise<any> {
  console.log(`[cleanOutput] ${target}`);
  if(!target){
    throw Error(`target can't be null`);
  }
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  return new Promise(resolve => {
    const dirs = fs.readdirSync(target);
    dirs.forEach(dir => {
      const outputPath = path.join(target, dir);
      const stats = fs.statSync(outputPath);
      if (stats.isFile()) {
        fs.unlinkSync(outputPath);
        //shell.rm('-f', outputPath);
      } else {
        if (!isignore(outputPath)) {
          cleanOutput(outputPath);
          fs.rmdir(outputPath, e => {
            // directory not empty 文件夹非空无法删除直接无视
            console.log(`[cleanOutput] ${outputPath} ${dir}`);
          });
        }
      }
    });
    // TODO: 暂时写死
    setTimeout(()=>resolve(true),200);
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
