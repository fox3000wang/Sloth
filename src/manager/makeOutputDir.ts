import fs from 'fs';
import path from 'path';

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
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  
  const dirs = fs.readdirSync(source);
  dirs.forEach(dir => {
    if (dir.endsWith('.DS_Store')) {
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
