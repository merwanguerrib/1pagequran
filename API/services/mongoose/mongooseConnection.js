require("dotenv").config();
const mongoose = require("mongoose");

// Mongodb connection
const mongooseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo ! Database name : ${x.connections[0].name}`
      );
    })
    .catch((err) => {
      console.error(`Error connecting to Mongo ${err}`);
    });
};

module.exports = mongooseConnection;
