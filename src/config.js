const path = require('path');

const config = {
  rootPath: path.join(__dirname, `../../`),
  xlsxFile: path.join(__dirname, `../DataCenter.xlsx`),
  template: path.join(__dirname, `../template/`),
  // 输出目录不能放在项目内，不然热更新会死循环
  output: path.join(__dirname, `../../output/`),
  autoClean: true,
  //autoClean: false,
};

module.exports = config;
