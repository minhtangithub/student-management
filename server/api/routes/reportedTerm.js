const router = require("express").Router();
const reportedTerm = require("../controller/reportedTermController");

// ADD A  REPORTED_TERM
router.post("/", reportedTerm.addReportedTerm);

//GET ALL  REPORTED_TERM
router.get("/", reportedTerm.getReportedTerms);

//GET A  REPORTED_TERM
router.get("/:id", reportedTerm.getReportedTerm);

//UPDATE A REPORTED_TERM
router.put("/:id", reportedTerm.updateReportedTerm);

//DELETE A REPORTED_TERM
router.delete("/:id", reportedTerm.updateReportedTerm);

module.exports = router;
