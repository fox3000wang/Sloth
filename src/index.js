const fs = require('fs');
const path = require('path');
const config = require('./config');
const watch = require('watch');
const readXlsx = require('./reader/xlsxReader');
const cleanOutput = require('./manager/cleanOutput');
const makeOutputDir = require('./manager/makeOutputDir');
const generateCode = require('./manager/generateCode');

function main() {
  console.log(`[main] ---------- build start. ----------`);
  prepareGenerate();

  const xlsxData = readXlsx(config.xlsxFile);
  xlsxData.forEach(sheet => {
    generateCode(config.template, config.output, sheet);
  });
  console.log(`[main] ---------- build end. ----------`);
}

function prepareGenerate() {
  if (config.autoClean) {
    cleanOutput(config.output);
  }
  makeOutputDir(config.template, config.output);
}

fs.watch(config.template, main);
watch.watchTree(config.template, function (f, curr, prev) {
  if (typeof f == 'object' && prev === null && curr === null) {
    // Finished walking the tree
  } else if (prev === null) {
    // f is a new file
  } else if (curr.nlink === 0) {
    // f was removed
  } else {
    // f was changed
    main();
  }
});

main();
