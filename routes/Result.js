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

router.get('/result-year/:sectionTitle/:boardKey', ResultController.getResultYears);

router.get('/result/:section/:board/:year/:exam', ResultController.getResult);

router.get('/result/:section/:board/:year/:exam/:rollNo', Auth.Authenticate, ResultController.findResult);

router.get('/results/board/:boardKey', Auth.Authenticate, ResultController.getResultsByBoardKey);

module.exports = router;
