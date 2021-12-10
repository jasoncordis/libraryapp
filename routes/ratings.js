// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User and Contact models, so that they can be used in the routes.
const User = require("../models/User");
const Rating = require("../models/Rating");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", auth, async (req, res) => {
    try {
        const comments = await Rating.find({});
        res.json(comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});

router.post("/", async (req, res) => {
      // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
        console.log("heyyyy")
        const { user_rating, catalogID, libraryID, date_posted} = req.body;

        console.log(req.body)

        rating = new Rating({
          catalogID,
          libraryID,
          user_rating,
          date_posted
        });

        await Rating.deleteMany({catalogID: catalogID, libraryID: libraryID})
        await rating.save();

      } 
  );

router.get("/viewer/", async (req, res) => {
    try {
        const rating = await Rating.find({catalogID: req.query.id});
        res.json(rating);

      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});


module.exports = router;
