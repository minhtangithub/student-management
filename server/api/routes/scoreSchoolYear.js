const router = require("express").Router();
const scoreShoolYearController = require("../controller/scoreShoolYearController");

// ADD A SCHOOL_YEAR
router.post("/", scoreShoolYearController.addScoreSchoolYear);

//GET ALL SCHOOL_YEAR
router.get("/", scoreShoolYearController.getAllScoreSchoolYears);

//GET A SCHOOL_YEAR
router.get("/:id", scoreShoolYearController.getScoreSchoolYear);

//UPDATE A SCHOOL_YEAR
router.put("/:id", scoreShoolYearController.updateScoreSchoolYear);

//DELETE A SCHOOL_YEAR
router.delete("/:id", scoreShoolYearController.deleteScoreSchoolYear);

module.exports = router;
