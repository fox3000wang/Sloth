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
      //if (config.ignoreDir.indexOf(dir) === -1) { //TODO: 判断需要过滤的目录逻辑要改
      cleanOutput(outputPath);
      fs.rmdirSync(outputPath);
      //}
    }
  });
}

module.exports = cleanOutput;
//cleanOutput();
