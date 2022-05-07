const router = require("express").Router();
const gradeController = require("../controller/gradeController");

// ADD A GRADE
router.post("/", gradeController.addGrade);

//GET ALL GRADES
router.get("/", gradeController.getAllGrades);

//GET A GRADE
router.get("/:id", gradeController.getGrade);

module.exports = router;
