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
const { uploadImage } = require("../middlewares/multer");
const eventRouter = express.Router();

eventRouter.post(
  "/",
  uploadImage.single("poster"),
  checkMasterAdmin,
  createEvent
);
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEvent);
eventRouter.put("/:id", checkMasterAdmin, updateEvent);
eventRouter.delete("/:id", checkMasterAdmin, deleteEvent);
eventRouter.post("/:id/department", checkMasterAdmin, addDepartment);
eventRouter.delete(
  "/:id/department/:departmentId",
  checkMasterAdmin,
  removeDepartment
);
eventRouter.get("/:id/departments", getDepartments);
eventRouter.put(
  "/:id/department/:departmentId",
  checkMasterAdmin,
  updateDepartment
);
eventRouter.post("/:id/team", checkMasterAdmin, addTeams);
eventRouter.get("/:id/teams", checkMasterAdmin, getTeams);
eventRouter.get("/:id/team/:teamId", checkMasterAdmin, getTeam);
eventRouter.delete("/:id/team/:teamId", checkMasterAdmin, deleteTeam);
eventRouter.put("/:id/team/:teamId/ban", checkMasterAdmin, banTeam);
eventRouter.put("/:id/team/:teamId/unban", checkMasterAdmin, unbanTeam);

module.exports = eventRouter;
