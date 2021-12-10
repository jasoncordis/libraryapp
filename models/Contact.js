const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  catalogID: {
    type: Number
  },
  added_by_librarianID: {
    type: Number
  },
  Title: {
    type: String
  },
  item_description: {
    type: String
  },
  date_published: {
    type: Date
  },
  itemURL: {
    type: String
  },
  imageURL: {
    type: String
  },
  date_item_added: {
    type: Date
  }
});

module.exports = mongoose.model("Item", ContactSchema, "Item");
