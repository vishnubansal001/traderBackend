const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const { connectToDB } = require("./utils/db");
require("dotenv").config();
const authRouter = require("./routes/user");
const eventRouter = require("./routes/event");
const requestRouter = require("./routes/request");
const transactionRouter = require("./routes/transaction");
const adminRouter = require("./routes/admin");

connectToDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/auth", authRouter);
app.use("/event", eventRouter);
app.use("/request", requestRouter);
app.use("/transaction", transactionRouter);
app.use("/admin", adminRouter);

app.use("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is listening on port ${process.env.PORT}!`);
});
