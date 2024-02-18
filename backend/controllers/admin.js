const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

exports.getAllUsers = async (req, res) => {
  try {
    // console.log(req.body);
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const users = await User.find({
      eventId: null,
      role: { $ne: "masterAdmin" },
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const usr = await User.findById(req.params.id);
    res.status(200).json({ usr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.makeJuniorAdmin = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const usr = await User.findByIdAndUpdate(req.params.id, {
      role: "juniorAdmin",
    });
    res.status(200).json({ usr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.makeExecutiveAdmin = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const usr = await User.findByIdAndUpdate(req.params.id, {
      role: "executiveAdmin",
    });
    res.status(200).json({ usr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const usr = await User.findByIdAndUpdate(req.params.id, {
      role: "user",
    });
    res.status(200).json({ usr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const usr = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ usr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const usr = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ usr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExecutives = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const executives = await User.find({ role: "executiveAdmin" });
    res.status(200).json({ executives });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllJuniorAdmins = async (req, res) => {
  try {
    const token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId.id);
    if (user.role !== "masterAdmin") {
      return res.status(400).json({ message: "You are not authorized" });
    }
    const juniorAdmins = await User.find({ role: "juniorAdmin" });
    res.status(200).json({ juniorAdmins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
