const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();

//user registration

const signUp = async(req,res) =>{
    const{name, email, password} = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({error:"User already exists"});
        }
       const newUser = await User.create({ name, email, password});
        res.status(201).json({message:"User registered Successfully", user:newUser});

    } catch(error){
        res.status(500).json ({message:"User registeration faild", error:error.message});
    }
};
//login
const login = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return  res.status(400).json({message:'Invalid email or password'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ meassage:"Invalid password" });
        }
        const token = jwt.sign(
            {
            id:user._id,
            email:user.email,
            name:user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({message:'Login successfull', token, user});
    }catch(error){
        res.status(500).json({meassage:'Login failed', error:error.message});
    }

};

//get profile
const getProfile = (req,res) => {
    try{
        const user = req.user;
        res.json({user});
    }catch(error){
        res.status(500).json({message:"Failed to fetch profile", error:error.meassage})
    }

}
module.exports = {
    signUp,
    login,
    getProfile
};