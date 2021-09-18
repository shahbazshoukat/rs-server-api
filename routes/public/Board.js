const express = require('express');

const router = express.Router();

const BoardCtrl = require('../../app/board/boardCtrl');

router.get('/boards', BoardCtrl.getAllBoards);

router.get('/boards/section/:sectionId', BoardCtrl.getBoardsBySectionId);

module.exports = router;
