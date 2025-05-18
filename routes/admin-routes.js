const express = require('express');
const router = express.Router();
const authMiddlware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');
router.get('/welcome', authMiddlware,isAdminUser, (req, res) => {
    res.json({
        message: 'Welcome to the admin page',
        user: {
            _id: userId, 
            username,
            role,
        },
    });
});
module.exports = router; 