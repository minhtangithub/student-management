const { Student, CClass } = require("../models/model");

const _classController = {
  //ADD CLASS
  addClass: async (req, res) => {
    try {
      const newClass = new CClass(req.body);
      const savedClass = await newClass.save();
      res.status(200).json(savedClass);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL CLASSES
  getAllClasses: async (req, res) => {
    try {
      const classes = await CClass.find().populate("students");
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A CLASS
  getClass: async (req, res) => {
    try {
      const cClass = await CClass.findById(req.params.id).populate("students");
      res.status(200).json(cClass);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A CLASS
  updateClass: async (req, res) => {
    try {
      const cClass = await CClass.findById(req.params.id);
      await cClass.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A CLASS
  deleteClass: async (req, res) => {
    try {
      await Student.updateMany({ cClass: req.params.id }, { cClass: null });
      await CClass.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = _classController;
