const { CoEffect } = require("../models/model");

const coEffectController = {
  //ADD  COEFFECT
  addCoEffect: async (req, res) => {
    try {
      const newCoEffect = new CoEffect(req.body);
      const savedStudent = await newStudent.save();
      if (req.body._class) {
        const _class = _Class.findById(req.body._class);
        await _class.updateOne({ $push: { students: savedStudent._id } });
        res.status(200).json(savedStudent);
      }
      res.status(200).json(savedStudent);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL  COEFFECTS
  getAllCoEffects: async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A COEFFECT
  getCoEffect: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id).populate(
        "subjects",
        "_class"
      );

      res.status(200).json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A COEFFECT
  updateCoEffect: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      await student.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A COEFFECT
  deleteCoEffect: async (req, res) => {
    try {
      await _Class.updateMany(
        { students: req.params.id },
        { $pull: { students: req.params.id } }
      );
      await Subject.updateMany({ students: req.params.id }, { students: null });
      await Student.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = coEffectController;
