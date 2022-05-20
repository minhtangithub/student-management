const router = require("express").Router();
const cClassController = require("../controller/cClassController");

// ADD A CLASS
router.post("/", cClassController.addClass);

//GET ALL CLASSES
router.get("/", cClassController.getAllClasses);

//GET A CLASS
router.get("/:id", cClassController.getClass);

//UPDATE A CLASS
router.put("/:id", cClassController.updateClass);

//DELETE A CLASS
router.delete("/:id", cClassController.deleteClass);

module.exports = router;
