const { SchoolYear } = require("../models/model");

const schoolYearController = {
  //ADD SCHOOL_YEAR
  addSchoolYear: async (req, res) => {
    try {
      const newSchoolYear = new SchoolYear(req.body);
      const savedSchoolYear = await newSchoolYear.save();
      res.status(200).json(savedSchoolYear);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SCHOOL_YEAR
  getAllSchoolYears: async (req, res) => {
    try {
      const schoolYears = await SchoolYear.find();
      res.status(200).json(schoolYears);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A SCHOOL_YEAR
  getSchoolYear: async (req, res) => {
    try {
      const schoolYear = await schoolYear.findById(req.params.id);
      res.status(200).json(schoolYear);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE SCHOOL_YEAR
  updateSchoolYear: async (req, res) => {
    try {
      const schoolYear = await SchoolYear.findById(req.params.id);
      await schoolYear.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE SCHOOL_YEAR
  deleteSchoolYear: async (req, res) => {
    try {
      await SchoolYear.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = schoolYearController;
