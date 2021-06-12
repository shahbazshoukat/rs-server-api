const File = require('./File');

class FileHandler {

  static createFile (data) {

    const file = new File({
      viewUrl: data.viewUrl,
      downloadUrl: data.downloadUrl,
      googleDriveFileId: data.googleDriveFileId,
      name: data.name
    });

    return file.save();

  }

  static getFileById (fileId) {

    const q = { _id: fileId };

    return File.findOne(q).lean().exec();

  }

  static updateFile (fileId, update) {

    const q = { _id: fileId };

    return File.updateOne(q, update);

  }

  static deleteFile (fileId) {

    const q = { _id: fileId };

    return File.deleteOne(q);

  }

}

module.exports = FileHandler;
