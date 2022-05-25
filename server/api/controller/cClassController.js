const { Student, CClass, Grade } = require("../models/model");

const cClassController = {
  //ADD CLASS
  addClass: async (req, res) => {
    try {
      const newcClass = new CClass(req.body);
      const savedcClass = await newcClass.save();
      if (req.body.grade) {
        // const author = Author.find({ _id: req.body.author });
        const grade = Grade.findById(req.body.grade);
        await grade.updateOne({ $push: { cClasses: savedcClass._id } });
      }
      res.status(200).json(savedcClass);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL CLASSES
  getAllClasses: async (req, res) => {
    try {
      const cClasses = await CClass.find();
      res.status(200).json(cClasses);
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
      if (req.body.grade && !cClass.grade) {
        // const author = Author.find({ _id: req.body.author });
        const grade = Grade.findById(req.body.grade);
        await grade.updateOne({ $push: { cClasses: cClass._id } });
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
