const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
 username: {
    type : String,
    required : true,
    unique : true
 },
 email: {
    type: String,
    required:true,
    unique : true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
 },
 password: {
    type: String,
    required:true,
 },
  isAdmin: { 
        type: Boolean,
        default : false,
         },    
},

{timestamps:true}

);

module.exports = mongoose.model('User' , userSchema);