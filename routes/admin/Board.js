const express = require('express');

const router = express.Router();
const BoardCtrl = require('../../app/board/boardCtrl');

router.post('/board', BoardCtrl.createBoard);

router.get('/board/:boardId', BoardCtrl.getBoard);

router.put('/updateBoard/:boardId', BoardCtrl.updateBoard);

router.delete('/deleteBoard/:boardId', BoardCtrl.deleteBoard);

router.get('/getBoardBySection/:sectionId', BoardCtrl.getBoardsBySectionId);

router.delete('/board/comment/:boardId/:commentId', BoardCtrl.removeComment);

router.get('/board/key/:boardKey', BoardCtrl.getBoardByKey);

router.get('/board/section/:sectionTitle', BoardCtrl.getBoardsBySectionTitle);

router.post('/board/comment/:boardId', BoardCtrl.addComment);

router.get('/admin/boards', BoardCtrl.getAllBoards);

module.exports = router;
