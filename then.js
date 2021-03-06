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
// const promises = [fsPromises(1500), fsPromises(4000), fsPromises(2000), fsPromises(3000)];

Promise.all((fsPromises) => {
  try {
    fsPromises.readFile(path, 'utf8')
      .then(() => {
        return fsPromises.question("File already exists, type 'Y' to overwrite");
      }).then((key) => {
        if (!key === 'y') {
          process.exit();
        }
      }).then((response) => {
        response = got('https://sindresorhus.com');
        return fsPromises.writeFile('index.html', response.body);
      }).then((data) => {
        console.log(`Downloaded and saved ${ fs.statSync("index.html").size } bytes to ${ path }`);
      });

  } catch (error) {
    console.log(error);
  }
});




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