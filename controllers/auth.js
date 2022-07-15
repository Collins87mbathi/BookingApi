const User = require("../models/User");
const bcrypt = require("bcryptjs");
const CreateError = require("../utils/Error");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req,res,next) => {
 try {
    const {username,email, password} = req.body;
  
    if(!username || !email || !password) {
        return next(CreateError(401, "please feel all fields"))
        // return next(CreateError(422, "please feel all fields"))
    }
    if(!validatePassword(password)) {
    return next(CreateError(401, "password must contain atleast one number and an upper case"))
    }

  
   const salt = bcrypt.genSaltSync(10);
   const  hash = bcrypt.hashSync(password, salt);
  
    const savedUser  = await new User({
    username,
    email,
    password : hash,
    });
    await savedUser.save();
    res.status(200).send("User has been created");
 } catch (err) {
  next(err);
 }
}

function validatePassword(password) {
    const re =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
}


const login = async (req,res, next) => {
 try { 
    
 const user = await User.findOne({username: req.body.username});
  if(!user) return next(CreateError(404, "username does not exist"));
 const isMatch = await bcrypt.compare(req.body.password, user.password);
 if(!isMatch) return next(CreateError(400, "wrong password or username"));

 const token = jwt.sign({id:user._id , isAdmin:user.isAdmin}, process.env.JWT);
 const {password, isAdmin, ...otherDetails} = user._doc;
  res.cookie("access_token", token, {httpOnly: true,}).status(200).json({...otherDetails});
 }catch(err) {
    next(err);
 }

}

module.exports = {register,login};

