const { Student, _Class } = require("../models/model");

const _classController = {
  //ADD CLASS
  addClass: async (req, res) => {
    try {
      const newClass = new _Class(req.body);
      const savedClass = await newClass.save();
      res.status(200).json(savedClass);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL CLASSES
  getAllClasses: async (req, res) => {
    try {
      const classes = await _Class.find().populate("students");
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A CLASS
  getClass: async (req, res) => {
    try {
      const _class = await _Class.findById(req.params.id).populate("students");
      res.status(200).json(_class);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A CLASS
  updateClass: async (req, res) => {
    try {
      const _class = await _Class.findById(req.params.id);
      await _class.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A CLASS
  deleteClass: async (req, res) => {
    try {
      await Student.updateMany({ _class: req.params.id }, { _class: null });
      await _Class.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = _classController;
