const path = require('path');

const config = {
  xlsxFile: path.join(__dirname, `../DataCenter.xlsx`),
  template: path.join(__dirname, `../template/`),
  output: path.join(__dirname, `../output/`),
  autoClean: true,
};

module.exports = config;
