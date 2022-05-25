const router = require("express").Router();
const gradeController = require("../controller/gradeController");

// ADD A SETTING
router.post("/", gradeController.addGrade);

//GET ALL SETTINGS
router.get("/", gradeController.getAllGrades);

//UPDATE A SETTING
router.put("/:id", gradeController.updateGrade);

//GET A SETTING
router.get("/:id", gradeController.getGrade);

//DELETE A SETTING
router.delete("/:id", gradeController.deleteGrade);

module.exports = router;
