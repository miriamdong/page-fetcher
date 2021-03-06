const got = require('got');
const fsPromises = require('fs').promises;
const fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const path = './index.html';
const key = process.stdin.read();

// eslint-disable-next-line func-style

const check = (async (key) => {
  try {
    await fsPromises.readFile('./index.html');
    await rl.question("File already exists, type 'Y' to overwrite   \r\n", (key) => {
      if (!key === 'y') {
        process.exit();
      }
      const html = (async () => {
        try {
          const response = await got('https://sindresorhus.com');
          await fsPromises.writeFile('index.html', response.body);
          console.log(`Downloaded and saved ${ fs.statSync("index.html").size } bytes to ${ path }`);
        } catch (error) {
          console.log(error);
          //=> 'Internal server error ...'
        }
      })();


    });
  } catch (e) {
    console.log(e);
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