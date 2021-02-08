import path from 'path';
import readXlsx from '../../src/reader/xlsxReader';

test('readXlsx', () => {
  expect(JSON.stringify(readXlsx(path.join(__dirname,'xlsxReader.test.xlsx'))))
  .toBe('[{"tableName":"user","table":[{"name":"id","property":"string","comment":"ID"},{"name":"chinese_name","property":"string","comment":"中文名"},{"name":"english_name","property":"string","comment":"英文名"},{"name":"age","property":"number","comment":"年龄"},{"name":"phone","property":"string","comment":"手机"}]}]');
});

