const router = require("express").Router();
const reportedTerm = require("../controller/reportedTermController");

// ADD A  reportedTerm
router.post("/", reportedTerm.addReportedTerm);

//GET ALL  reportedTerm
router.get("/", reportedTerm.getReportedTerms);

//GET A  reportedTerm
router.get("/:id", reportedTerm.getReportedTerm);

module.exports = router;
