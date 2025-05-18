const bcrypt = require('bcryptjs');
const UserData = require('../models/user');
const jwt = require('jsonwebtoken');
// resigter controller
const registerUser = async(req,res)=>{
    try{
        // extracting user data from req.body 
        const {username, email, password, role} = req.body;

        //check username & email already exits in datbase
        const checkExistingUser = await UserData.findOne({$or : [{username},{email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User already exist either by username or email',
            })
        }
        
        // hash user password
        const salt = await bcrypt.genSalt(10); // default was 10 only
        const hashedPassword =  await bcrypt.hash(password,salt);


        // creat a new user 
        const newlyCreatedUswer = new UserData({
            username,
            email,
            password: hashedPassword,
            role : role || 'user',
        })
        await newlyCreatedUswer.save();
        if(newlyCreatedUswer){
            return res.status(201).json({
                success : true,
                message : 'User resgistered successfully',
            })
        }
        else{
            return res.status(404).json({
                success : false,
                message : 'unable to register user',
            })
        }

    }
    catch(e){
        console.log(`Something went wrong while registering user => ${e}`);
        res.status(500).json({
            success : false,
            message : "some error in registring, please try again",
        })
    }
}


// login controller
const loginUser = async(req,res)=>{
    try{
        const {username, password} = req.body;

        // username and password are required
        if(!username || !password) {
            return res.status(400).json({
                success : false,
                message : 'Username and password are required'
            })
        }
        // checking if user exist in DB or not ?
        const userDataFromDB = await UserData.findOne({username});
        if(!userDataFromDB){
            return res.status(400).json({
                success : false,
                message : 'Invalid Username'
            })
        }
        // checking password is correct or not ?
        const isPasswordMatch = await bcrypt.compare(password,userDataFromDB.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'Invalid Password'
            })
        }

        // creating user token
        const accessToken = jwt.sign(
        {
            userId : userDataFromDB._id,
            username : userDataFromDB.username,
            role : userDataFromDB.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn : '15m'
        })
        res.status(200).json({
            success : true,
            message : 'Logged in successfully',
            accessToken,
            user: {
                username: userDataFromDB.username, 
                role: userDataFromDB.role
            }
        })
        
    }
    catch(e){
        console.log(`Something went wrong while login user => ${e}`);
        res.status(500).json({
            success : false,
            message : "some error in login, please try again",
        })
    }
}

module.exports = {registerUser,loginUser};

