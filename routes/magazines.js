// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User and Contact models, so that they can be used in the routes.
const User = require("../models/User");
const Contact = require("../models/Contact");
const Magazines = require("../models/Magazine");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.

router.get("/viewer", async (req, res) => {
  try {
    console.log(req.query.id)
    const magazine = await Magazines.find({catalogID: req.query.id});
    res.json(magazine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
