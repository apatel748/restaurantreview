/*Imports express, router, and database*/
const express = require("express");
const router = express.Router();
const Review = require("../models/review");

/* Get the Index (home) page for navigation. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* Get the Best Restaurants page. */
router.get("/restaurants", async function (req, res, next) {
  try {
    // Used code to go search Review database to find Rating fields with 4-5 or return error.
    const topReviews = await Review.find({ rating: { $in: [4, 5] } }).sort({ rating: -1 }).limit(10);
    res.render("restaurants", { title: "Best Restaurants", reviews: topReviews });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching top reviews.");
  }
});

/* Get the help page for navigation. */
router.get("/help", function (req, res, next) {
  res.render("help");
});

/* "POST" the help form submission using the fields. */
router.post("/help", function (req, res, next) {
  const { name, email, message } = req.body;
  console.log(`Help submission: Name: ${name}, Email: ${email}, Message: ${message}`);
  res.send("Thank you for contacting us!");
});

module.exports = router;
