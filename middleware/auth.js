const jwt = require("jsonwebtoken");

const withAuth = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
};

module.exports = withAuth;
