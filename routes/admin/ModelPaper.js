const express = require('express');

const router = express.Router();

const ModelPaperCtrl = require('../../app/modelPaper/modelPaperCtrl');

router.post('/model-paper', ModelPaperCtrl.createModelPaper);

router.get('/model-papers', ModelPaperCtrl.getAllModelPapers);

router.get('/model-paper/:modelPaperId', ModelPaperCtrl.getModelPaperById);

router.put('/update-model-paper/:modelPaperId', ModelPaperCtrl.updateModelPaperById);

router.delete('/delete-model-paper/:modelPaperId', ModelPaperCtrl.deleteModelPaperById);

router.delete('/comment/:modelPaperId/:commentId', ModelPaperCtrl.removeComment);

router.get('/model-papers/board/:boardKey', ModelPaperCtrl.getModelPapersByBoardKey);

router.get('/model-papers/:sectionTitle/:boardKey', ModelPaperCtrl.getModelPapersBySectionAndBoard);

router.get('/board-model-papers/:domain', ModelPaperCtrl.getModelPapersByBoardDomain);

router.get('/model-paper/:title', ModelPaperCtrl.getModelPaperByBoardAndPageId);

module.exports = router;
