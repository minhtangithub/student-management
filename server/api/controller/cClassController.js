const { Student, CClass, Grade } = require("../models/model");

const cClassController = {
  //ADD CLASS
  addClass: async (req, res) => {
    try {
      const newClass = new CClass(req.body);
      const savedClass = await newClass.save();
      if (req.body.grade) {
        const grade = Grade.findById(req.body.grade);
        await grade.updateOne({ $push: { cClasses: savedClass._id } });
      }
      res.status(200).json(savedClass);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL CLASSES
  getAllClasses: async (req, res) => {
    try {
      const classes = await CClass.find();
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A CLASS
  getClass: async (req, res) => {
    try {
      const cClass = await CClass.findById(req.params.id)
        .populate("students")
        .populate("grade");
      res.status(200).json(cClass);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A CLASS
  updateClass: async (req, res) => {
    try {
      const cClass = await CClass.findById(req.params.id);
      if (req.body.students) {
        for (let i = 0; i < req.body.students.length; i++) {
          await Student.updateOne({ cClass: req.params.id });
        }
      }
      await cClass.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A CLASS
  deleteClass: async (req, res) => {
    try {
      await Grade.updateMany(
        { cClasses: req.params.id },
        { $pull: { cClasses: req.params.id } }
      );
      await Student.updateMany({ cClass: req.params.id }, { cClass: null });
      await CClass.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = cClassController;
