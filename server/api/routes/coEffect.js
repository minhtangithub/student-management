const router = require("express").Router();
const coEffectController = require("../controller/coEffectController");

// ADD A COEFFECT
router.post("/", coEffectController.addCoEffect);

//GET ALL COEFFECTS
router.get("/", coEffectController.getAllCoEffects);

//GET A COEFFECT
router.get("/:id", coEffectController.getCoEffect);

//PUT A COEFFECT
router.put("/:id", coEffectController.updateCoEffect);

//DELETE A COEFFECT
router.delete("/:id", coEffectController.deleteCoEffect);

module.exports = router;
