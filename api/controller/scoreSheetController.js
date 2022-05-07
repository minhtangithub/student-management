const { ScoreSheet } = require("../models/model");

const scoreSubjectController = {
  //ADD SCORE_SHEET
  addScoreSheet: async (req, res) => {
    try {
      const newScoreSheet = new ScoreSheet(req.body);
      const savedScoreSheet = await newScoreSheet.save();
      res.status(200).json(savedScoreSheet);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SCORE_SHEETS
  getAllScoreSheets: async (req, res) => {
    try {
      const scoreSheets = await ScoreSheet.find();
      res.status(200).json(scoreSheets);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A SCORE_SHEET
  getScoreSheet: async (req, res) => {
    try {
      const scoreSheet = await ScoreSheet.findById(req.params.id);
      res.status(200).json(scoreSheet);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE score_Sheet
  updateScoreSheet: async (req, res) => {
    try {
      const scoreSheet = await ScoreSheet.findById(req.params.id);
      await scoreSheet.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE SCORE_SHEET
  deleteScoreSheet: async (req, res) => {
    try {
      await ScoreSheet.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = scoreSubjectController;
