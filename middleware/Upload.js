const util = require('util');
const multer = require('multer');
const {
  cLog,
  config
} = require('../helpers');

const maxSize = 2 * 1024 * 1024;

const renameFile = (req, file, cb) => {

  let filename = file.originalname;

  filename = filename.replace(/^\d{13}_/g, '');

  filename = filename.replace(/\s/g, '_');

  filename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '');

  file.name = `${Date.now()}_${filename}`;

  cb(null, file.name);

};

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, config.uploadPath);

  },
  filename: (req, file, cb) => {

    cLog.info(`Saving file to local directory:: ${config.uploadPath}, file:: `, file);

    renameFile(req, file, cb);

  }

});

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize }
}).single('file');

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
