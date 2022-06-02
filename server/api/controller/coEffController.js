const { CoEff } = require("../models/model");

const coEffController = {
  //POST COEFF
  addCoEff: async (req, res) => {
    try {
      const newCoEff = new CoEff(req.body);
      const savedCoEff = await newCoEff.save();
      res.status(200).json(savedCoEff);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL COEFFS
  getAllCoEffs: async (req, res) => {
    try {
      const coEffs = await CoEff.find();
      res.status(200).json(coEffs);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET COEFF
  getCoEff: async (req, res) => {
    try {
      const coEff = await CoEff.findById(req.params.id);
      res.status(200).json(coEff);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE COEFF
  updateCoEff: async (req, res) => {
    try {
      const coEff = await CoEff.findById(req.params.id);
      await coEff.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A COEFF
  deleteCoEff: async (req, res) => {
    try {
      await CoEff.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = coEffController;
