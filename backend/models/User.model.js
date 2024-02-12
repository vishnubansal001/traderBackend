const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  eventId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    default: null,
  },
  departmentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null,
  },
  role: {
    type: String,
    enum: ["masterAdmin", "juniorAdmin", "executiveAdmin", "user"],
    default: "user",
  },
  isTeamLead: {
    type: Boolean,
    default: false,
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
