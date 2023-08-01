import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    idno: {
      type: Number,
      required: true,
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
    location: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    needBetween: {
      type: String,
    },
    bgroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
