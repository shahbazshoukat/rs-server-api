const { google } = require('googleapis');
const fs = require('fs');
const ApplicationException = require('../../exceptions/ApplicationException');

const config = require('config');
const {
  cLog,
  storage
} = require('../../helpers');

const {
  MiscConstants,
  HTTPStatusCodeConstants
} = require('../../constants');

const CLIENT_ID = '985847113984-sdk1a97ecaf7o96tchgafnqh3m722939.apps.googleusercontent.com';
const CLIENT_SECRET = 'poFpMOOH15yxfo_UCnx18nKI';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//043ai1uuovbVkCgYIARAAGAQSNwF-L9IrK3ZgEq-hlholTNiwgWuP1YtsGc1uGW2XvKXT_eOdi794FmQv9dsNt0RJStbpmOn-d6Y';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
});

exports.uploadFile = async (file, parentId) => {

  try {

    cLog.info(`uploadFile:: Uploading file to Google Drive, parent folder:: ${parentId} file:: `, file);

    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimeType,
        parents: [parentId]
      },
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(`${config.uploadPath}/${file.name}`)
      }
    });

    cLog.success(`uploadFile:: File uploaded to Google Drive, parent folder:: ${parentId} file:: `, file, 'response:: ', response && response.data);

    return response;

  } catch (error) {

    cLog.error(`uploadFile:: Failed to upload file to Google Drive, parent folder:: ${parentId}, file:: `, file, 'error:: ', error);

    throw new ApplicationException(MiscConstants.MESSAGES.FAILED_TO_CREATE_FILE_ON_GOOGLE_DRIVE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

  } finally {

    storage.removeFilesFromDirectory(config.uploadPath);

  }

};

exports.createFolder = async (folder) => {

  try {

    cLog.info(`createFolder:: Creating folder on Google Drive, folder:: `, folder);

    const response = await drive.files.create({
      requestBody: {
        name: folder.name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [folder.parentId]
      }
    });

    cLog.success(`createFolder:: Folder created on Google Drive, folder:: `, folder, 'response:: ', response.data);

    return response;

  } catch (error) {

    cLog.error(`createFolder:: Failed to create folder on Google Drive, error:: `, error, 'folder:: ', folder);

    throw new ApplicationException(MiscConstants.MESSAGES.FAILED_TO_CREATE_FOLDER_ON_GOOGLE_DRIVE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

  }

};

exports.deleteFile = async (fileId) => {

  try {

    cLog.info(`deleteFile:: Deleting file:: ${fileId} from Google Drive`);

    const response = await drive.files.delete({ fileId });

    cLog.success(`deleteFile:: File:: ${fileId} deleted from Google Drive`);

    return response;

  } catch (error) {

    cLog.error(`deleteFile:: Failed to delete file:: ${fileId} from Google Drive`, error);

    throw new ApplicationException(MiscConstants.MESSAGES.FAILED_TO_DELETE_FILE_FROM_GOOGLE_DRIVE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

  }

};

exports.generatePublicUrl = async (fileId) => {

  try {

    cLog.info(`generatePublicUrl:: Generating public url of file:: ${fileId}`);

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    const response = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink'
    });

    cLog.success(`generatePublicUrl:: Public url successfully created for file:: ${fileId}`);

    return response;

  } catch (error) {

    cLog.error(`generatePublicUrl:: Failed to create public url for file:: ${fileId}`, error);

    throw new ApplicationException(MiscConstants.MESSAGES.FAILED_TO_CREATE_PUBLIC_URL_OF_FILE, HTTPStatusCodeConstants.BAD_REQUEST).toJson();

  }

};
