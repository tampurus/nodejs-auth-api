const isAdminUser = (req, res, next) => {
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: 'Forbidden, You are not an admin user',
        })
    }
    else{
        return res.status(200).json({
            success: true,
            message: 'You are an admin user',
            user: {
                _id: req.userInfo.userId,
                username: req.userInfo.username,
                role: req.userInfo.role,
            },
        })
    }
    next();
};
module.exports = isAdminUser;