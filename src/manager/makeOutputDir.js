const fs = require('fs');
const path = require('path');
const config = require('../config');

/**
 * 复制模板目录结构
 */
function makeOutputDir() {
  const templateDir = path.join(__dirname, config.template);
  //console.log(`[makeOutputDir] ${templateDir}`);
  const dirs = fs.readdirSync(templateDir);
  recursionMakeDir(dirs, '');
}

function recursionMakeDir(dirs, parentDir) {
  dirs.forEach(dir => {
    if (dir.endsWith('.DS_Store')) {
      return;
    }

    if (!dir.endsWith('.temp')) {
      const outputPath = path.join(__dirname, config.output, parentDir, dir);
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
      }
      const tempPath = path.join(__dirname, config.template, parentDir, dir);
      const dirs = fs.readdirSync(tempPath);
      if (dirs.length > 0) {
        recursionMakeDir(dirs, `${parentDir}/${dir}`);
      }
    }
  });
}

module.exports = makeOutputDir;
