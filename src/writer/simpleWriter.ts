import fs from 'fs';

function write(fileParh:string, code:string) {
  fs.open(fileParh, 'w', (err, fd) => {
    err && console.error(err);
    fs.writeFileSync(fd, code);
  });
}

export default write;