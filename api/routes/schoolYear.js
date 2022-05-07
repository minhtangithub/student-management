const router = require("express").Router();
const schoolYearController = require("../controller/schoolYearController");

// ADD A SCHOOL_YEAR
router.post("/", schoolYearController.addSchoolYear);

//GET ALL SCHOOL_YEAR
router.get("/", schoolYearController.getAllSchoolYears);

//GET A SCHOOL_YEAR
router.get("/:id", schoolYearController.getSchoolYear);

module.exports = router;
