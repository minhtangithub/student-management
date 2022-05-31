const router = require("express").Router();
const scoreSubjectController = require("../controller/scoreSubjectController");

// ADD A SCHOOL_YEAR
router.post("/", scoreSubjectController.addScoreSubject);

//GET ALL SCHOOL_YEAR
router.get("/", scoreSubjectController.getAllScoreSubjects);

//GET A SCHOOL_YEAR
router.get("/:id", scoreSubjectController.getScoreSubject);

//UPDATE A SCHOOL_YEAR
router.put("/:id", scoreSubjectController.updateScoreSubject);

//DELETE A SCHOOL_YEAR
router.delete("/:id", scoreSubjectController.deleteScoreSubject);

module.exports = router;
