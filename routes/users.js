const router = require("express").Router();
const {getUser,getUsers,deleteUser,updateUser} = require("../controllers/user");
const {verifyUser,verifyAdmin} = require("../utils/vertifyToken");

// router.get("/checkuser/:id",verifyAdmin, (req,res) => {
//     res.status(200).send(
//         "its me a admin i can delete all accounts"
//     );
//   })
router.get('/',verifyAdmin,getUsers);
router.get('/:id', verifyUser,getUser);
router.delete('/:id', verifyUser,deleteUser);
router.put('/:id', verifyUser,updateUser);

module.exports = router;