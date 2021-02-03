const fs = require('fs');
const path = require('path');
const config = require('../config');
const render = require('../render/simplerender');
const write = require('../writer/simpleWriter');

/**
 * 一个sheet的数据去递归所有模板生成代码
 * @param sheet
 */
function generateCode(source, target, sheet) {
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
      const outputFile = outputPath.replace(`.temp`, `.js`);
      if (!fs.existsSync(outputFile)) {
        const code = render(tempPath, sheet);
        write(outputFile, code);
      }
    } else {
      generateCode(tempPath, outputPath, sheet);
    }
  });
}

module.exports = generateCode;
