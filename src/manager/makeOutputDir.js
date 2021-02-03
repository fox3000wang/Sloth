const fs = require('fs');
const path = require('path');
const config = require('../config');

/**
 * 复制模板目录结构
 *
 */
function makeOutputDir(source, target) {
  console.log(`[makeOutputDir] ${source}`);
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

module.exports = makeOutputDir;
// makeOutputDir(config.template);
