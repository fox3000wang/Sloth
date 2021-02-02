const fs = require('fs');
const path = require('path');
const config = require('./config');
const render = require('./render/simplerender');
const write = require('./writer/simpleWriter');

function getTemplateInfo(sheet) {
  const templateDir = path.join(__dirname, config.template);
  const dirs = fs.readdirSync(templateDir);
  mkOutputDir(dirs, '');

  console.log(sheet);
  gemTempInfo(dirs, '', sheet);
}

function gemTempInfo(dirs, parentDir, sheet) {
  dirs.forEach(dir => {
    if (dir.endsWith('.DS_Store')) {
      return;
    }

    if (dir.endsWith('.temp')) {
      const tempPath = path.join(__dirname, config.template, parentDir, dir);
      console.log(tempPath);

      const outputPath = path.join(
        __dirname,
        config.output,
        parentDir,
        // dir,
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
        gemTempInfo(dirs, `${parentDir}/${dir}`, sheet);
      }
    }
  });
}

// 复制模板目录结构
function mkOutputDir(dirs, parentDir) {
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
        mkOutputDir(dirs, `${parentDir}/${dir}`);
      }
    }
  });
}

module.exports = getTemplateInfo;
