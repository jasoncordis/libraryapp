// CRUD functionality.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Brings in the User and Contact models, so that they can be used in the routes.
const User = require("../models/User");
const Contact = require("../models/Contact");
const Comment = require("../models/Comment");

// GET route with "api/contacts" endpoint to get all of the user's contacts. Private access.
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/test", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    console.log("yo")
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/viewer", async (req, res) => {
  try {
    console.log(req.query.id)
    const contacts = await Contact.find({catalogID: req.query.id});
    console.log(contacts)
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
    console.log("heyyyy")
    const {
      catalogID,
      added_by_librarianID,
      Title, 
      date_published,
      item_description,
      itemURL,
      imageURL,
      date_item_added} = req.body;

    console.log(req.body)

    item = new Contact({
      catalogID,
      added_by_librarianID,
      Title, 
      date_published,
      item_description,
      itemURL,
      imageURL,
      date_item_added
    });

    console.log(item);

    await item.save();

  } 
);


router.get("/delete", async (req, res) => {
  try {
    console.log(req.query.catalogID);
    catalogID = req.query.catalogID;
    await Contact.deleteMany({catalogID: catalogID})
    console.log(catalogID);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST route with "api/contacts" endpoint to add a new contact. Private access.
router.post(
  "/",
  [auth, [check("name", "Name is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// PUT route with "api/contacts/:id" endpoint to update contact. Private access.
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Checks to see if the fields are submitted by initializing an object and then adds to the contact fields.
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found." });

    // Verifies that logged in user is the owner of contact.
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorized." });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE route with "api/contacts/:id" endpoint to update contact. Private access.
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found." });

    // Verifies that logged in user is the owner of contact.
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorized." });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact has been removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
