const express = require("express");
const {
  createTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
  getTeamTransactions,
  deleteTeamTransactions,
  getAllTransactions,
} = require("../controllers/transaction");
const checkMasterAdmin = require("../middlewares/admin");
const transactionRouter = express.Router();

transactionRouter.post("/:id/:teamId", checkMasterAdmin, createTransaction); // done
transactionRouter.post("/:id", checkMasterAdmin, getTransactions); // done
transactionRouter.post("/:id/:teamId/:transactionId", checkMasterAdmin, getTransaction); // done

module.exports = transactionRouter;
