const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();

const NewsCtrl = require('../app/news/newsCtrl');

router.post('/news', Auth.Authenticate, NewsCtrl.createNews);

router.get('/news', NewsCtrl.getAllNews);

router.get('/news/:newsId', Auth.Authenticate, NewsCtrl.getNewsById);

router.put('/news/:newsId/update', Auth.Authenticate, NewsCtrl.updateNews);

router.delete('/news/:newsId/delete', Auth.Authenticate, NewsCtrl.deleteNews);

module.exports = router;
