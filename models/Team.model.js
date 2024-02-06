const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teamLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  banned: {
    type: Boolean,
    default: false,
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
