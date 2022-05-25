const router = require("express").Router();
const coEffectController = require("../controller/coEffectController");

// ADD A GRADE
router.post("/", coEffectController.addCoEffect);

//GET ALL GRADES
router.get("/", coEffectController.getAllCoEffects);

//GET A GRADE
router.get("/:id", coEffectController.getCoEffect);

//PUT A GRADE
router.put("/:id", coEffectController.updateCoEffect);

//DELETE A GRADE
router.delete("/:id", coEffectController.deleteCoEffect);

module.exports = router;
