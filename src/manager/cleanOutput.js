const fs = require('fs');
const path = require('path');
const config = require('../config');

/**
 * 清理输出目录
 * @param {*} root 需要删除的绝对路径
 */
function cleanOutput(root) {
  root = !root ? path.join(__dirname, config.output) : root;

  dirs = fs.readdirSync(root);
  dirs.forEach(dir => {
    const outputPath = path.join(root, dir);
    const stats = fs.statSync(outputPath);

    if (stats.isFile()) {
      fs.unlinkSync(outputPath);
    } else {
      cleanOutput(outputPath);
      fs.rmdirSync(outputPath);
    }
  });
}

module.exports = cleanOutput;
