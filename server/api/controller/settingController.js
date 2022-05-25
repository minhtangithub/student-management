const { Setting } = require("../models/model");

const settingController = {
  //POST SETTING
  addSetting: async (req, res) => {
    try {
      const newSetting = new Setting(req.body);
      const savedSetting = await newSetting.save();
      res.status(200).json(savedSetting);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL SETTINGS
  getAllSettings: async (req, res) => {
    try {
      const settings = await Setting.find();
      res.status(200).json(settings);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET SETTING
  getSetting: async (req, res) => {
    try {
      const setting = await Setting.findById(req.params.id);
      res.status(200).json(setting);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE SETTING
  updateSetting: async (req, res) => {
    try {
      const setting = await Setting.findById(req.params.id);
      await setting.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE A SETTING
  deleteSetting: async (req, res) => {
    try {
      await Setting.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = settingController;
