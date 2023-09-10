import jwt from "jsonwebtoken";
const isVerified = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    let { idno, batch } = jwt.verify(token, "cat");
    if (idno && batch) {
      req.user = {
        idno,
        batch,
      };
      next();
    } else {
      res.json({
        success: false,
        message: "token not verified",
      });

    }
  } else {
    res.json({
      success: false,
      message: "token not verified",
    });
  }
};
export default isVerified;
