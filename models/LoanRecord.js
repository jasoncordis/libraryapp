const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  catalogID: {
    type: Number,
    required: true
  },
  libraryID: {
    type: Number,
    required: true
  },
  checkedOut: {
    type: Number,
    required: true
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  }
});

module.exports = mongoose.model("loanrecord", UserSchema, "loanrecord");
