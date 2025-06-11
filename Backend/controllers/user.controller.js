const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Mailer = require("../helper/mailer");
const userRepo = require("../repository/user.repository");
const eventManagerModel = require("../models/eventManager.model");
const mongoose = require("mongoose");
const {
  userValidator,
  updateUserValidator,
  resetPasswordValidator,
} = require("../validators/user.validator");

const crypto = require("crypto");
const userModel = require("../models/user.model");
//encrypt and decrypt functions
const ENCRYPTION_KEY =
  process.env.CRYPTO_SECRET || "12345678901234567890123456789012"; // 32 chars for AES-256
const IV_LENGTH = 16;

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

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
//
class UserController {
  async register(req, res) {
    try {
      const { error, value } = userValidator.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(400).json({
          status: 400,
          message: error.details.map((err) => err.message).join(", "),
          data: {},
        });
      }
      let { name, email, phone, address, password } = value;

      let isEmailExist = await userRepo.findByEmail(email);
      if (isEmailExist.length > 0) {
        return res.json({
          status: 400,
          message: "Email already exists",
        });
      }

      let profileImage = req.file ? req.file.filename : "";
      let hashedPassword = await userRepo.hashPassword(password);

      let user = await userRepo.createUser({
        name,
        email,
        phone,
        address,
        profileImage,
        password: hashedPassword,
        role: "user",
      });

      if (user) {
        const emailVerifyToken = crypto.randomBytes(32).toString("hex");
        await userRepo.updateById(user._id, {
          emailVerifyToken,
          emailVerifyTokenCreatedAt: new Date(),
        });
        const mailer = new Mailer(
          "Gmail",
          process.env.APP_EMAIL,
          process.env.APP_PASSWORD
        );
        const verifyLink = `${process.env.FRONTEND_URL}/verify-email/${emailVerifyToken}`;
        let mailObj = {
          to: email,
          subject: "Verify Your Email",
          html: `<div style="line-height: 1.6;">
          <h2 style="color: #4A90E2;">Hi ${name},</h2>
          <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
          <div style="margin: 20px 0;">
            <a href="${verifyLink}" style="display:inline-block;padding:10px 20px;background:#4A90E2;color:#fff;text-decoration:none;border-radius:5px;">Verify Email</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #4A90E2; word-break: break-all;">${verifyLink}</p>
          <p>If you did not register, please ignore this email.</p>
          <br/>
          <p>Best regards,<br/>The UtsavAura Team</p>
        </div>`,
        };
        mailer.sendMail(mailObj);
      }

      let userData = await userRepo.getPublicProfileById(user._id);
      return res.json({
        status: 201,
        message: "User registered successfully",
        data: userData,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }

  async login(req, res) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await userRepo.findByEmail(email);
      if (!user || user.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const userObj = user[0];

      // Password validation
      const isMatch = await userRepo.validatePassword(
        password,
        userObj.password
      );
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Role validation
      if (role === "admin" && userObj.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Admin access denied. Please use admin credentials.",
        });
      }

      if (role === "user" && userObj.role === "admin") {
        return res.status(403).json({
          success: false,
          message: "Please use the Admin Login portal for this account.",
        });
      }

      // Token generation
      const token = jwt.sign(
        {
          id: userObj._id,
          role: userObj.role,
          email: userObj.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const encryptedToken = encrypt(token);
      const userData = await userRepo.getPublicProfileById(userObj._id);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: encryptedToken,
        user: {
          ...userData,
          role: userObj.role, // Ensure role is included
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const user = await userRepo.findByEmailVerifyToken(token);

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "Invalid or expired verification link",
          data: {},
        });
      }

      // Check if token is expired (5 minutes = 300000 ms)
      const now = Date.now();
      const createdAt = user.emailVerifyTokenCreatedAt
        ? new Date(user.emailVerifyTokenCreatedAt).getTime()
        : 0;
      if (!createdAt || now - createdAt > 5 * 60 * 1000) {
        // Expired: clear token
        await userRepo.updateById(user._id, {
          emailVerifyToken: null,
          emailVerifyTokenCreatedAt: null,
        });
        return res.status(400).json({
          status: 400,
          message: "Verification link expired.",
        });
      }

      await userRepo.updateById(user._id, {
        isVerified: true,
      });
      return res.json({
        status: 200,
        message: "Email verified successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }

  async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.json({
          status: 400,
          message: "Email is required",
          data: {},
        });
      }

      const user = await userRepo.findOneByEmail(email);
      if (!user) {
        return res.json({ status: 400, message: "User not found", data: {} });
      }

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}`;
      const mailer = new Mailer(
        "Gmail",
        process.env.APP_EMAIL,
        process.env.APP_PASSWORD
      );

      let mailObj = {
        to: email,
        subject: "Reset Password",
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4A90E2;">Hi ${user.name},</h2>
        <p>We received a request to reset your password. If you didn’t make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <a href="${resetLink}" target="_blank" 
           style="display: inline-block; background-color: #4A90E2; color: #fff; padding: 12px 20px; 
                  text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="color: #4A90E2; word-break: break-all;">${resetLink}</p>
        <br/>
        <p>Best regards,<br/>The UtsavAura Team</p>
      </div>`,
      };

      mailer.sendMail(mailObj);
      return res.json({
        status: 200,
        message: "Email sent successfully",
        data: {},
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }

  async resetPassword(req, res) {
    try {
      const { error, value } = resetPasswordValidator.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.json({
          status: 400,
          message: error.details.map((detail) => detail.message),
          data: {},
        });
      }
      const { password, confirmPassword } = value;

      const { id } = req.params;
      const user = await userRepo.findById(id);
      if (!user) {
        return res.json({ status: 400, message: "User not found", data: {} });
      }

      let hashedPassword = await userRepo.hashPassword(password);
      await userRepo.updateById(id, { password: hashedPassword });

      return res.json({
        status: 200,
        message: "Password reset successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }

  async profile(req, res) {
    try {
      const user = req.user;

      if (!user) {
        return res.json({
          status: 400,
          message: "User not found",
          data: {},
        });
      }

      // For normal user or admin
      if (user.role === "user" || user.role === "admin") {
        const userData = await userRepo.getPublicProfileById(user._id);
        return res.json({
          status: 200,
          message: "User fetched successfully",
          data: userData,
        });
      }

      // For event manager
      if (user.role === "eventManager") {
        const result = await eventManagerModel.aggregate([
          { $match: { eventManagerId: new mongoose.Types.ObjectId(user._id) } },
          {
            $lookup: {
              from: "users",
              localField: "eventManagerId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          { $unwind: "$userDetails" },
          {
            $lookup: {
              from: "reviews",
              let: { eventManagerId: "$eventManagerId" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$eventManagerId", "$$eventManagerId"] },
                  },
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "reviewer",
                  },
                },
                { $unwind: "$reviewer" },
                {
                  $project: {
                    _id: 1,
                    star: "$rating",
                    review: 1,
                    createdAt: 1,
                    userId: 1,
                    reviewerName: "$reviewer.name",
                    reviewerEmail: "$reviewer.email",
                  },
                },
              ],
              as: "reviews",
            },
          },
          {
            $project: {
              _id: 0,
              name: "$userDetails.name",
              email: "$userDetails.email",
              phone: "$userDetails.phone",
              address: "$userDetails.address",
              profileImage: "$userDetails.profileImage",
              gender: 1,
              age: 1,
              service: 1,
              description: 1,
              previousWorkImages: 1,
              role: "$userDetails.role",
              reviews: 1, // Now includes reviewer name and email
              isVerified: "$userDetails.isVerified",
            },
          },
        ]);

        if (!result.length) {
          return res.status(404).json({
            status: 404,
            message: "Event Manager profile not found",
            data: {},
          });
        }

        return res.json({
          status: 200,
          message: "Event Manager profile fetched successfully",
          data: result[0],
        });
      }

      // If role is not recognized
      return res.status(400).json({
        status: 400,
        message: "Invalid user role",
        data: {},
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }
  async updateProfile(req, res) {
    try {
      const user = req.user;
      const { error, value } = updateUserValidator.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.json({
          status: 400,
          message: error.details[0].message,
          data: {},
        });
      }
      const { name, email, phone, address, profileImage } = value;

      const updatedData = await userRepo.updateById(user._id, {
        name,
        email,
        phone,
        address,
        profileImage,
      });

      return res.json({
        status: 200,
        message: "Profile updated successfully",
        data: updatedData,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }

  async deleteProfile(req, res) {
    try {
      const user = req.user;

      // Fetch user data to get the profile image filename
      const userData = await userRepo.findById(user._id);
      if (userData && userData.profileImage) {
        // Use process.cwd() to get the project root directory
        const imagePath = path.join(
          process.cwd(),
          "uploads",
          userData.profileImage
        );
        // Delete the image file if it exists
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await userRepo.deleteById(user._id);
      return res.json({
        status: 200,
        message: "Profile deleted successfully",
        data: {},
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await userModel.find({
        isDeleted: false,
        role: { $ne: "admin" },
      });
      return res.json({
        status: 200,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }
  async getUserByEmail(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          status: 400,
          message: "Email query parameter is required",
          exists: false,
        });
      }

      const user = await userModel.findOne({
        email: email.toLowerCase(),
        isDeleted: false,
      });

      return res.json({
        status: 200,
        exists: !!user,
        message: user ? "Email already registered" : "Email is available",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        exists: false,
      });
    }
  }
}

module.exports = new UserController();
