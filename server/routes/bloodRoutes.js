import express from "express";
import auth from "../middleware/auth.js";
import Post from "../models/Post.model.js";
import User from "../models/User.model.js";
const router = express.Router();

router.get("/getDonors", auth, async (req, res) => {
  let donorsQuery = User.find({ isInterested: true });
  donorsQuery = donorsQuery.sort(req.query.sort);
  let donors = await donorsQuery;
  console.log(req.query.sort);
  // console.log(donors);
  return res.json({ data: donors });
});
//get personal post
router.get("/getPosts", auth, async (req, res) => {
  const author = await User.findOne({ idno: req.user.idno });
  const posts = await Post.find({ author: author._id });
  console.log(posts);
  return res.json({ data: posts });
});
//delete personal posts
router.post("/deletePost", auth, async (req, res) => {
  await Post.findOneAndDelete({ _id: req.body._id })
    .then((result) => {
      console.log("post deleted successfully");
      return res.json({ success: true, message: "post deleted successfully" });
    })
    .catch((err) => console.log(err));
});
router.post("/post", auth, async (req, res) => {
  console.log(req.body);
  const { post, bgroup, phone, location, needBetweenDate, needBetweenTime } =
    req.body;
  const { idno, batch, _id } = await User.findOne({ idno: req.user.idno });
  const posted = await Post.create({
    post,
    bgroup,
    phone,
    location,
    needBetween: needBetweenTime + "," + needBetweenDate,
    idno,
    batch,
    author: _id,
  });

  return res.json({ data: "post created successfully" });
});

export default router;
