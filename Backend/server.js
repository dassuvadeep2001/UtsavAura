const express = require("express");
const cors = require("cors"); // ✅ Import CORS
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const db = require("./config/db");

const app = express();

// ✅ Enable CORS before all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // If you're using cookies/sessions
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true only with HTTPS
  })
);

// Middleware for attaching token from session
app.use((req, res, next) => {
  let auth = require("./middleware/auth")(req, res, next);
  app.use(auth.initialize());
  if (req.session.token && req.session.token != null) {
    req.headers["token"] = req.session.token;
  }
  next();
});

// Routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/eventManager", require("./routes/eventManager.routes"));
app.use("/api/review", require("./routes/review.routes"));
app.use("/api/query", require("./routes/query.routes"));
app.use("/api/stripe", require("./routes/stripe.routes"));
// Start server
app.listen(process.env.PORT, async () => {
  await db.connectDb();
  console.log("DB Connected Successfully!");
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
