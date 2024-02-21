const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Department = require("../models/Department.model");
const Team = require("../models/Team.model");
const Transaction = require("../models/Transaction.model");
const { generateTransactionId } = require("../utils/helper");

exports.createTransaction = async (req, res) => {
  try {
    const { teamId, id } = req.params;
    const { amount, token } = req.body;
    if (!teamId || !amount) {
      return res.status(400).json({ message: "Team ID, amount are required" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    if (team.banned) {
      return res.status(400).json({ message: "This team is banned" });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    if (team.eventId.toString() !== id) {
      return res
        .status(400)
        .json({ message: "This team does not belong to this event" });
    }
    team.amount += +amount;
    await team.save();
    let sender;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user.role === "masterAdmin" || user.role === "juniorAdmin") {
      sender = user.name;
    } else {
      const department = await Department.findById(user.departmentId);
      if (!department) {
        return res.status(400).json({ message: "Invalid department ID" });
      }
      if (department.eventId.toString() !== id) {
        return res
          .status(400)
          .json({ message: "This department does not belong to this event" });
      }
      sender = department.name;
    }
    const transaction = await Transaction.create({
      amount,
      teamId,
      sender,
      eventId: id,
      transactionId: generateTransactionId(),
    });
    await transaction.save();
    team.history.push(transaction._id);
    await team.save();
    res.status(201).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const transactions = await Transaction.find({ eventId: id });
    if (!transactions) {
      return res.status(400).json({ message: "Invalid transactions ID" });
    }
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id, teamId, transactionId } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    if (team.eventId.toString() !== id) {
      return res
        .status(400)
        .json({ message: "This team does not belong to this event" });
    }
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    if (transaction.teamId.toString() !== teamId) {
      return res
        .status(400)
        .json({ message: "This transaction does not belong to this team" });
    }
    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id, teamId, transactionId } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    if (team.eventId.toString() !== id) {
      return res
        .status(400)
        .json({ message: "This team does not belong to this event" });
    }
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    if (transaction.teamId.toString() !== teamId) {
      return res
        .status(400)
        .json({ message: "This transaction does not belong to this team" });
    }
    await Transaction.findByIdAndDelete(transactionId);
    team.history.filter((id) => id != transactionId);
    await team.save();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeamTransactions = async (req, res) => {
  try {
    const { id, teamId } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Team ID is required" });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    if (team.eventId.toString() != id) {
      return res
        .status(400)
        .json({ message: "This team does not belong to this event" });
    }
    const transactions = await Transaction.find({ teamId });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTeamTransactions = async (req, res) => {
  try {
    const { id, teamId } = req.params;
    console.log(id, teamId);
    if (!id) {
      return res.status(400).json({ message: "Team ID is required" });
    }
    const event = await Event.findById(id);
    if (!event) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(400).json({ message: "Invalid team ID" });
    }
    if (team.eventId.toString() !== id) {
      return res
        .status(400)
        .json({ message: "This team does not belong to this event" });
    }
    if (!team.history.length) {
      return res.status(400).json({ message: "No transactions to delete" });
    }
    await Transaction.deleteMany({ teamId });
    await team.history.pull();
    await team.save();
    res.status(200).json({ message: "Transactions deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
