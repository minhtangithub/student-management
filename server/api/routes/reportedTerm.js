const router = require("express").Router();
const reportedTerm = require("../controller/reportedTermController");

// ADD A  REPORTED_TERM
router.post("/", reportedTerm.addReportedTerm);

//GET ALL  REPORTED_TERM
router.get("/", reportedTerm.getReportedTerms);

//GET A  REPORTED_TERM
router.get("/:id", reportedTerm.getReportedTerm);

module.exports = router;
