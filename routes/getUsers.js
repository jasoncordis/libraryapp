// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});

router.get("/viewer/:id", async (req, res) => {
    try {
      const users = await Contact.find({});
      console.log(users);
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  
module.exports = router;
