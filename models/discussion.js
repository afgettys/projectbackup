const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  bookTitle: { type: String, required: true },
  headline: { type: String, required: true },
  review: { type: String, required: true }
});

const Book = mongoose.model("Discussion", discussionSchema);

module.exports = Book;
