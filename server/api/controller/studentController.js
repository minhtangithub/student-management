const { Student, CClass, Subject } = require("../models/model");

const studentController = {
  //ADD STUDENT
  addStudent: async (req, res) => {
    try {
      const newStudent = new Student(req.body);
      const savedStudent = await newStudent.save();
      if (req.body.cClass) {
        const cClass = CClass.findById(req.body.cClass);
        await cClass.updateOne({ $push: { students: savedStudent._id } });
      }
      res.status(200).json(savedStudent);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL STUDENTS
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A STUDENT
  getStudent: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id)
        .populate("cClass")
        .populate("subjects");
      res.status(200).json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A STUDENT
  updateStudent: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (req.body.cClass && !student.cClass) {
        // const author = Author.find({ _id: req.body.author });
        const cClass = CClass.findById(req.body.cClass);
        await cClass.updateOne({ $push: { students: student._id } });
      }
      await student.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A STUDENT
  deleteStudent: async (req, res) => {
    try {
      await CClass.updateMany(
        { students: req.params.id },
        { $pull: { students: req.params.id } }
      );
      await Subject.updateMany(
        { students: req.params.id },
        { $pull: { students: req.params.id } }
      );
      await Student.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = studentController;
