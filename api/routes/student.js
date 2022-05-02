const router = require("express").Router();
const studentController = require("../controller/studentController");

// ADD A STUDENT
router.post("/", studentController.addStudent);

//GET A STUDENT
router.get("/:id", studentController.getStudent);

//GET ALL STUDENT
router.get("/", studentController.getAllStudents);

//UPDATE A STUDENT
router.put("/:id", studentController.updateStudent);

//DELETE A STUDENT
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
