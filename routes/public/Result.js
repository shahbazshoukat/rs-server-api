const express = require('express');

const router = express.Router();

const ResultCtrl = require('../../app/result/resultCtrl');

router.get('/result-year/:sectionId/:boardId', ResultCtrl.getResultYears);

router.get('/exam-types/:sectionId/:boardId/:year', ResultCtrl.getExamTypes);

router.get('/result/:domain/:section/:exam/:year', ResultCtrl.getResult);

router.post('/results/comment/add/:resultId', ResultCtrl.addComment);

router.get('/results/latest', ResultCtrl.getLatestResults);

module.exports = router;
