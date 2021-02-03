const fs = require('fs');
const path = require('path');
const config = require('./config');
const readXlsx = require('./reader/xlsxReader');
const cleanOutput = require('./manager/cleanOutput');
const makeOutputDir = require('./manager/makeOutputDir');
const generateCode = require('./manager/generateCode');

// const render = require('./render/simplerender');
// const write = require('./writer/simpleWriter');

console.log(`[index] ---------- build start. ----------`);

prepareGenerate();

const xlsxData = readXlsx(config.xlsxFile);
xlsxData.forEach(sheet => {
  generateCode(config.template, config.output, sheet);
});

console.log(`[index] ---------- build end. ---------- `);

function prepareGenerate() {
  if (config.autoClean) {
    cleanOutput(config.output);
  }
  makeOutputDir(config.template, config.output);
}
