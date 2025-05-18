const express = require('express');
const router = express.Router();
const authMiddlware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
router.get('/welcome', authMiddlware,isAdminUser, (req, res) => {
    res.json({
        message: 'Welcome to the admin page',
        user: {
            _id: req.userInfo.userId, 
            username: req.userInfo.username,
            role: req.userInfo.role,
        },
    });
});
module.exports = router; 
