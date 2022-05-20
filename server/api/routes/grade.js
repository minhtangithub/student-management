const router = require("express").Router();
const gradeController = require("../controller/gradeController");

// ADD A GRADE
router.post("/", gradeController.addGrade);

//GET ALL GRADES
router.get("/", gradeController.getAllGrades);

//GET A GRADE
router.get("/:id", gradeController.getGrade);

//PUT A GRADE
router.put("/:id", gradeController.updateGrade);

//DELETE A GRADE
// router.delete("/:id", gradeController.deleteGrade);

module.exports = router;
