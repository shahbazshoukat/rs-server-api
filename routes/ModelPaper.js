const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();

const ModelPaperCtrl = require('../app/modelPaper/modelPaperCtrl');

router.post('/model-paper', Auth.Authenticate, ModelPaperCtrl.createModelPaper);

router.get('/model-papers', Auth.Authenticate, ModelPaperCtrl.getAllModelPapers);

router.get('/model-paper/:modelPaperId', Auth.Authenticate, ModelPaperCtrl.getModelPaperById);

router.put('/update-model-paper/:modelPaperId', Auth.Authenticate, ModelPaperCtrl.updateModelPaperById);

router.delete('/delete-model-paper/:modelPaperId', Auth.Authenticate, ModelPaperCtrl.deleteModelPaperById);

router.delete('/comment/:modelPaperId/:commentId', Auth.Authenticate, ModelPaperCtrl.removeComment);

router.get('/model-papers/board/:boardKey', Auth.Authenticate, ModelPaperCtrl.getModelPapersByBoardKey);

router.get('/model-papers/:sectionTitle/:boardKey', Auth.Authenticate, ModelPaperCtrl.getModelPapersBySectionAndBoard);

// public apis

router.get('/model-paper/:section/:subject', ModelPaperCtrl.getModelPaper);

router.post('/comment/:model-paperId', ModelPaperCtrl.addComment);

router.get('/board-model-papers/:domain', ModelPaperCtrl.getModelPapersByBoardDomain);

router.get('/model-papers/:title', ModelPaperCtrl.getModelPaperByBoardAndPageId);

module.exports = router;
