const router = require("express").Router();
const cClassListController = require("../controller/cClassListController");

// ADD A CLASS
router.post("/", cClassListController.addClassList);

//GET ALL CLASSES
router.get("/", cClassListController.getAllClassLists);

//GET A CLASS
router.get("/:id", cClassListController.getClassList);

//UPDATE A CLASS
router.put("/:id", cClassListController.updateClassList);

//DELETE A CLASS
router.delete("/:id", cClassListController.deleteClassList);

module.exports = router;
