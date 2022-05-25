const { Grade, CClass } = require("../models/model");

const gradeController = {
  //ADD GRADE
  addGrade: async (req, res) => {
    try {
      const newGrade = new Grade(req.body);
      const savedGrade = await newGrade.save();

      res.status(200).json(savedGrade);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL GRADES
  getAllGrades: async (req, res) => {
    try {
      const grades = await Grade.find();
      res.status(200).json(grades);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A GRADE
  getGrade: async (req, res) => {
    try {
      const grade = await Grade.findById(req.params.id).populate("cClasses");
      res.status(200).json(grade);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A GRADE
  updateGrade: async (req, res) => {
    try {
      const grade = await Grade.findById(req.params.id);
      await grade.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A GRADE
  deleteGrade: async (req, res) => {
    try {
      await CClass.updateMany({ grade: req.params.id }, { grade: null });
      await Grade.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = gradeController;
