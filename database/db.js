const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB is connected successfully");
    }
    catch(e) {
        console.log("ERROR while connect DB => ", e);
        process.exit(1);
    }
} 

module.exports = connectToDb; 