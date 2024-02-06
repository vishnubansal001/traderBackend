const express = require("express");
const {
  login,
  register,
  forgotPassword,
  resetPassword,
  eventLogin,
  addUser,
} = require("../controllers/user");
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.post("/:id/login", eventLogin);
authRouter.post("/:id/add-user", addUser);

module.exports = authRouter;
