const router = require("express").Router();
const subjectController = require("../controller/subjectController");

// ADD A STUDENT
router.post("/", subjectController.addSubject);

//GET A STUDENT
router.get("/:id", subjectController.getSubject);

//GET ALL STUDENT
router.get("/", subjectController.getAllSubjects);

//UPDATE A STUDENT
router.put("/:id", subjectController.updateSubject);

//DELETE A STUDENT
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
