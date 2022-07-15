 const app = require('./index');
 const express = require('express');
 const authRoute = require('./routes/auth');
 const userRoute = require('./routes/users');
 const roomsRoute = require("./routes/rooms");
 const hotelsRoute = require("./routes/hotels");
 require("dotenv").config();
 const cookieParser = require("cookie-parser")
const CONNECTDB = require("./Database/connect");
// const {verifyUser, verifyAdmin} = require("./utils/vertifyToken");


//database connection 
CONNECTDB(process.env.MONGO_URL);
 app.use(cookieParser());
 app.use(express.json());

 //middlewares

 app.use('/api/auth' , authRoute);
 app.use('/api/users', userRoute);
 app.use('/api/rooms', roomsRoute);
 app.use('/api/hotels',hotelsRoute);

 app.use((err, req, res, next) => {
 const errorStatus = err.status  || 500;
 const errorMessage = err.message || "Something went wrong!";
 return res.status(errorStatus).json({
   success:false,
   status:errorStatus,
   message: errorMessage,
   stack: err.stack,
 })
 });

 app.get("/", (req,res) => {
   res.status(200).send("welcome to reservation application.");
 })



 app.listen(5000, () => {
    console.log("server is running");
 });