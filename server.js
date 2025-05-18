require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-router');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');


const app = express();
const PORT = process.env.PORT;

// database connectiviy
connectToDB();

// middlware
app.use(express.json());
 
// router
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})