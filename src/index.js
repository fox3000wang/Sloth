const path = require('path');
const fs = require('fs');
const config = require('./config');
const read = require('./reader/xlsxReader');
const makeOutputDir = require('./manager/makeOutputDir');
const generateCode = require('./manager/generateCode');
// const render = require('./render/simplerender');
// const write = require('./writer/simpleWriter');

console.log(`[index] ---------- build start. ----------`);

prepareGenerate();

const xlsxData = read();
xlsxData.forEach(sheet => {
  generateCode(sheet);
  // console.log(`[index] ${sheet}`);
});

console.log(`[index] ---------- build end. ---------- `);

function prepareGenerate() {
  makeOutputDir();
}
