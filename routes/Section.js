const express = require('express');
const Auth = require('../middleware/Auth');

const router = express.Router();
const SectionController = require('../app/section/sectionCtrl');

router.post('/section', Auth.Authenticate, SectionController.createSection);

router.get('/sections', SectionController.getAllSections);

router.get('/section/:sectionId', Auth.Authenticate, SectionController.getSection);

router.get('/getSection/:title', Auth.Authenticate, SectionController.getSectionByTitle);

router.put('/section/:sectionId/update', Auth.Authenticate, SectionController.updateSection);

router.delete('/section/:sectionId/delete', Auth.Authenticate, SectionController.deleteSection);

module.exports = router;
