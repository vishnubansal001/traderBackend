const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.makeJuniorAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      role: "juniorAdmin",
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.makeExecutiveAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      role: "executiveAdmin",
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      role: "user",
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExecutives = async (req, res) => {
  try {
    const executives = await User.find({ role: "executiveAdmin" });
    res.status(200).json({ executives });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllJuniorAdmins = async (req, res) => {
  try {
    const juniorAdmins = await User.find({ role: "juniorAdmin" });
    res.status(200).json({ juniorAdmins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
