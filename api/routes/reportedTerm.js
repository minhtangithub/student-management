const router = require("express").Router();
const reportedTerm = require("../controller/reportedTermController");

// ADD A SCHOOL_YEAR
router.post("/", reportedTerm.addReportedTerm);

//GET ALL SCHOOL_YEAR
router.get("/", reportedTerm.getReportedTerms);

//GET A SCHOOL_YEAR
router.get("/:id", reportedTerm.getReportedTerm);

module.exports = router;
