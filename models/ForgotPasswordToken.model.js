const mongoose = require("mongoose");

const forgotPasswordTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ForgotPasswordToken = mongoose.model(
  "ForgotPasswordToken",
  forgotPasswordTokenSchema
);
module.exports = ForgotPasswordToken;
