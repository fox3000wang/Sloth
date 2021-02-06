const watch = require('watch');
import fs from 'fs';
import path from 'path';
import config from './config';
import readXlsx from './reader/xlsxReader';
import cleanOutput from './manager/cleanOutput';
import makeOutputDir from './manager/makeOutputDir';
import generateCode from './manager/generateCode';


function main() {
  console.log(`[main] ---------- build start. ----------`);
  prepareGenerate();

  const xlsxData = readXlsx(config.xlsxFile);
  xlsxData.forEach((sheet:any) => {
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
watch.watchTree(config.template, function (f:any, curr:any, prev:any) {
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
