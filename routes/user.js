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

authRouter.post("/login", login); // done
authRouter.post("/register", register); // done
authRouter.post("/:id/login", eventLogin); // done
authRouter.post("/:id/add-user", addUser); // done

module.exports = authRouter;
