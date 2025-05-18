const express = require('express');
const router = express.Router();
const authMiddlware = require('../middleware/auth-middleware');
router.get('/welcome',authMiddlware,(req,res)=>{
    const {username , userId,role} = req.userInfo;
    res.json({
        messaage: "welcome to home page",
        user: {
            _id : userId,
            username,
            role
        }
    })
})

module.exports = router;