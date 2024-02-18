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
  history,
} = require("../controllers/event");
const { uploadImage, uploadCsv } = require("../middlewares/multer");
const {
  validateEvent,
  validateFormInputMiddleware,
  validateDepartment,
} = require("../middlewares/validator");
const eventRouter = express.Router();

eventRouter.post(
  "/",
  uploadImage.single("poster"),
  validateEvent,
  validateFormInputMiddleware,
  checkMasterAdmin,
  createEvent
); // done
eventRouter.get("/", getEvents); // done
eventRouter.get("/:id", getEvent); // done
eventRouter.put("/:id", checkMasterAdmin, updateEvent); // done
eventRouter.delete("/:id", checkMasterAdmin, deleteEvent); // done
eventRouter.post(
  "/:id/department",
  validateDepartment,
  validateFormInputMiddleware,
  checkMasterAdmin,
  addDepartment
); // done
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
eventRouter.post(
  "/:id/team",
  uploadCsv.single("file"),
  checkMasterAdmin,
  addTeams
); // done
eventRouter.post("/:id/teams", checkMasterAdmin, getTeams); // done
eventRouter.post("/:id/team/:teamId", checkMasterAdmin, getTeam); // done
eventRouter.delete("/:id/team/:teamId", checkMasterAdmin, deleteTeam); // done
eventRouter.put("/:id/team/:teamId/ban", checkMasterAdmin, banTeam); // done
eventRouter.put("/:id/team/:teamId/unban", checkMasterAdmin, unbanTeam); // done
eventRouter.post("/history", history); // done

module.exports = eventRouter;
