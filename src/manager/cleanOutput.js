const fs = require('fs');
const path = require('path');
const config = require('../config');

/**
 * 清理输出目录
 * @param {*} root 需要删除的绝对路径
 */
function cleanOutput(root) {
  root = !root ? config.output : root;

  dirs = fs.readdirSync(root);
  dirs.forEach(dir => {
    const outputPath = path.join(root, dir);
    const stats = fs.statSync(outputPath);

    if (stats.isFile()) {
      fs.unlinkSync(outputPath);
    } else {
      if (!isignore(outputPath)) {
        cleanOutput(outputPath);
        fs.rmdir(outputPath, e => {
          // console.log(e); // directory not empty 直接无视
        });
      }
    }
  });
}

function isignore(outputPath) {
  let result = false;
  config.ignoreDir.forEach(e => {
    if (outputPath.indexOf(e) >= 0) {
      result = true;
    }
  });
  return result;
}

module.exports = cleanOutput;
//cleanOutput();
