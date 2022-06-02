const router = require("express").Router();
const coEffController = require("../controller/coEffController");

// ADD A SETTING
router.post("/", coEffController.addCoEff);

//GET ALL SETTINGS
router.get("/", coEffController.getAllCoEffs);

//UPDATE A SETTING
router.put("/:id", coEffController.updateCoEff);

//GET A SETTING
router.get("/:id", coEffController.getCoEff);

//DELETE A SETTING
router.delete("/:id", coEffController.deleteCoEff);

module.exports = router;
