const eventManagerValidator = require("../validators/eventManager.validator");
const { userValidator } = require("../validators/user.validator");
const Mailer = require("../helper/mailer");
const eventManagerRepository = require("../repository/eventManager.repository");
const mongoose = require("mongoose");
const crypto = require("crypto");

class EventManagerController {
  async createEventManager(req, res) {
    try {
      const userFields = (({ name, email, phone, address, password }) => ({
        name,
        email,
        phone,
        address,
        password,
      }))(req.body);
      const { error: userError, value: userValue } = userValidator.validate(
        userFields,
        { abortEarly: false }
      );

      if (userError) {
        return res.status(400).json({
          status: 400,
          message: userError.details.map((err) => err.message).join(", "),
          data: {},
        });
      }

      const { name, email, phone, address, password } = userValue;

      const isEmailExist = await eventManagerRepository.isEmailExist(email);
      if (isEmailExist.length > 0) {
        return res.json({
          status: 400,
          message: "Email already exists",
        });
      }

      let profileImage = "";
      if (req.files?.profileImage?.length > 0) {
        profileImage = req.files.profileImage[0].filename;
      }

      let tempUser = new (require("../models/user.model"))();
      let hashedPassword = await tempUser.generateHash(password);

      let userData = {
        name,
        email,
        phone,
        address,
        profileImage,
        password: hashedPassword,
        role: "eventManager",
        isPaid: true,
      };

      let newEventManager = await eventManagerRepository.createUser(userData);

      const eventManagerFields = (({
        gender,
        age,
        categoryId,
        service,
        description,
        previousWorkImages,
      }) => ({
        gender,
        age,
        categoryId,
        service,
        description,
        previousWorkImages,
      }))(req.body);
      const { error: emError, value: emValue } = eventManagerValidator.validate(
        eventManagerFields,
        { abortEarly: false }
      );

      if (emError) {
        return res.status(400).json({
          status: 400,
          message: emError.details.map((err) => err.message).join(", "),
          data: {},
        });
      }

      let previousWorkImages =
        req.files?.previousWorkImages?.map((file) => file.filename) || [];

      let eventManagerDetails = {
        eventManagerId: newEventManager._id,
        ...emValue,
        previousWorkImages,
      };

      let newManager = await eventManagerRepository.createEventManagerDetails(
        eventManagerDetails
      );

      if (newManager) {
        const emailVerifyToken = crypto.randomBytes(32).toString("hex");
        await eventManagerRepository.updateUserById(newEventManager._id, {
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
          <h2 style="color: #4A90E2;">Hi ${newEventManager.name},</h2>
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

      return res.status(201).json({
        status: 201,
        message: "Event Manager created successfully",
        data: {
          email: newEventManager.email,
          name: newEventManager.name,
          eventManagerId: newEventManager._id,
          eventManagerDetails: newManager,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async updateEventManager(req, res) {
    try {
      const eventManagerId = req.user;

      const existingUser = await eventManagerRepository.findUserById(
        eventManagerId
      );
      if (!existingUser || existingUser.role !== "eventManager") {
        return res.status(404).json({
          status: 404,
          message: "Event Manager not found",
          data: {},
        });
      }

      const userFields = (({ name, email, phone, address }) => ({
        name,
        email,
        phone,
        address,
      }))(req.body);
      const { error: userError, value: userValue } = userValidator
        .fork(["password"], (schema) => schema.forbidden())
        .validate(userFields, { abortEarly: false });

      if (userError) {
        return res.status(400).json({
          status: 400,
          message: userError.details.map((err) => err.message).join(", "),
          data: {},
        });
      }

      if (userValue.email && userValue.email !== existingUser.email) {
        const emailExists = await eventManagerRepository.isEmailExist(
          userValue.email
        );
        if (emailExists.length > 0) {
          return res.status(400).json({
            status: 400,
            message: "Email already exists",
          });
        }
      }

      if (req.files?.profileImage?.length > 0) {
        userValue.profileImage = req.files.profileImage[0].filename;
      }

      await eventManagerRepository.updateUserById(eventManagerId, userValue);

      const eventManagerFields = (({
        gender,
        age,
        categoryId,
        service,
        description,
      }) => ({
        gender,
        age,
        service,
        description,
        categoryId,
      }))(req.body);

      const { error: emError, value: emValue } = eventManagerValidator.validate(
        eventManagerFields,
        { abortEarly: false }
      );
      if (emError) {
        return res.status(400).json({
          status: 400,
          message: emError.details.map((err) => err.message).join(", "),
          data: {},
        });
      }

      if (req.files?.previousWorkImages) {
        emValue.previousWorkImages = req.files.previousWorkImages.map(
          (file) => file.filename
        );
      }

      await eventManagerRepository.updateEventManagerDetails(
        eventManagerId,
        emValue
      );

      return res.status(200).json({
        status: 200,
        message: "Event Manager profile updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getEventManagerFullDetails(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Event Manager ID",
        });
      }

      const result = await eventManagerRepository.getFullDetailsById(id);

      return res.status(200).json({
        status: 200,
        message: "Event Manager details fetched successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = new EventManagerController();
