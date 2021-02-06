import fs from 'fs';
import path from 'path';
import config from '../config';

/**
 * 复制模板目录结构
 */
function makeOutputDir(source:string, target:string) {
  console.log(`[makeOutputDir] ${source}`);
  if(!source){
    throw Error(`source can't be null`);
  }
  if(!target){
    throw Error(`target can't be null`);
  }

  const dirs = fs.readdirSync(source);
  dirs.forEach(dir => {
    if (dir.endsWith('.DS_Store')) {
      //fs.unlink(dir); // 索性就直接删掉算了
      return;
    }
    const tempPath = path.join(source, dir);
    const stats = fs.statSync(tempPath);

    if (stats.isDirectory()) {
      const outputPath = path.join(target, dir);
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
      }
      makeOutputDir(tempPath, outputPath);
    }
  });
}

export default makeOutputDir;
// makeOutputDir(config.template);
