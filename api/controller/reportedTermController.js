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
      const reportedTerms = await SchoolYear.find();
      res.status(200).json(reportedTerms);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A SCHOOL_YEAR
  getReportedTerm: async (req, res) => {
    try {
      const reportedTerm = await ReportedTerm.findById(req.params.id);
      res.status(200).json(schoolYear);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE SCHOOL_YEAR
  updateReportedTerm: async (req, res) => {
    try {
      const schoolYear = await SchoolYear.findById(req.params.id);
      await schoolYear.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE SCHOOL_YEAR
  deleteReportedTerm: async (req, res) => {
    try {
      await SchoolYear.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = reportedTermController;
