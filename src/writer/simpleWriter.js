const fs = require('fs');

function write(fileParh, code) {
  fs.open(fileParh, 'w', (err, fd) => {
    err && console.error(err);
    fs.writeFileSync(fd, code);
  });
}

module.exports = write;
