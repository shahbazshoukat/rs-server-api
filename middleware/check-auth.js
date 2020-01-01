const jwt = require("jsonwebtoken");
const {
  config
} = require("./../../helpers");

const {
  HTTPStatusCodeConstants
} = require("../../constants");

module.exports = (req, res, next) => {
  console.log("checking auth");
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.get("tokenKey") );
    req.userData = {email: decodedToken.email, userId: decodedToken.userId}
    next();
  }catch(error){
    res.status(HTTPStatusCodeConstants.UNAUTHORIZED).json({message : HTTPStatusCodeConstants.MESSAGES.UNAUTHORIZED});
  }
}
