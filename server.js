const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { connectToDB } = require("./utils/db");
require("dotenv").config();

app.listen(process.env.PORT, async () => {
  await connectToDB();
  console.log(`Server is listening on port ${process.env.PORT}!`);
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());
