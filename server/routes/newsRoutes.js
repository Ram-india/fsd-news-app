const express= require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/top-headlines', async (req,res) => {
    try{
        const response = await axios.get("https://newsapi.org/v2/top-headlines",{
            params:{
                country:"us",
                category: "general",
                apiKey:process.env.NEWS_API_KEY,
            },
        });
        res.json(response.data);
    }catch(error){
        res.status(500).json({message:" Failed to fetch news", error:error.message });
    }
});

//search

router.get('/search', async(req,res)=>{
    const query = req.query.q;
    if(!query){
        return res.status(400).json({message:"Query is required"});
    }
    try{
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`
          );
          res.status(200).json({articles:response.data.articles });
    }catch(error){
        console.log("News API error:",error.message);
        res.status(500).json({meassage: "failed to fetch news", error:error.meassage});
    }
});

router.get('/category', async(req,res) => {
    const category = req.query.cat;
    if(!category){
        return res.status(400).json({meassage:"Category is required "});
    }
    try{
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params:{
                country:"us",
                category,
                apiKey:process.env.NEWS_API_KEY,
            },
        });
        res.json(response.data);
    }catch(error){
        res.status(500).json({message:"failed to fetch category", error:error.message});
    }
});

//breaking news
router.post('/breaking',(req,res)=>{
    const io = req.app.get('io'); // GET io instance
    const breakingNews = req.body;
    if(!breakingNews.title){
        return res.status(400).json({ message:"Title is required"});
    }
    io.emit("breaking-news", breakingNews);
    res.status(200).json({ success:true, message:"Breaking news sent"})
});

module.exports = router;