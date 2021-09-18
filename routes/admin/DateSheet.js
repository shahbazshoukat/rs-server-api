const express = require('express');

const router = express.Router();

const DateSheetCtrl = require('../../app/dateSheet/dateSheetCtrl');

router.post('/date-sheet', DateSheetCtrl.createDateSheet);

router.get('/date-sheets', DateSheetCtrl.getAllDateSheets);

router.get('/date-sheet/:dateSheetId', DateSheetCtrl.getDateSheetById);

router.put('/update-date-sheet/:dateSheetId', DateSheetCtrl.updateDateSheet);

router.delete('/delete-date-sheet/:dateSheetId', DateSheetCtrl.deleteDateSheet);

router.delete('/comment/:dateSheetId/:commentId', DateSheetCtrl.removeComment);

router.get('/date-sheets/board/:boardKey', DateSheetCtrl.getDateSheetsByBoardKey);

router.get('/date-sheets/:sectionTitle/:boardKey', DateSheetCtrl.getDateSheetsBySectionAndBoard);

router.get('/board-date-sheets/:domain', DateSheetCtrl.getDateSheetsByBoardDomain);

module.exports = router;
