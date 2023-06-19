import jwt from "jsonwebtoken";
const isVerified = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    let decoded = jwt.verify(token, "cat");
    // console.log("your", decoded);
    if (decoded) {
      req.username = decoded.username;
      next();
    } else {
      res.send("not  token");
    }
  } else {
    res.send("not found token");
  }
};
export default isVerified;
