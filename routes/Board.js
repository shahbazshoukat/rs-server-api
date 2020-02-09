const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();
const BoardController = require('../app/board/boardCtrl');

router.post('/board', Auth.Authenticate, BoardController.createBoard);

router.get('/boards', Auth.Authenticate, BoardController.getAllBoards);

router.get('/board/:boardId', Auth.Authenticate, BoardController.getBoard);

router.put('/updateBoard/:boardId', Auth.Authenticate, BoardController.updateBoard);

router.delete('/deleteBoard/:boardId', Auth.Authenticate, BoardController.deleteBoard);

router.get('/board/key/:boardKey', BoardController.getBoardByKey);

router.get('/getBoardBySection/:sectionId', Auth.Authenticate, BoardController.getBoardsBySectionId);

router.get('/boards/section/:sectionTitle', BoardController.getBoardsBySectionTitle);

router.get('/board/section/:sectionTitle', BoardController.getBoardBySectionTitle);

router.post('/board/comment/:boardId', BoardController.addComment);

router.delete('/board/comment/:boardId/:commentId', BoardController.removeComment);

module.exports = router;
