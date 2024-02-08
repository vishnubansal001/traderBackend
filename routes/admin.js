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

adminRouter.get("/users", getAllUsers); // done
adminRouter.get("/users/:id", getUserById); // done
adminRouter.get("/executives", getAllExecutives); // done
adminRouter.get("/junior-admins", getAllJuniorAdmins); // done
adminRouter.post("/make-junior-admin/:id", makeJuniorAdmin); // done
adminRouter.post("/make-executive-admin/:id", makeExecutiveAdmin); // done
adminRouter.post("/remove-admin/:id", removeAdmin); // done
adminRouter.put("/edit-profile/:id", editProfile); // done
adminRouter.delete("/delete-user/:id", deleteUser); // done

module.exports = adminRouter;
