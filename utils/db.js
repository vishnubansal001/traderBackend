const mongoose = require("mongoose");

exports.connectToDB = async () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(err);
    });
};
