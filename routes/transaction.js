const express = require("express");
const {
  createTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
  getTeamTransactions,
  deleteTeamTransactions,
} = require("../controllers/transaction");
const checkMasterAdmin = require("../middlewares/admin");
const transactionRouter = express.Router();

transactionRouter.post("/:id/:teamId", checkMasterAdmin, createTransaction);
transactionRouter.get("/:id", checkMasterAdmin, getTransactions);
transactionRouter.get("/:id/:teamId/:transactionId", checkMasterAdmin, getTransaction);
transactionRouter.delete(
  "/:id/:teamId/:transactionId",
  checkMasterAdmin,
  deleteTransaction
);
transactionRouter.get(
  "/:id/transactions/:teamId",
  checkMasterAdmin,
  getTeamTransactions
);
transactionRouter.delete(
  "/:id/transactions/:teamId",
  checkMasterAdmin,
  deleteTeamTransactions
);

module.exports = transactionRouter;
