const router = require("express").Router();
const subjectController = require("../controller/subjectController");

// ADD A SUBJECT
router.post("/", subjectController.addSubject);

//GET A SUBJECT
router.get("/:id", subjectController.getSubject);

//GET ALL SUBJECTS
router.get("/", subjectController.getAllSubjects);

//UPDATE A SUBJECT
router.put("/:id", subjectController.updateSubject);

//DELETE A SUBJECT
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
