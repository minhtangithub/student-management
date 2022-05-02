const { Student, Subject } = require("../models/model");

const subjectController = {
  //ADD SUBJECT
  addStudent: async (req, res) => {
    try {
      const newSubject = new Subject(req.body);
      const savedSubject = await newSubject.save();
      res.status(200).json(savedStudent);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SUBJECTS
  getAllSubjects: async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.status(200).json(subjects);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A STUDENT
  getSubject: async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id).populate(
        "subjects",
        "_class"
      );

      res.status(200).json(subject);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A SUBJECT
  updateSubject: async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id);
      await subject.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A STUDENT
  deleteStudent: async (req, res) => {
    try {
      await Student.updateMany({ subjects: req.params.id }, { subjects: null });
      await Subject.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = subjectController;
