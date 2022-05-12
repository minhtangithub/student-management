const { Term } = require("../models/model");

const termController = {
  //ADD TERM
  addTerm: async (req, res) => {
    try {
      const newTerm = new Term(req.body);
      const savedTerm = await newTerm.save();
      res.status(200).json(savedTerm);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL TERMS
  getAllTerms: async (req, res) => {
    try {
      const terms = await Term.find();
      res.status(200).json(terms);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A TERM
  getTerm: async (req, res) => {
    try {
      const term = await Term.findById(req.params.id);
      res.status(200).json(term);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE A TERM
  updateTerm: async (req, res) => {
    try {
      const term = await Term.findById(req.params.id);
      await term.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A TERM
  deleteTerm: async (req, res) => {
    try {
      await Term.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = termController;
