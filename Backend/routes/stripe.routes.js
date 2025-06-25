const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe.controller");

// Create Stripe Checkout Session
router.post("/create-checkout-session", stripeController.createCheckoutSession);
router.post("/confirm-payment", stripeController.confirmPayment);

module.exports = router;