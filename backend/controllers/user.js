const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User.model");
const ForgotPasswordToken = require("../models/ForgotPasswordToken.model");
const { generateTransporter } = require("../utils/mail");
const Event = require("../models/Event.model");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (user.role === "user") {
      return res
        .status(400)
        .json({ message: "You are not authorized to access this route" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password, and name are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      name,
      isTeamLead: false,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (user.role === "user" || user.role === "executiveAdmin") {
      return res
        .status(400)
        .json({ message: "You are not authorized to access this route" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    var transporter = generateTransporter();
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<a href="http://localhost:4545/reset-password/${token}">Click here to reset your password</a>`,
    };
    const tok = await ForgotPasswordToken.create({
      token,
      user: user._id,
    });
    await tok.save();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and password are required" });
    }
    const tok = await ForgotPasswordToken.findOne({ token });
    if (!tok) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user._id.toString() !== tok.user.toString()) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.role === "user" || user.role === "executiveAdmin") {
      return res
        .status(400)
        .json({ message: "You are not authorized to access this route" });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password reset" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventLogin = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (user.password != password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (user.eventId.toString() !== id) {
      return res.status(400).json({ message: "Invalid event" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role !== "user" || !user.isTeamLead) {
      return res
        .status(400)
        .json({ message: "You are not authorized to access this route" });
    }
    const event = await Event.findById(user.eventId);
    if (!event) {
      return res.status(400).json({ message: "Event not found" });
    }
    if (user.teamMembers.length == event.teamSize) {
      return res.status(400).json({ message: "Team is full" });
    }
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password, and name are required" });
    }

    const newUser = await User.create({
      email,
      password,
      name,
      eventId: user.eventId,
      teamId: user.teamId,
      isTeamLead: false,
    });
    await newUser.save();
    user.teamMembers.push(newUser._id);
    await user.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.about = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role === "user") {
      const user = await User.findById(decoded.id)
        .populate("teamMembers")
        .populate("teamId");
      res.status(200).json({ user });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
