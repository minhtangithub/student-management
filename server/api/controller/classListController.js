const { ClassList } = require("../models/model");

const classListController = {
  //ADD CLASSLIST
  addClassList: async (req, res) => {
    try {
      const newClassList = new ClassList(req.body);
      const savedClassList = await newClassList.save();
      res.status(200).json(savedClassList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL CLASSLISTS
  getAllClassLists: async (req, res) => {
    try {
      const classLists = await ClassList.find();
      res.status(200).json(classLists);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A CCLASSLIST
  getClassList: async (req, res) => {
    try {
      const classList = await ClassList.findById(req.params.id);
      res.status(200).json(classList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE CCLASSLIST
  updateClassList: async (req, res) => {
    try {
      const classList = await ClassList.findById(req.params.id);
      await classList.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE CCLASSLIST
  deleteClassList: async (req, res) => {
    try {
      await ClassList.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = classListController;
