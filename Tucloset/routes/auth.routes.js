const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;

// POST /auth/signup - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password, and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ email, password: hashedPassword, name })
        .then((createdUser) => {
          const { email, name, _id } = createdUser;
          const user = { email, name, _id };
          res.status(201).json({ user: user });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// GET /auth/verify - Verifies the authentication token
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
