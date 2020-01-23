const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();
const BoardController = require('../app/board/boardCtrl');

router.post('/board', Auth.Authenticate, BoardController.createBoard);

router.get('/boards', Auth.Authenticate, BoardController.getAllBoards);

router.get('/board/:boardId', Auth.Authenticate, BoardController.getBoard);

router.put('/updateBoard/:boardId', Auth.Authenticate, BoardController.updateBoard);

router.delete('/deleteBoard/:boardId', Auth.Authenticate, BoardController.deleteBoard);

router.get('/getBoard/:boardKey', Auth.Authenticate, BoardController.getBoardByKey);

router.get('/getBoardBySection/:sectionId', Auth.Authenticate, BoardController.getBoardsBySectionId);

router.get('/getBoardBySectionTitle/:sectionTitle', BoardController.getBoardsBySectionTitle);

module.exports = router;
