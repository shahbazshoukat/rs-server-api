const express = require('express');

const router = express.Router();

const NewsCtrl = require('../../app/news/newsCtrl');

router.post('/news', NewsCtrl.createNews);

router.get('/news', NewsCtrl.getAllNews);

router.get('/news/:newsId', NewsCtrl.getNewsById);

router.put('/news/:newsId/update', NewsCtrl.updateNews);

router.delete('/news/:newsId/delete', NewsCtrl.deleteNews);

module.exports = router;
