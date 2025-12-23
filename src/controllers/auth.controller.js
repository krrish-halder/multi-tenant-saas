const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateJWT, generateRandomToken } = require("../utils/token");
const { sendMail } = require("../services/mail.service");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const ApiResponse = require("../utils/apiResponse");
const emailQueue = require("../queues/email.queue");

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return ApiResponse.error(res, error.message, {}, 422);
    }

    const { email, username, password } = req.body;

    const exists = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (exists) {
      if (exists.email === email) {
        return ApiResponse.error(res, "Email already exists", {}, 409);
      }
      return ApiResponse.error(res, "Username already exists", {}, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateRandomToken();

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;

    await emailQueue.add("send-verification-email", {
      to: email,
      subject: "Verify your email",
      html: `
    <h2>Email Verification</h2>
    <p>Click the link below to verify your email:</p>
    <a href="${verifyUrl}">${verifyUrl}</a>
  `,
    });
  // await sendMail({
  //   to: email,
  //   subject: "Verify your email",
  //   html: `
  //       <h2>Email Verification</h2>
  //       <p>Click the link below to verify your email:</p>
  //       <a href="${verifyUrl}">${verifyUrl}</a>
  //     `,
  // });

    return ApiResponse.success(
      res,
      "Registration successful. Please verify your email.",
      {},
      201
    );
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return ApiResponse.error(res, "Verification token missing", {}, 400);
    }

    const user = await User.findOne({
      emailVerificationToken: token,
    }).select("+emailVerificationToken");

    if (!user) {
      return ApiResponse.error(res, "Invalid or expired token", {}, 400);
    }

    user.emailVerifiedAt = new Date();
    user.emailVerificationToken = null;
    await user.save();

    return ApiResponse.success(res, "Email verified successfully");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return ApiResponse.error(res, error.message, {}, 422);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return ApiResponse.error(res, "Invalid credentials", {}, 401);
    }

    if (!user.emailVerifiedAt) {
      return ApiResponse.error(res, "Please verify your email first", {}, 403);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return ApiResponse.error(res, "Invalid credentials", {}, 401);
    }

    const token = generateJWT({
      userId: user._id,
    });

    return ApiResponse.success(res, "Login successfully", {
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};
