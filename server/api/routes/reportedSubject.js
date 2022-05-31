const router = require("express").Router();
const reportedSubject = require("../controller/reportedSubjectController");

// ADD A REPORTED_SUBJECT
router.post("/", reportedSubject.addReportedSubject);

//GET ALL REPORTED_SUBJECT
router.get("/", reportedSubject.getReportedSubjects);

//GET A REPORTED_SUBJECT
router.get("/:id", reportedSubject.getReportedSubject);

//PUT A REPORTED_SUBJECT
router.put("/:id", reportedSubject.getReportedSubject);

//DELETE A REPORTED_SUBJECT
router.delete("/:id", reportedSubject.getReportedSubject);

module.exports = router;
