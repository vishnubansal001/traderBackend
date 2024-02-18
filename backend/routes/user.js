const express = require("express");
const {
  login,
  register,
  about,
  eventLogin,
  addUser,
} = require("../controllers/user");
const {
  validateLogin,
  validateFormInputMiddleware,
  validateUser,
} = require("../middlewares/validator");
const authRouter = express.Router();

authRouter.post("/login", validateLogin, validateFormInputMiddleware, login); // done
authRouter.post(
  "/register",
  validateUser,
  validateFormInputMiddleware,
  register
); // done
authRouter.post(
  "/:id/login",
  validateLogin,
  validateFormInputMiddleware,
  eventLogin
); // done
authRouter.post(
  "/add-user",
  validateUser,
  validateFormInputMiddleware,
  addUser
); // done
authRouter.post("/about", about); // done

module.exports = authRouter;
