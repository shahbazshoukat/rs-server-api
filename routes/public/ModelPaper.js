const express = require('express');

const router = express.Router();

const ModelPaperCtrl = require('../../app/modelPaper/modelPaperCtrl');

router.get('/model-paper/:domain/:section/:subject', ModelPaperCtrl.getModelPaper);

router.post('/model-papers/comment/add/:modelPaperId', ModelPaperCtrl.addComment);

router.get('/model-papers/latest', ModelPaperCtrl.getLatestModelPapers);

module.exports = router;
