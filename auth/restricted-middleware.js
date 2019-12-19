const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

    jwt.verify(token, secret, function(err, decodedToken) {
      if (err) {
          console.log(err)
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again" });
  }
};
