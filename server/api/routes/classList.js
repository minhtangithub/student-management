const router = require("express").Router();
const classListController = require("../controller/classListController");

// ADD A CLASS
router.post("/", classListController.addClassList);

//GET ALL CLASSES
router.get("/", classListController.getAllClassLists);

//GET A CLASS
router.get("/:id", classListController.getClassList);

//UPDATE A CLASS
router.put("/:id", classListController.updateClassList);

//DELETE A CLASS
router.delete("/:id", classListController.deleteClassList);

module.exports = router;
