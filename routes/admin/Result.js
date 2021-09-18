const express = require('express');

const router = express.Router();
const ResultController = require('../../app/result/resultCtrl');

router.post('/result', ResultController.createResult);

router.get('/results', ResultController.getAllResults);

router.get('/result/:resultId', ResultController.getResultById);

router.put('/updateResult/:resultId', ResultController.updateResult);

router.delete('/deleteResult/:resultId', ResultController.deleteResult);

router.put('/updateStatus/:resultId', ResultController.updateResultStatus);

router.get('/result/:section/:board/:year/:exam/:rollNo', ResultController.findResult);

router.delete('/comment/:resultId/:commentId', ResultController.removeComment);

router.post('/results/update/all', ResultController.updateAllResults);

router.get('/results/board/:boardKey', ResultController.getResultsByBoardKey);

router.get('/results/:sectionTitle/:boardKey', ResultController.getResultsBySectionAndBoard);

router.get('/board-results/:domain', ResultController.getResultsByBoardDomain);

module.exports = router;
