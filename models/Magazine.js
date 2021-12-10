const mongoose = require("mongoose");

const MagazineSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  catalogID: {
    type: Number
  },
});
module.exports = mongoose.model("is_a_magazine", MagazineSchema, "is_a_magazine");
