const User = require("../models/User");


const getUsers = async (req,res,next) => {
    try {
       const allUser = await User.find();
       res.status(200).json(allUser);  
    } catch (err) {
    next(err);
    }
   }
   
   const getUser = async (req,res,next) => {
       try {
           const oneUser = await User.findById(req.params.id);  
           res.status(200).json(oneUser);
       } catch (err) {
           next(err);
       }
   }
   
   const updateUser = async (req, res,next) => {
       try {
         const updateUser = await User.findByIdAndUpdate(req.params.id,{$set : req.body});  
         res.status(200).json(updateUser);
       } catch (err) {
           next(err);
       }
   }
   
   const deleteUser = async (req,res,next) => {
     try {
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json("User deleted !");
     } catch (err) {
       next(err);
     }
   
   }

   module.exports = {getUsers,getUser,updateUser,deleteUser};