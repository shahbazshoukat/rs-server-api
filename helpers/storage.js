const fs = require('fs');
const path = require('path');

exports.removeFilesFromDirectory = (directory) => {

  fs.readdir(directory, (error, files) => {

    if (error) throw error;

    for (const file of files) {

      fs.unlink(path.join(directory, file), (err) => {

        if (err) throw err;

      });

    }

  });

};
