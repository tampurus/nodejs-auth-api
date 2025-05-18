const jwt = require('jsonwebtoken');
const authMiddlware = (req, res, next) => {
    authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user, No token provided',
        });
    }
    // verify token
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Decoded token => ", decodedToken);
        req.userInfo = decodedToken;
        next();
    }
    catch(e){
        return res.status(500).json({
            success: false,
            message: 'Unauthorized user, Invalid token',
        });
    }

}
module.exports = authMiddlware;