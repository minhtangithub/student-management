const { ScoreSubject } = require("../models/model");

const scoreSubjectController = {
  //ADD SCORE_SUBJECT
  addScoreSubject: async (req, res) => {
    try {
      const newScoreSubject = new ScoreSubject(req.body);
      const savedScoreSubject = await newScoreSubject.save();
      res.status(200).json(savedScoreSubject);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SCORE_SUBJECTS
  getAllScoreSubjects: async (req, res) => {
    try {
      const scoreSubjects = await ScoreSubject.find();
      res.status(200).json(scoreSubjects);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A SCORE_SUBJECT
  getScoreSubject: async (req, res) => {
    try {
      const scoreSubject = await ScoreSubject.findById(req.params.id);
      res.status(200).json(scoreSubject);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE SCORE_SUBJECT
  updateScoreSubject: async (req, res) => {
    try {
      const scoreSubject = await ScoreSubject.findById(req.params.id);
      await scoreSubject.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE SCORE_SUBJECT
  deleteScoreSubject: async (req, res) => {
    try {
      await ScoreSubject.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = scoreSubjectController;
