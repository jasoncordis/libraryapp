// Register route.
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Brings in the User model, so that it can be used in the routes.
const Librarian = require("../models/Librarian");

// POST route with "api/users" endpoint that registers a user. Public access.
router.post(
  "/",
  [
    // Express validators that check the required name, valid email address, and the length of the user's password.
    check("user_name", "Please enter a name.").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_name, librarianID, password } = req.body;

    try {
      // Checks to see if there is a user.
      let user = await Librarian.findOne({ librarianID });
      // Returns an error if the user is already registered.
      if (user) {
        return res.status(400).json({
          msg: "User already exists. Please choose another email address.",
        });
      }

      user = new Librarian({
        user_name,
        librarianID,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      // Hashes the user's password.
      user.password = await bcrypt.hash(password, salt);
      // Saves the user in the database.
      await user.save();
      // Creates the payload.
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Signs the token.
      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600,
        },
        // Responds with the token.
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
