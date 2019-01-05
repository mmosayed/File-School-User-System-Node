const fs = require('fs');
const FileService = {};

FileService.fileToJSON = (className, cb) => {
  const path = `./classes/${className}.json`;

  fs.readFile(path, (err, data) => {
    // If error  don't continue
    if (err) {
      cb(err);
      return;
    }

    // You continued cause there was no error
    const bufferedString = data.toString();
    const json = JSON.parse(bufferedString);
    cb(err, json);
  });

}


module.exports = FileService;