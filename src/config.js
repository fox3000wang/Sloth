const path = require('path');

const config = {
  // 输出目录不能放在项目内，不然热更新会死循环
  output: path.join(__dirname, `../../output/`),
  // 模板目录存放路径
  template: path.join(__dirname, `../template/`),
  // xlsx文件存放路径
  xlsxFile: path.join(__dirname, `../DataCenter.xlsx`),
  // 是否自动清理文件
  autoClean: true,
  //autoClean: false,
  // 过滤输出目录
  ignoreDir: ['node_modules'],
};

module.exports = config;
