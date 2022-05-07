const router = require("express").Router();
const settingController = require("../controller/settingController");

// ADD SETTING
router.post("/", settingController.addSetting);

//GET ALL SETTINGS
router.get("/", settingController.getSetting);

//GET A SETTING
router.get("/:id", settingController.getSetting);

//UPDATE SETTING
router.put("/:id", settingController.updateSetting);

module.exports = router;
