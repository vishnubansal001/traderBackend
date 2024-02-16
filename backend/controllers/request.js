const jwt = require("jsonwebtoken");
const Request = require("../models/Request.model");
const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Team = require("../models/Team.model");
const Department = require("../models/Department.model");

exports.createRequest = async (req, res) => {
  try {
    const { subject, department, amount, reason, token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!user.isTeamLead) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const teamId = user.teamId;
    const event = user.eventId;
    if (!teamId || !event)
      return res.status(400).json({ message: "Team or Event not found" });
    const team = await Team.findById(teamId);
    if (!team) return res.status(400).json({ message: "Team not found" });
    if (team.banned) return res.status(400).json({ message: "Team is banned" });
    const request = new Request({
      subject,
      department,
      amount,
      reason,
      team: teamId,
      event,
    });
    await request.save();
    team.requests.push(request._id);
    await team.save();
    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!user.isTeamLead) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const teamId = user.teamId;
    const requestId = req.params.requestId;
    const team = await Team.findById(teamId);
    if (!team) return res.status(400).json({ message: "Team not found" });
    if (team.banned) return res.status(400).json({ message: "Team is banned" });
    const request = await Request.findById(requestId);
    if (!request) return res.status(400).json({ message: "Request not found" });
    if (request.status !== "pending")
      return res.status(400).json({ message: "Request already resolved" });
    request.status = "approved";
    await request.save();
    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.declineRequest = async (req, res) => {
  try {
    const { jwt } = req.body;
    const decoded = jwt.verify(jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!user.isTeamLead) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const teamId = user.teamId;
    const requestId = req.params.requestId;
    const team = await Team.findById(teamId);
    if (!team) return res.status(400).json({ message: "Team not found" });
    if (team.banned) return res.status(400).json({ message: "Team is banned" });
    const request = await Request.findById(requestId);
    if (!request) return res.status(400).json({ message: "Request not found" });
    if (request.status !== "pending")
      return res.status(400).json({ message: "Request already resolved" });
    request.status = "rejected";
    await request.save();
    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.showRequest = async (req, res) => {
  try {
    const { jwt } = req.body;
    const decoded = jwt.verify(jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const requestId = req.params.requestId;
    const request = await Request.findById(requestId);
    if (!request) return res.status(400).json({ message: "Request not found" });
    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.showRequestsDep = async (req, res) => {
  try {
    const { jwt } = req.body;
    const decoded = jwt.verify(jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const departmentId = req.params.departmentId;
    const department = await Department.findById(departmentId);
    if (!department)
      return res.status(400).json({ message: "Department not found" });
    const requests = await Request.find({ department: departmentId });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.showRequestsTeam = async (req, res) => {
  try {
    const { jwt } = req.body;
    const decoded = jwt.verify(jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user.role === "masterAdmin" || user.role === "juniorAdmin") {
      const teamId = req.params.teamId;
      const team = await Team.findById(teamId);
      if (!team) return res.status(400).json({ message: "Team not found" });
      const requests = await Request.find({ team: teamId });
      return res.status(200).json(requests);
    } else {
      const teamId = user.teamId;
      const team = await Team.findById(teamId);
      if (!team) return res.status(400).json({ message: "Team not found" });
      const requests = await Request.find({ team: teamId });
      return res.status(200).json(requests);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.showRequests = async (req, res) => {
  try {
    const { jwt } = req.body;
    const decoded = jwt.verify(jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const teamId = user.teamId;
    const requests = await Request.find({ team: teamId });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};