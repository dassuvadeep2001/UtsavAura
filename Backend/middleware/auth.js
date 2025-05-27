const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const crypto = require("crypto");

// --- Encryption/Decryption Helpers ---
const ENCRYPTION_KEY =
  process.env.CRYPTO_SECRET || "12345678901234567890123456789012"; // 32 chars
const IV_LENGTH = 16;
function decrypt(text) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
// --- End Helpers ---

// --- Extract and Decrypt JWT from Header ---
function extractAndDecryptToken(req) {
  let token = req.headers["x-access-token"];
  if (!token) return null;
  try {
    return decrypt(token);
  } catch (e) {
    return null;
  }
}

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromExtractors([extractAndDecryptToken]),
};

module.exports = () => {
  const strategy = new JwtStrategy(params, async (payload, done) => {
    // No res here, just use done for errors
    if (!payload.id) {
      return done(null, false);
    }
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(payload.id),
          isDeleted: false,
        },
      },
    ]).exec();
    if (user && user[0]) {
      return done(null, user[0]);
    } else {
      return done(null, false);
    }
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
          return res.send({
            status: 500,
            message: "please provide a valid token",
          });
        }
        if (!user) {
          return res.send({
            status: 401,
            message: "User not found",
          });
        }
        req.user = user;
        return next();
      })(req, res, next);
    },
    //for admin
    adminAuthenticate: (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
          return res.send({
            status: 500,
            message: "please provide a valid token",
          });
        }
        if (!user || user.role !== "admin") {
          return res.send({
            status: 401,
            message: "This route is only for admin",
          });
        }
        req.user = user;
        return next();
      })(req, res, next);
    },
  };
};
