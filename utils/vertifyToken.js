const jwt = require("jsonwebtoken");
const CreateError = require("../utils/Error");

const verifyToken = (req,res,next) => {
 const token = req.cookies.access_token;
 if(!token) {
    return next(CreateError(401, "You are not authenticated"));
 }
jwt.verify(token , process.env.JWT, (err, user)=> {
  if(err) return next(CreateError(403, "Token is not valid!"));
  req.user = user;
  next();    
});
};

const verifyUser = (req,res, next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id) {
            next();
        }else {
            return next(CreateError(403, "You are not user")); 
        }
    });
}
const verifyAdmin = (req,res,next) => {
   verifyToken(req,res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        return next(CreateError(403, "You are not authorized"));
    }
   });
} 

module.exports = {verifyToken,verifyUser,verifyAdmin};
