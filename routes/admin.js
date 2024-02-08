const express = require("express");
const adminRouter = express.Router();
const {
  getAllUsers,
  getUserById,
  makeJuniorAdmin,
  makeExecutiveAdmin,
  removeAdmin,
  editProfile,
  deleteUser,
  getAllExecutives,
  getAllJuniorAdmins,
} = require("../controllers/admin");

adminRouter.get("/users", getAllUsers);
adminRouter.get("/users/:id", getUserById);
adminRouter.get("/executives", getAllExecutives);
adminRouter.get("/junior-admins", getAllJuniorAdmins);
adminRouter.post("/make-junior-admin/:id", makeJuniorAdmin);
adminRouter.post("/make-executive-admin/:id", makeExecutiveAdmin);
adminRouter.post("/remove-admin/:id", removeAdmin);
adminRouter.put("/edit-profile/:id", editProfile);
adminRouter.delete("/delete-user/:id", deleteUser);

module.exports = adminRouter;
