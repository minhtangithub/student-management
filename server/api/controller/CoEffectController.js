const { CoEffect } = require("../models/model");

const coEffectController = {
  //ADD  COEFFECT
  addCoEffect: async (req, res) => {
    try {
      const newCoEffect = new CoEffect(req.body);
      const savedStudent = await newCoEffect.save();
      res.status(200).json(savedStudent);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL  COEFFECTS
  getAllCoEffects: async (req, res) => {
    try {
      const coEffects = await CoEffect.find().populate("subject");
      res.status(200).json(coEffects);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A COEFFECT
  getCoEffect: async (req, res) => {
    try {
      const coEffect = await Student.findById().populate("subject");

      res.status(200).json(coEffect);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A COEFFECT
  updateCoEffect: async (req, res) => {
    try {
      const coEffect = await CoEffect.findById(req.params.id);
      await coEffect.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A COEFFECT
  deleteCoEffect: async (req, res) => {
    try {
      await CoEffect.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = coEffectController;
