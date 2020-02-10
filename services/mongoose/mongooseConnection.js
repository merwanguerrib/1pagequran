require("dotenv").config();
import mongoose from "mongoose";

// Mongodb connection
const mongooseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(x => {
      console.log(
        `Connected to Mongo ! Database name : ${x.connections[0].name}`
      );
    })
    .catch(err => {
      console.error(`Error connecting to Mongo ${err}`);
    });
};

export default mongooseConnection;
