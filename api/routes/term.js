const router = require("express").Router();
const termController = require("../controller/termController");

// ADD A TERM
router.post("/", termController.addTerm);

//GET A TERM
router.get("/:id", termController.getTerm);

//GET ALL TERMS
router.get("/", termController.getAllTerms);

//UPDATE A TERM
router.put("/:id", termController.updateTerm);

//DELETE A TERM
router.delete("/:id", termController.deleteTerm);

module.exports = router;
