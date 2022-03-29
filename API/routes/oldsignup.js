const express = require("express");

const router = express.Router();

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/User");
const Token = require("../models/Token");

// Adding a User
router.post("/oldsignup", (req, res) => {
  const email = req.body.email;
  const translationType = req.body.translation;
  User.findOne({ email: email }, function (err, newUser) {
    if (err) {
      return res.status(500).send({ msg: err.message }, "FindOne Error");
    } else if (newUser) {
      return res.status(400).send({
        msg: `This email address: ${req.body.email} is already associated with another account`,
      });
    } else {
      newUser = new User({
        email: email,
        advancement: 1,
        translationType: translationType,
      });
      newUser.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        let token = new Token({
          _userId: newUser._id,
          token: crypto.randomBytes(16).toString("hex"),
        });
        token.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          const transporter = nodemailer.createTransport(
            sendgridTransport({
              auth: {
                api_key: process.env.SENDGRID_API_KEY,
              },
            })
          );
          let mailOptions = {
            from: "pageoftheday@1pagequran.com",
            to: newUser.email,
            subject: "Confirm your email adress",
            text: `Hello, please verify your email adress : ${newUser.email}\n 
              Click the following link : ${process.env.PUBLIC_URL}\/confirmation\/${token.token}
              \n\nThank You!\n
              `,
          };
          transporter.sendMail(mailOptions, function (err) {
            if (err) {
              console.error(err);
              return res.status(500).send({ msg: err.message });
            }
            return res
              .status(200)
              .send(
                `A verification email has been sent to ${newUser.email}. It will be expire after one day. If you did not get verification email click on resend token.`
              );
          });
        });
      });
    }
  });
});

module.exports = router;
