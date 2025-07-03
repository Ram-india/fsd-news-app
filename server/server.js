const express  = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();//Load .env file
const app = express();

//middleware
app.use(cors());
app.use(express.json());// to parse json bodies from frontend

//test route

app.get('/', (req,res)=>{
    res.send('Hooray ...API is running successfully...!')
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', uptime: process.uptime() });
});


 //Routes
app.use('/api/auth', authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

