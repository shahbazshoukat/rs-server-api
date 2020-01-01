const express = require("express");
const router = express.Router();
const SectionController = require("../app/section/sectionCtrl");


router.post("/section", SectionController.createSection);

router.get("/sections",  SectionController.getAllSections);

router.get("/section:sectionId",  SectionController.getSection);

router.get("/getSection:title",  SectionController.getSectionByTitle);

router.put("/updateSection:sectionId", SectionController.updateSection);

router.delete("/deleteSection:sectionId", SectionController.deleteSection);

module.exports = router;
