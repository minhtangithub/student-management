const { CClassList } = require("../models/model");

const cClassListController = {
  //ADD CCLASSLIST
  addClassList: async (req, res) => {
    try {
      const newcClassList = new CClassList(req.body);
      const savedcClassList = await newcClassList.save();
      res.status(200).json(savedcClassList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL CCLASSLISTS
  getAllClassLists: async (req, res) => {
    try {
      const cClassLists = await CClassList.find();
      res.status(200).json(cClassLists);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A CCLASSLIST
  getClassList: async (req, res) => {
    try {
      const cClassList = await CClassList.findById(req.params.id);
      res.status(200).json(cClassList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE CCLASSLIST
  updateClassList: async (req, res) => {
    try {
      const cClassList = await CClassList.findById(req.params.id);
      await cClassList.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE CCLASSLIST
  deleteClassList: async (req, res) => {
    try {
      await CClassList.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = cClassListController;
