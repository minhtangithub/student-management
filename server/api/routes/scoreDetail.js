const router = require("express").Router();
const scoreDetailController = require("../controller/scoreDetailController");

// ADD A CLASS
router.post("/", scoreDetailController.addScoreDetail);

//GET ALL CLASSES
router.get("/", scoreDetailController.getAllScoreDetails);

//GET A CLASS
router.get("/:id", scoreDetailController.getScoreDetail);

//UPDATE A CLASS
router.put("/:id", scoreDetailController.updateScoreDetail);

//DELETE A CLASS
router.delete("/:id", scoreDetailController.deleteScoreDetail);

module.exports = router;
