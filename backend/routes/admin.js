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

adminRouter.post("/users", getAllUsers); // done
adminRouter.post("/users/:id", getUserById); // done
adminRouter.post("/executives", getAllExecutives); // done
adminRouter.post("/junior-admins", getAllJuniorAdmins); // done
adminRouter.post("/make-junior-admin/:id", makeJuniorAdmin); // done
adminRouter.post("/make-executive-admin/:id", makeExecutiveAdmin); // done
adminRouter.post("/remove-admin/:id", removeAdmin); // done
adminRouter.put("/edit-profile/:id", editProfile); // done
adminRouter.delete("/delete-user/:id", deleteUser); // done

module.exports = adminRouter;
