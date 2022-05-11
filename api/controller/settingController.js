const { Setting } = require("../models/model");

const settingController = {
  addSetting: async (req, res) => {
    try {
      const newSetting = new Setting(req.body);
      const savedSetting = await newSetting.save();
      res.status(200).json(savedSetting);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET SETTING
  getSetting: async (req, res) => {
    try {
      const setting = await Setting.find(req.params.id);
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
};

module.exports = settingController;
