const { ScoreDetail } = require("../models/model");

const scoreDetailController = {
  //ADD SCORE_DETAIL
  addScoreDetail: async (req, res) => {
    try {
      const newScoreDetail = new ScoreDetail(req.body);
      const savedScoreDetail = await newScoreDetail.save();
      res.status(200).json(savedScoreDetail);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SCORE_DETAILS
  getAllScoreDetails: async (req, res) => {
    try {
      const scoreDetails = await ScoreDetail.find();
      res.status(200).json(scoreDetails);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A SCORE_DETAIL
  getScoreDetail: async (req, res) => {
    try {
      const scoreDetail = await ScoreDetail.findById(req.params.id);
      res.status(200).json(scoreDetail);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE SCORE_DETAIL
  updateScoreDetail: async (req, res) => {
    try {
      const scoreDetail = await ScoreDetail.findById(req.params.id);
      await scoreDetail.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE SCORE_DETAIL
  deleteScoreDetail: async (req, res) => {
    try {
      await ScoreDetail.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = scoreDetailController;
