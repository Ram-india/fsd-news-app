const express  = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsroutes = require('./routes/newsRoutes');
require("dotenv").config();
dotenv.config();//Load .env file

const http = require("http");
const {server } = require("socket.io");
const { disconnect } = require("process");
const app = express();
const server = http.createServer(app);
const io = new server (server, {
    cors:{
        orgin:'http://localhost/', // FRONTEND URL
        methods:['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log("user connectd:", socket.id);

    socket.on("disconect", () => {
        console.log('User disconnected:', socket.id);
    })
})

//middleware
app.use(cors());
app.use(express.json());// to parse json bodies from frontend

app.set("io", io); // expose io routes 

//test route

app.get('/', (req,res)=>{
    res.send('Hooray ...API is running successfully...!')
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', uptime: process.uptime() });
});


 //Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsroutes);



connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

