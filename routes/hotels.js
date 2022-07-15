const router = require("express").Router();
const {CreateHotel,getHotels,getHotel,updateHotel, deleteHotel} = require("../controllers/hotel");
 const  {verifyAdmin} = require("../utils/vertifyToken")

router.post('/',verifyAdmin,CreateHotel);
router.get('/', getHotels);
router.get('/:id', getHotel);
router.put('/:id',verifyAdmin,updateHotel);
router.delete('/:id',verifyAdmin, deleteHotel);


module.exports = router;