// Imports mongoose library
const mongoose = require("mongoose");

// Creates the schema with all the fields in the database collection

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          
    restaurant: { type: String, required: true },    
    comment: { type: String, required: true },       
    rating: { type: Number, required: true, min: 1, max: 5 }, 
    date: { type: Date, default: Date.now },         
  },
  { collection: "all" } // Collection under the Review database
);

module.exports = mongoose.model("Review", ReviewSchema);
