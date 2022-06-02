const { ScoreSchoolYear } = require("../models/model");

const scoreSchoolYearController = {
  //ADD SCORE_SCHOOL_YEAR
  addScoreSchoolYear: async (req, res) => {
    try {
      const newScoreSchoolYear = new ScoreSchoolYear(req.body);
      const savedScoreSchoolYear = await newScoreSchoolYear.save();
      res.status(200).json(savedScoreSchoolYear);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SCORE_SCHOOL_YEARS
  getAllScoreSchoolYears: async (req, res) => {
    try {
      const scoreSheets = await ScoreSchoolYear.find();
      res.status(200).json(scoreSheets);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A SCORE_SCHOOL_YEAR
  getScoreSchoolYear: async (req, res) => {
    try {
      const scoreSchoolYear = await ScoreSchoolYear.findById(req.params.id);
      res.status(200).json(scoreSchoolYear);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE SCORE_SCHOOL_YEAR
  updateScoreSchoolYear: async (req, res) => {
    try {
      const scoreSchoolYear = await ScoreSchoolYear.findById(req.params.id);
      await scoreSchoolYear.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE SCORE_SCHOOL_YEAR
  deleteScoreSchoolYear: async (req, res) => {
    try {
      await ScoreSchoolYear.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = scoreSchoolYearController;
