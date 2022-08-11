const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dataBaseConnect = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log("connection to database established");
};

module.exports = dataBaseConnect;