const express = require('express');

const router = express.Router();

const DateSheetCtrl = require('../../app/dateSheet/dateSheetCtrl');

router.get('/date-sheet-year/:sectionId/:boardId', DateSheetCtrl.getDateSheetYears);

router.get('/date-sheets/exam-types/:sectionId/:boardId/:year', DateSheetCtrl.getExamTypes);

router.get('/date-sheet/:boardDomain/:section/:exam/:year', DateSheetCtrl.getDateSheet);

router.post('/date-sheets/comment/add/:dateSheetId', DateSheetCtrl.addComment);

router.get('/date-sheets/latest', DateSheetCtrl.getLatestDateSheets);

module.exports = router;
