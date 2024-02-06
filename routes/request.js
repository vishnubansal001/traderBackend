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

requestRouter.post("/", createRequest);
requestRouter.post("/:id/approve/:requestId", approveRequest);
requestRouter.post("/:id/decline/:requestId", declineRequest);
requestRouter.get("/:id/:requestId", showRequest);
requestRouter.get("/:id/department/:departmentId", showRequestsDep);
requestRouter.get("/:id/team/:teamId", showRequestsTeam);
requestRouter.get("/:id", showRequests);

module.exports = requestRouter;
