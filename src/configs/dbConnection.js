const mongoose = require("mongoose");

const dbConnection = function () {
  mongoose
    .connect(process.env.MONGODB || "mongodb://127.0.0.1:27017/personelAPI")
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB not connected"));
};


module.exports = {dbConnection, mongoose}