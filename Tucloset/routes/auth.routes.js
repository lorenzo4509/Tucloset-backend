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
          const user = { email, name, _id, userId: _id};

          // Generate JWT token
          const token = jwt.sign({ userId: createdUser._id }, process.env.TOKEN_SECRET, {
            expiresIn: "1h", // Token will expire in 1 hour. Adjust this according to your needs.
          });

          res.status(201).json({ user: user, token: token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// POST /auth/login - Authenticates the user and generates an authentication token
router.post("/login",(req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "Wrong credentials." });
        return;
      }

      bcrypt
        .compare(password, user.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res.status(400).json({ message: "Wrong credentials." });
            return;
          }

          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: "1h", // Token will expire in 1 hour. Adjust this according to your needs.
          });

          res.status(200).json({ user, userId: user._id, token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// GET /auth/logout - Logs out the user
router.get("/logout", isAuthenticated, (req, res) => {
  // Perform any necessary logout operations

  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
