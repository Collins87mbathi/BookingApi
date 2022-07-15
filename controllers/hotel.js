const Hotel = require('../models/Hotel');


//create a hotel

const CreateHotel = async (req,res,next) => {
const newHotel = await new Hotel(req.body);
try {
const savedHotel = await newHotel.save();
res.status(200).json(savedHotel);    
} catch (err) {
    next(err);
}

}

const getHotels = async (req,res,next) => {
 try {
    const allHotel = await Hotel.find();
    res.status(200).json(allHotel);  
 } catch (err) {
 next(err);
 }
}

const getHotel = async (req,res,next) => {
    try {
        const oneHotel = await Hotel.findById(req.params.id);  
        res.status(200).json(oneHotel);
    } catch (err) {
        next(err);
    }
}

const updateHotel = async (req, res,next) => {
    try {
      const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set : req.body})  
      res.status(200).json(updateHotel);
    } catch (err) {
        next(err);
    }
}

const deleteHotel = async (req,res,next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel deleted !");
  } catch (err) {
    next(err);
  }

}

module.exports = {CreateHotel,getHotels,getHotel,updateHotel,deleteHotel};