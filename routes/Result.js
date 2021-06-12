const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();
const ResultController = require('../app/result/resultCtrl');

router.post('/result', Auth.Authenticate, ResultController.createResult);

router.get('/results', Auth.Authenticate, ResultController.getAllResults);

router.get('/result/:resultId', Auth.Authenticate, ResultController.getResultById);

router.put('/updateResult/:resultId', Auth.Authenticate, ResultController.updateResult);

router.delete('/deleteResult/:resultId', Auth.Authenticate, ResultController.deleteResult);

router.put('/updateStatus/:resultId', Auth.Authenticate, ResultController.updateResultStatus);

router.get('/result/:section/:board/:year/:exam/:rollNo', Auth.Authenticate, ResultController.findResult);

router.delete('/comment/:resultId/:commentId', Auth.Authenticate, ResultController.removeComment);

router.post('/results/update/all', Auth.Authenticate, ResultController.updateAllResults);

router.get('/results/board/:boardKey', Auth.Authenticate, ResultController.getResultsByBoardKey);

router.get('/results/:sectionTitle/:boardKey', Auth.Authenticate, ResultController.getResultsBySectionAndBoard);

// public apis

router.get('/result-year/:sectionId/:boardId', ResultController.getResultYears);

router.get('/exam-types/:sectionId/:boardId/:year', ResultController.getExamTypes);

router.get('/result/:section/:exam/:year', ResultController.getResult);

router.post('/comment/:resultId', ResultController.addComment);

router.get('/results/latest', ResultController.getLatestResults);

router.get('/board-results/:domain', ResultController.getResultsByBoardDomain);

module.exports = router;
