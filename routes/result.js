const express = require("express");
const router = express.Router();
const ResultController = require("../app/result/resultCtrl");


router.post("/result", ResultController.createResult);

router.get("/results", ResultController.getAllResults);

router.get("/result/:resultId", ResultController.getResultById);

router.put("/updateResult/:resultId", ResultController.updateResult);

router.delete("/deleteResult/:resultId", ResultController.deleteResult);

router.put("/updateStatus/:resultId", ResultController.updateResultStatus);

router.get("/result-year/:sectionTitle/:boardKey", ResultController.getResultYears);

router.get("/result/:section/:board/:year/:exam", ResultController.getResult);

router.get("/result/:section/:board/:year/:exam/:rollNo", ResultController.findResult);

module.exports = router;
