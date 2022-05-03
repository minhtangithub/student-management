const router = require("express").Router();
const settingController = require("../controller/settingController");

// ADD SETTING
// router.post("/", settingController.addSetting);

//GET SETTING
router.get("/", settingController.getSetting);

//UPDATE SETTING
router.put("/:id", settingController.updateSetting);

module.exports = router;
