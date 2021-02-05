const path = require('path');

const config = {
  rootPath: path.join(__dirname, `../../`),
  xlsxFile: path.join(__dirname, `../DataCenter.xlsx`),
  template: path.join(__dirname, `../template/`),
  output: path.join(__dirname, `../output/`),
  //autoClean: true,
  autoClean: false,
};

module.exports = config;
