const express = require("express");
const checkMasterAdmin = require("../middlewares/admin");
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  addDepartment,
  removeDepartment,
  getDepartments,
  updateDepartment,
  addTeams,
  getTeams,
  getTeam,
  deleteTeam,
  banTeam,
  unbanTeam,
} = require("../controllers/event");
const { uploadImage, uploadCsv } = require("../middlewares/multer");
const eventRouter = express.Router();

eventRouter.post(
  "/",
  uploadImage.single("poster"),
  checkMasterAdmin,
  createEvent
); // done
eventRouter.get("/", getEvents); // done
eventRouter.get("/:id", getEvent); // done
eventRouter.put("/:id", checkMasterAdmin, updateEvent); // done
eventRouter.delete("/:id", checkMasterAdmin, deleteEvent); // done
eventRouter.post("/:id/department", checkMasterAdmin, addDepartment); // done
eventRouter.delete(
  "/:id/department/:departmentId",
  checkMasterAdmin,
  removeDepartment
); // done
eventRouter.get("/:id/departments", getDepartments); // done
eventRouter.put(
  "/:id/department/:departmentId",
  checkMasterAdmin,
  updateDepartment
); // done
eventRouter.post("/:id/team",uploadCsv, checkMasterAdmin, addTeams);
eventRouter.get("/:id/teams", checkMasterAdmin, getTeams);
eventRouter.get("/:id/team/:teamId", checkMasterAdmin, getTeam);
eventRouter.delete("/:id/team/:teamId", checkMasterAdmin, deleteTeam);
eventRouter.put("/:id/team/:teamId/ban", checkMasterAdmin, banTeam);
eventRouter.put("/:id/team/:teamId/unban", checkMasterAdmin, unbanTeam);

module.exports = eventRouter;
