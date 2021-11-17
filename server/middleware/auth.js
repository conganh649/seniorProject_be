const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("A token is required for authorization");
    }
    jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
