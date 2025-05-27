const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Mailer = require("../helper/mailer");
const userRepo = require("../repository/user.repository");
const {
  userValidator,
  updateUserValidator,
  resetPasswordValidator,
} = require("../validators/user.validator");


const crypto = require("crypto");
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
          data: {},
        });
      }

      let profileImage = req.file ? req.file.filename : "";
      let hashedPassword = await userRepo.hashPassword(password);
      let otp = Math.floor(100000 + Math.random() * 900000);

      let user = await userRepo.createUser({
        name,
        email,
        phone,
        address,
        profileImage,
        password: hashedPassword,
        otp,
        otpCreatedAt: new Date(),
      });

      if (user) {
        const mailer = new Mailer(
          "Gmail",
          process.env.APP_EMAIL,
          process.env.APP_PASSWORD
        );
        let mailObj = {
          to: email,
          subject: "Registration Confirmation",
          html: `<div style="line-height: 1.6;">
        <h2 style="color: #4A90E2;">Hi ${name},</h2>
        <p>Thank you for registering with us. To complete your registration, please verify your email address using the OTP below:</p>
        <div style="margin: 20px 0; padding: 10px; background-color: #f1f1f1; border-left: 4px solid #4A90E2;">
          <p style="font-size: 20px; font-weight: bold; color: #4A90E2; margin: 0;">${otp}</p>
        </div>
        <p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
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
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          message: "Email and password are required",
          data: {},
        });
      }

      let user = await userRepo.findByEmail(email);

      if (user.length > 0) {
        if (user[0].otp) {
          return res.json({
            status: 400,
            message: "User not verified. Please verify via OTP within 3 days.",
            data: {},
          });
        }

        let isMatch = await userRepo.validatePassword(
          password,
          user[0].password
        );
        if (!isMatch) {
          return res.json({
            status: 400,
            message: "Invalid credentials",
            data: {},
          });
        }

        let token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        let encryptedToken = encrypt(token);

        let userData = await userRepo.getPublicProfileById(user[0]._id);

        return res.json({
          status: 200,
          message: "Login successfull",
          data: userData,
          token: encryptedToken, // Send encrypted token
        });
      } else {
        return res.json({
          status: 400,
          message: "Authentication failed",
          data: {},
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: error.message, data: {} });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.json({
          status: 400,
          message: "Email and OTP are required",
          data: {},
        });
      }

      const userArr = await userRepo.findByEmail(email);
      if (userArr.length === 0) {
        return res.json({
          status: 400,
          message: "Invalid OTP or user not found",
          data: {},
        });
      }

      const user = userArr[0];

      // Check if OTP expired (3 days)
      if (user.otp && user.otpCreatedAt) {
        const otpCreatedAt = new Date(user.otpCreatedAt);
        const now = new Date();
        const diffMs = now - otpCreatedAt;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        if (diffDays > 3) {
          // Delete profile image if exists
          if (user.profileImage) {
            const imagePath = path.join(
              process.cwd(),
              "uploads",
              user.profileImage
            );
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          }
          // Delete user if OTP expired
          await userRepo.deleteByEmail(email);
          return res.json({
            status: 400,
            message:
              "OTP expired. Your registration has been removed. Please register again.",
            data: {},
          });
        }
      }

      if (user.otp == otp) {
        await userRepo.updateByEmail(email, { otp: null, otpCreatedAt: null });
        return res.json({
          status: 200,
          message: "Email verified successfully",
          data: {},
        });
      }

      return res.json({
        status: 400,
        message: "Invalid OTP or user not found",
        data: {},
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

      const resetLink = `http://localhost:3000/reset-password/${user._id}`;
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
      if (password !== confirmPassword) {
        return res.json({
          status: 400,
          message: "Password and confirm password does not match",
          data: {},
        });
      }

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
        data: {},
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
      const userData = await userRepo.getPublicProfileById(user._id);
      return res.json({
        status: 200,
        message: "User fetched successfully",
        data: userData,
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
}

module.exports = new UserController();
