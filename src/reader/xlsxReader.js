/*
 * 利用js-xlsx解析xlsx文件
 *
 * Excel名词：js-xlsx中的抽象类型
 * 工作簿：workBook
 * 工作表：Sheets
 * Excel引用样式(单元格地址)： cellAddress
 * 单元格：cell
 */
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

/**
 *
 */
function read(file) {
  file = !file ? config.xlsxFile : file;

  const buf = fs.readFileSync(path.join(__dirname, file));
  const workbook = XLSX.read(buf, { type: 'buffer' });

  const result = [];
  workbook.SheetNames.forEach(sheetName => {
    const sh = workbook.Sheets[sheetName];
    const sheet = [];

    let i = 2;
    while (sh[`A${i}`] && sh[`B${i}`] && sh[`C${i}`]) {
      sheet.push({
        name: sh[`A${i}`].v,
        property: sh[`B${i}`].v,
        comment: sh[`C${i}`].v,
      });
      i++;
    }
    // console.log(data);
    result.push({
      sheetName,
      sheet,
    });
  });

  return result;
}

module.exports = read;
