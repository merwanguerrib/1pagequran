require("dotenv").config();

const express = require("express");
const app = express();
const { handleError } = require("./helpers/error");

const mongooseConnection = require("./services/mongoose/mongooseConnection");
const sendPagesEmails = require("./services/sendPagesEmails");

const cron = require("node-cron");

const bodyParser = require("body-parser");

app.listen(process.env.PORT, () =>
  console.log(`1pageQuran app listening on port ${process.env.PORT}!`)
);

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongodb connection
mongooseConnection();

const signup = require("./routes/signup");
app.use("/", signup);

const verification = require("./routes/verification");
app.use("/verification/:id/:token", verification);

// Function Call to be deleted after testing
//sendPagesEmails();

// ########## UNCOMMENT AFTER TESTING ########
//Setup the Cron to execute everyday at 7:00 am (change to '* * * * *' to execute every minute for test purposes)
// cron.schedule("0 7 * * *", () => {
//   sendPagesEmails();
// });

//The error-handling middleware must be the last among other middleware and routes for it to function correctly.
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
