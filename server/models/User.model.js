import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  idno: {
    type: Number,
    required: true,
    unique: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  lastDonated: {
    type: Date,
  },
  isInterested: {
    type: Boolean,
    default: true,
  },
  bgroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export default mongoose.model("User", UserSchema);
