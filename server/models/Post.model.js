import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    idno: {
      type: Number,
      required: true,
      unique: true,
    },
    batch: {
      type: Number,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    bgroup: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: true,
    },
    needBetween: {
      type: String,
    },
    isInterested: {
      type: Boolean,
      default: false,
    },
    bgroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
