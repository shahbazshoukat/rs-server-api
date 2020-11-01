const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();

const NewsCtrl = require('../app/news/newsCtrl');

router.post('/news', NewsCtrl.createNews);

router.get('/news', NewsCtrl.getAllNews);

router.get('/news/:newsId', Auth.Authenticate, NewsCtrl.getNews);

router.put('/news/:newsId/update', Auth.Authenticate, NewsCtrl.updateNews);

router.delete('/news/:newsId/delete', Auth.Authenticate, NewsCtrl.deleteNews);

module.exports = router;
