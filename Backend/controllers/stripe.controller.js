const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// Create Stripe Checkout Session
exports.createCheckoutSession = async (req, res) => {
  const { userType, email } = req.body;

  if (!userType || !["user", "eventManager"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  const priceId =
    userType === "user"
      ? process.env.USER_PRICE_ID
      : process.env.EVENT_MANAGER_PRICE_ID;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email, // for fallback and email confirmation
      metadata: {
        email,
        userType,
      },
      success_url: `${process.env.FRONTEND_URL}/register-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/register-cancelled`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Confirm payment using session ID
exports.confirmPayment = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing session ID" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status === "paid") {
      return res.json({ success: true, session });
    } else {
      return res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error confirming payment:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


