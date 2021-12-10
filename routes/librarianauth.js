const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User model, so that it can be used in the routes.
const Librarian = require("../models/Librarian");

// Login and authentication. Validates the logged in user.
const express = require("express");
const router = express.Router();

// GET route with "api/auth" endpoint that gets the logged in user. Private access.
router.get("/", auth, async (req, res) => {
  console.log('hey');
  // Passed in auth as a second parameter in order to make it a protected route.
  try {
    const user = await Librarian.findById(req.user.id).select("-password");
    console.log(req.user.id);
    console.log("helloooooo");
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

router.get("/viewer/:id", auth, async (req, res) => {
  // Passed in auth as a second parameter in order to make it a protected route.
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});


// POST route with "api/auth" endpoint that authorizes the user and gets the token. Public access.
router.post(
  "/",
  [
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    console.log('hey1');
    // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { librarianID, password } = req.body;

    try {
      let user = await Librarian.findOne({ librarianID });
      console.log(user);

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials." });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
