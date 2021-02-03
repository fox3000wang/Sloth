const fs = require('fs');
const path = require('path');
const config = require('../config');
const render = require('../render/simplerender');
const write = require('../writer/simpleWriter');

/**
 * 一个sheet的数据去递归所有模板生成代码
 * @param sheet
 */
function generateCode(sheet) {
  const templateDir = path.join(__dirname, config.template);
  //console.log(`[generateCode] ${templateDir}`);
  const dirs = fs.readdirSync(templateDir);
  recursionGenCode(dirs, '', sheet);
}

function recursionGenCode(dirs, parentDir, sheet) {
  dirs.forEach(dir => {
    if (dir.endsWith('.DS_Store')) {
      return;
    }

    if (dir.endsWith('.temp')) {
      const tempPath = path.join(__dirname, config.template, parentDir, dir);
      // console.log(`[generateCode] ${tempPath}`);

      const outputPath = path.join(
        __dirname,
        config.output,
        parentDir,
        `${sheet.sheetName}.ts`
      );
      if (!fs.existsSync(outputPath)) {
        const code = render(tempPath, sheet);
        write(outputPath, code);
      }
    } else {
      const tempPath = path.join(__dirname, config.template, parentDir, dir);
      const dirs = fs.readdirSync(tempPath);
      if (dirs.length > 0) {
        recursionGenCode(dirs, `${parentDir}/${dir}`, sheet);
      }
    }
  });
}

module.exports = generateCode;
