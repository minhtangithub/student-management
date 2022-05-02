const router = require("express").Router();
const _classController = require("../controller/_classController");

// ADD A CLASS
router.post("/", _classController.addClass);

//GET ALL CLASSES
router.get("/", _classController.getAllClasses);

//GET A CLASS
router.get("/:id", _classController.getClass);

//UPDATE A CLASS
router.put("/:id", _classController.updateClass);

module.exports = router;
