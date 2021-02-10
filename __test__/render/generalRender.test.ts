import path from 'path';
import render, { replaceKey, replaceList } from '../../src/render/generalRender';


test('replaceKey with normal', () => {
  expect(replaceKey('I,m #{name}!', 'name', 'gi_gi'))
  .toBe('I,m gi_gi!');
});

test('replaceKey with toUpperCase', () => {
  expect(replaceKey('I,m #u{name}!', 'name', 'gi-gi'))
  .toBe('I,m GI-GI!');
});

test('replaceKey with toLittleCamelCase', () => {
  expect(replaceKey('I,m #l{name}!', 'name', 'gi_gi'))
  .toBe('I,m giGi!');
});

test('replaceKey with toBigCamelCase', () => {
  expect(replaceKey('I,m #b{name}!', 'name', 'gi-gi'))
  .toBe('I,m GiGi!');
});


const testTemplate = 
`<#list table>
#l{table.name}:#{table.property}; //#{table.comment}
</#list>`;

const testData = 
  [{
    name:'english_name',
    property: 'string',
    comment: '英文名',
  },{
    name:'name_cn',
    property: 'string',
    comment: '中文名',
  }];

const toBe = 
`englishName:string; //英文名
nameCn:string; //中文名`;


test('replaceList', () => {
  expect(replaceList(testTemplate, `table`, testData))
  .toBe(toBe);
});

const toBe2 = 
`testTable
englishName:string; //英文名
nameCn:string; //中文名`;

test('render', () => {
  expect(render(path.join(__dirname, 'template.test.temp'), {table:testData, tableName:'testTable'}))
  .toBe(toBe2);
});


// console.log(render(path.join(__dirname, 'template.test.temp'), {table:testData}));
