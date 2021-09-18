const express = require('express');

const router = express.Router();

const SectionCtrl = require('../../app/section/sectionCtrl');

router.get('/sections', SectionCtrl.getAllSections);

module.exports = router;
