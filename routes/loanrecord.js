// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User and Contact models, so that they can be used in the routes.
const User = require("../models/User");
const Loan = require("../models/LoanRecord");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", async (req, res) => {
    try {
        console.log(req.query.libraryID);
        const loans = await Loan.find({libraryID: req.query.libraryID, checkedOut: 1});
        console.log(loans)
        res.json(loans);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});

router.get("/return", async (req, res) => {
    try {
        console.log(req.query.libraryID);
        var today = new Date();
        await Loan.updateMany({libraryID: req.query.libraryID, catalogID: req.query.catalogID}, { checkedOut: 0, returnDate: today });

      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
});

router.post("/", async (req, res) => {
      // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
        console.log("heyyyy")
        const { catalogID, libraryID, checkedOut, borrowDate, returnDate} = req.body;

        console.log(req.body)

        loan = new Loan({
          catalogID,
          libraryID,
          checkedOut,
          borrowDate,
          returnDate
        });
        await loan.save();

      } 
  );

  router.get("/viewer", async (req, res) => {
    try {
      const loans = await Loan.find({catalogID: req.query.catalogID, libraryID: req.query.libraryID});
      console.log(req.body);
      res.json(loans);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


module.exports = router;
