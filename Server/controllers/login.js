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
            email: data.data.email,
            token,
            msg: "Login Success",
          });
        } else {
          return res.json({ msg: "Invalid Credentials" });
        }
      })
      .catch((error) =>
        res
          .status(500)
          .json({ msg: "Internal Server Error", error: error.message })
      );
  });
  module.exports = app;