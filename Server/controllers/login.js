require("dotenv").config();
const jwt = require("jsonwebtoken");
const model = require("../model/users");
const express = require("express");
const app = express.Router();

// JWT-based login route
app.post("/", (req, res) => {
    const { email, password } = req.body;
    model
      .login(email, password)
      .then((data) => {
        if (data.isSuccess) {
          const token = jwt.sign(
            { email: data.data.email },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: 86400, // 24 hours
            }
          );
          return res.json({
            user: data.data,
            token,
            msg: "Login Success",
            isSuccess: true,
          });
        } else {
          return res.json({ msg: "Invalid Credentials",
            isSuccess: false
           });
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json({ msg: "Internal Server Error", error: error.message })
      );
  })

  .post("/register", (req, res, next) => {
    //This is the route that will be used to Add a user to the users.json file
    model
      .add(req.body)
      .then((data) => res.send(data))
      .catch(next);
  })
  module.exports = app;