const express = require('express');
const Auth = require('../middleware/Auth');
const Upload = require('../middleware/Upload');
const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({
  uploadDir: 'uploads'
});

const router = express.Router();
const dateSheetCtrl = require('../app/dateSheet/dateSheetCtrl');

router.post('/date-sheet', Auth.Authenticate, dateSheetCtrl.createDateSheet);

router.get('/date-sheets', Auth.Authenticate, dateSheetCtrl.getAllDateSheets);

router.get('/date-sheet/:dateSheetId', Auth.Authenticate, dateSheetCtrl.getDateSheetById);

router.put('/update-date-sheet/:dateSheetId', Auth.Authenticate, dateSheetCtrl.updateDateSheet);

router.delete('/delete-date-sheet/:dateSheetId', Auth.Authenticate, dateSheetCtrl.deleteDateSheet);

router.delete('/comment/:dateSheetId/:commentId', Auth.Authenticate, dateSheetCtrl.removeComment);

router.get('/date-sheets/board/:boardKey', Auth.Authenticate, dateSheetCtrl.getDateSheetsByBoardKey);

router.get('/date-sheets/:sectionTitle/:boardKey', Auth.Authenticate, dateSheetCtrl.getDateSheetsBySectionAndBoard);

// public apis

router.get('/date-sheet-year/:sectionId/:boardId', dateSheetCtrl.getDateSheetYears);

router.get('/exam-types/:sectionId/:boardId/:year', dateSheetCtrl.getExamTypes);

router.get('/date-sheet/:section/:exam/:year', dateSheetCtrl.getDateSheet);

router.post('/comment/:date-sheetId', dateSheetCtrl.addComment);

router.get('/date-sheets/latest', dateSheetCtrl.getLatestDateSheets);

router.get('/board-date-sheets/:domain', dateSheetCtrl.getDateSheetsByBoardDomain);

module.exports = router;
