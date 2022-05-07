const router = require("express").Router();
const reportedSubject = require("../controller/reportedSubjectController");

// ADD A SCHOOL_YEAR
router.post("/", reportedSubject.addReportedSubject);

//GET ALL SCHOOL_YEAR
router.get("/", reportedSubject.getReportedSubjects);

//GET A SCHOOL_YEAR
router.get("/:id", reportedSubject.getReportedSubject);

module.exports = router;
