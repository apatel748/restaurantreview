const express = require("express");
const router = express.Router();
const Review = require("../models/review");

//  Get reviews from the review database
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.render("reviews/list", { title: "All Reviews", reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching reviews.");
  }
});

// Get add page from reviews
router.get("/add", (req, res) => {
  res.render("reviews/add", { title: "Add a Review" });
});

// Creates a new review and post it into the database
router.post("/add", async (req, res) => {
  const { name, restaurant, comment, rating } = req.body;
  try {
    const newReview = new Review({ name, restaurant, comment, rating }); //enter these fields when adding review
    await newReview.save();
    res.redirect("/reviews");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving review.");
  }
});

// Get delete action to delete the review from the database
router.get("/delete/:id", async (req, res) => {
    const reviewId = req.params.id; 
    try {
      await Review.findByIdAndDelete(reviewId); //finds review by ID and deletes it
      res.redirect("/reviews"); 
        } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting the review.");
    }
  });
  

// Get edit review to change a review from the database
router.get("/edit/:id", async (req, res) => {
    const reviewId = req.params.id; //
    try {
      const review = await Review.findById(reviewId); // finds the review by its ID
      res.render("reviews/edit", { title: "Edit Review", review });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error editing the review.");
    }
  });
  
  // Edits the review and saves the new review with revised fields
  router.post("/edit/:id", async (req, res) => {
    const reviewId = req.params.id; // review ID
    const { name, restaurant, comment, rating } = req.body; // uses these fields to edit
    try {
      await Review.findByIdAndUpdate(reviewId, { name, restaurant, comment, rating }); //allow edit any of these fields
      res.redirect("/reviews");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating the review.");
    }
  });
  

module.exports = router;
