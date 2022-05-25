const router = require("express").Router();
const settingController = require("../controller/settingController");

// ADD A SETTING
router.post("/", settingController.addSetting);

//GET ALL SETTINGS
router.get("/", settingController.getAllSettings);

//UPDATE A SETTING
router.put("/:id", settingController.updateSetting);

//GET A SETTING
router.get("/:id", settingController.getSetting);

//DELETE A SETTING
router.delete("/:id", settingController.deleteSetting);

module.exports = router;
