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

/**
 * 从xls文件里读取数据, 包装好数据返回给render使用
 * @param file
 */
function readXlsx(file) {
  if (!file) {
    throw new Error(`elsx file is null!`);
  }

  //const cellIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G' ... 'Z'];
  const cellIndex = [...Array(26)].map((e, i) => String.fromCharCode(65 + i));

  const buf = fs.readFileSync(file);
  const workbook = XLSX.read(buf, { type: 'buffer' });

  const result = [];
  workbook.SheetNames.forEach(sheetName => {
    const sh = workbook.Sheets[sheetName];
    const title = [];
    const sheet = [];

    let i = 0;
    while (sh[`${cellIndex[i]}1`]) {
      title.push(sh[`${cellIndex[i++]}1`].v);
    }

    i = 2;
    // TODO: 判断条件懒得改了
    while (sh[`${cellIndex[0]}${i}`] && sh[`${cellIndex[0]}${i}`]) {
      const data = {};
      title.forEach((e, j) => {
        data[e] = sh[`${cellIndex[j]}${i}`].v;
      });
      console.log(data);
      sheet.push(data);
      i++;
    }

    result.push({
      sheetName,
      sheet,
    });
  });

  // console.log(result);
  return result;
}

module.exports = readXlsx;
