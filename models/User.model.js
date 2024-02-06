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
  },
  departmentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
