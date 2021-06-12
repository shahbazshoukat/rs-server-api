const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();
const BoardController = require('../app/board/boardCtrl');

router.post('/board', Auth.Authenticate, BoardController.createBoard);

router.get('/board/:boardId', Auth.Authenticate, BoardController.getBoard);

router.put('/updateBoard/:boardId', Auth.Authenticate, BoardController.updateBoard);

router.delete('/deleteBoard/:boardId', Auth.Authenticate, BoardController.deleteBoard);

router.get('/getBoardBySection/:sectionId', Auth.Authenticate, BoardController.getBoardsBySectionId);

router.delete('/board/comment/:boardId/:commentId', Auth.Authenticate, BoardController.removeComment);

router.get('/board/key/:boardKey', Auth.Authenticate, BoardController.getBoardByKey);

router.get('/board/section/:sectionTitle', Auth.Authenticate, BoardController.getBoardsBySectionTitle);

router.post('/board/comment/:boardId', Auth.Authenticate, BoardController.addComment);

// public apis

router.get('/boards', BoardController.getAllBoards);

router.get('/boards/section/:sectionId', BoardController.getBoardsBySectionId);

// router.get('/boards/province/:province', BoardController.getBoardByProvince);

module.exports = router;
