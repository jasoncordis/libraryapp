const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  catalogID: {
    type: Number
  },
  title: {
    type: String
  },
  imageURL: {
    type: String
  },
  itemURL: {
    type: String
  }
});

module.exports = mongoose.model("Item", ContactSchema, "Item");
