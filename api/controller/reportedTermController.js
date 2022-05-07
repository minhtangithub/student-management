const { ReportedTerm } = require("../models/model");

const reportedTermController = {
  //ADD REPORT_TERM
  addReportedTerm: async (req, res) => {
    try {
      const newReportedTerm = new ReportedTerm(req.body);
      const savedReportedTerm = await newReportedTerm.save();
      res.status(200).json(savedReportedTerm);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL REPORT_TERMS
  getReportedTerms: async (req, res) => {
    try {
      const reportedTerms = await ReportedTerm.find();
      res.status(200).json(reportedTerms);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A REPORT_TERM
  getReportedTerm: async (req, res) => {
    try {
      const reportedTerm = await ReportedTerm.findById(req.params.id);
      res.status(200).json(schoolYear);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE REPORT_TERM
  updateReportedTerm: async (req, res) => {
    try {
      const reportedTerm = await ReportedTerm.findById(req.params.id);
      await reportedTerm.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE REPORT_TERM
  deleteReportedTerm: async (req, res) => {
    try {
      await ReportedTerm.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = reportedTermController;
