import bcrypt from "bcrypt";
import crypto from "crypto";
import * as dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import passport from "passport";
import auth from "../middleware/auth.js";
import User from "../models/User.model.js";
dotenv.config();
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { idno, bgroup, batch, password, email } = req.body;
  console.log(bgroup);
  const exists = await User.findOne({ idno, batch });
  if (exists) {
    console.log("user exists");
    res.json({
      success: false,
      message: "User already exists!",
    });
  } else {
    try {
      const pass = bcrypt.hashSync(password, 10);
      const user = new User({
        idno,
        batch,
        bgroup,
        email,
        password: pass,
      });
      const result = await user.save();
      // console.log(result);
      res.json({ result });
    } catch (error) {
      console.log("user sign up failed", error);
    }
  }
});
router.get("/test", auth, (req, res) => {
  res.send("from test");
});
router.get("/getDonors", auth, async (req, res) => {
  const donors = await User.find({ isInterested: true });
  console.log(donors);
  return res.json({ data: donors });
});
//login
router.post("/signin", async (req, res) => {
  console.log("sign in");
  const { idno, batch, password } = req.body;
  const exists = await User.findOne({ idno, batch });
  if (exists) {
    const passMatch = await bcrypt.compare(password, exists.password);
    console.log(passMatch);
    if (passMatch) {
      const token = jwt.sign(
        {
          idno,
          batch,
        },
        "cat",
        {
          expiresIn: 3600,
        }
      );

      return res
        .cookie("jwt", token, {
          // httpOnly: true,
          // secure: false,
          // sameSite: "strict",
        })
        .json({
          success: true,
          message: "Login Success!",
          token,
        });
    } else {
      return res.json({
        success: false,
        message: "Login failed!",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "User not found!",
    });
  }
});
//log out
router.get("/signout", async (req, res) => {
  return res.cookie("jwt", "").json({
    success: true,
    message: "Logout Success!",
  });
});
//check auth
router.post("/checkAuth", async (req, res) => {
  const { token } = req.body;
  console.log(
    "here is the tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    token
  );
  if (token) {
    let { idno, batch } = jwt.verify(token, "cat");
    if (idno && batch) {
      req.user = {
        idno,
        batch,
      };
      return res
        .cookie("jwt", token, {
          // httpOnly: true,
          // secure: false,
          // sameSite: "strict",
        })
        .json({
          success: true,
          message: "Login Success!",
          token,
        });
    } else {
      res.json({
        success: false,
        message: "token not verified huh",
      });
    }
  } else {
    res.json({
      success: false,
      message: "token not verified huh",
    });
  }
});

//forgot password
router.post("/forgot", async (req, res) => {
  console.log("forgottt");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter your email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "No email could not be send" });
  }
  const getResetPasswordToken = () => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    return resetToken;
  };

  const resetToken = getResetPasswordToken();
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  await user.save();
  const resetUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;
  const options = {
    to: user.email,
    subject: "Password Reset Request",
    text: `Please go to this link to reset your password: ${resetUrl}`,
  };
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `Email could not be sent`,
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({
        success: true,
        message: `An email has been sent to ${email} with further instructions.`,
        resetToken,
      });
    }
  });
});

//reset password
router.post("/reset/:token", async (req, res) => {
  try {
    let { password } = req.body;
    const { token: resetToken } = req.params;

    if (!resetToken || !password)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Request" });

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Token or expired" });
    password = bcrypt.hashSync(password, 10);

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password has been reset" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//passport

//google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

//local login
router.post(
  "/local_login",
  passport.authenticate("local"),
  function (req, res) {
    console.log("successfully logged in");
    return res
      .cookie("user", token, {
        // httpOnly: true,
        // secure: false,
        // sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login Success!",
        token,
      });
    s;
    res.redirect("http://localhost:3000/donors");
  }
);

export default router;
