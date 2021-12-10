// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User and Contact models, so that they can be used in the routes.
const User = require("../models/User");
const Comment = require("../models/Comment");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", auth, async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.json(comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});

router.post("/", async (req, res) => {
      // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
        console.log("heyyyy")
        const { user_comment, catalogID, libraryID, date_posted} = req.body;

        console.log(req.body)

        comment = new Comment({
          catalogID,
          libraryID,
          user_comment,
          date_posted
        });
        await comment.save();

      } 
  );

router.get("/viewer/", async (req, res) => {
    try {
        const comments = await Comment.find({catalogID: req.query.id});
        res.json(comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});


module.exports = router;
