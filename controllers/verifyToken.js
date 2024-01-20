const jwt = require("jsonwebtoken");
const User = require("../models/User")
const verifyTokens = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      //Bearer
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
          req.user = user;
          next();
        } else {
          console.error(err);
          res.status(403).json("Token không hợp lệ");
        }
      });
    } else {
      res.status(401).json("Bạn chưa được xác thực");
    }
  },
  verifyTokenAdminAuth: (req, res, next) => {
    verifyTokens.verifyToken(req, res, () => {
      if (req.user.id !== req.params.id ||req.user.isAdmin) {
       
        next();
      } else {  
        res.status(403).json("Bạn không được phép xóa người dùng khác");
      }
    });
  },
};

module.exports = verifyTokens;