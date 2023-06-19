import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { idno, bgroup, batch, password } = req.body;
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

//login
router.post("/signin", async (req, res) => {
  const { idno, batch, password } = req.body;
  const exists = await User.findOne({ idno, batch });
  if (exists) {
    const passMatch = bcrypt.compare(password, exists.password);
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
      // console.log(token);
      return res
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
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

export default router;
