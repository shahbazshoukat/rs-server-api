const express = require('express');

const router = express.Router();
const SectionCtrl = require('../../app/section/sectionCtrl');

router.post('/section', SectionCtrl.createSection);

router.get('/sections', SectionCtrl.getAllSections);

router.get('/section/:sectionId', SectionCtrl.getSection);

router.get('/getSection/:title', SectionCtrl.getSectionByTitle);

router.put('/section/:sectionId/update', SectionCtrl.updateSection);

router.delete('/section/:sectionId/delete', SectionCtrl.deleteSection);

module.exports = router;
