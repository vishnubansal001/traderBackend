const express = require("express");
const requestRouter = express.Router();

const {
  createRequest,
  approveRequest,
  declineRequest,
  showRequest,
  showRequestsDep,
  showRequestsTeam,
  showRequests,
} = require("../controllers/request");
const {
  validateRequest,
  validateFormInputMiddleware,
} = require("../middlewares/validator");

requestRouter.post(
  "/",
  validateRequest,
  validateFormInputMiddleware,
  createRequest
); // done
requestRouter.post("/:id/approve/:requestId", approveRequest); // done
requestRouter.post("/:id/decline/:requestId", declineRequest); // done
requestRouter.get("/:id/:requestId", showRequest); // done
requestRouter.get("/:id/department/:departmentId", showRequestsDep); // done
requestRouter.post("/:id/team/:teamId", showRequestsTeam); // done
requestRouter.post("/:id/team", showRequestsTeam); // done
requestRouter.post("/:id", showRequests); // done

module.exports = requestRouter;
