const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  catalogID: {
    type: Number
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model("is_a_book", BookSchema, "is_a_book");
