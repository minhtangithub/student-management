const { ReportedSubject } = require("../models/model");

const reportedSubjectController = {
  //ADD REPORTED_SUBJECT
  addReportedSubject: async (req, res) => {
    try {
      const newReportedSubject = new ReportedSubject(req.body);
      const savedReportedSubject = await newReportedSubject.save();
      res.status(200).json(savedReportedSubject);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL REPORTED_SUBJECTS
  getReportedSubjects: async (req, res) => {
    try {
      const reportedSubjects = await ReportedSubject.find();
      res.status(200).json(reportedSubjects);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A REPORTED_SUBJECT
  getReportedSubject: async (req, res) => {
    try {
      const reportedSubject = await ReportedSubject.findById(req.params.id);
      res.status(200).json(reportedSubject);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A REPORTED_SUBJECT
  updateReportedSubject: async (req, res) => {
    try {
      const reportedSubject = await ReportedSubject.findById(req.params.id);
      await reportedSubject.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE REPORTED_SUBJECT
  deleteReportedSubject: async (req, res) => {
    try {
      await ReportedSubject.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = reportedSubjectController;
