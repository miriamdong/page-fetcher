const got = require('got');
const fsPromises = require('fs').promises;
const fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const path = './index.html';

const html = (async () => {
  try {
    const response = await got('https://sindresorhus.com');
    if (fs.existsSync(path)) {
      process.stdin.on('data', function() {
        rl.question("File already exists, type 'Y' to overwrite   \r\n", (key) => {
          key = process.stdin.read();
          if (!key === 'y') {
            process.exit();
          }
        });
      });
    }
    await fsPromises.writeFile('index.html', response.body);
    console.log(`Downloaded and saved ${fs.statSync("index.html").size} bytes to ${path}`);

  } catch (error) {
    console.log(error.response.body);
    //=> 'Internal server error ...'
  }
})();




// fs.open(path, 'w', function(err, fd) {
//   if (err) {
//     throw 'error opening file: ' + err;
//   }
//   fs.write(fd, buffer, 0, buffer.length, null, function(err) {
//     if (err) throw 'error writing file: ' + err;
//     fs.close(fd, function() {
//       console.log(`Downloaded and saved ${} bytes to ./index.html`);
//     });
//   });
// });

// import {
//   open,
//   close
// } from 'fs';
// open('myfile', 'wx', (err, fd) => {
//   if (err) {
//     if (err.code === 'EEXIST') {
//       console.error('myfile already exists');
//       return;
//     }

//     throw err;
//   }

//   try {
//     writeMyData(fd);
//   } finally {
//     close(fd, (err) => {
//       if (err) throw err;
//     });
//   }
// });