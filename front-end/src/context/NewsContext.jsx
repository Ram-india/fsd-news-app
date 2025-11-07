import { createContext, useState, useContext } from "react";
import API from "../utils/axios";

const NewsContext = createContext();

export const NewsProvider = ({children}) => {
    const [articles , setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    //Fetch Top Headlines on load
    const fetchTopHeadlines = async () =>{
        setLoading(true);
        try{
            const res = await API.get("news/top-headlines");
            setArticles(res.data.articles);
        }catch(err){
            console.error("Top Headlines Fetch Failed", err)

        }finally{
            setLoading(false);
        }
    };

    //fetch by category
    const fetchByCategory = async (category) => {
        setLoading(true);
        try{
            const res = await API.get(`news/category?cat=${category}`);
            setArticles(res.data.articles);
        }catch(err){
            console.error("category Fetch Failed", err)

        }finally{
            setLoading(false);
        }
    };

    //Search
    const searchNews = async (query) => {
        setLoading(true);
        try{
            const res = await API.get(`news/search?q=${query}`);
            setArticles(res.data.articles);
        }catch(err){
            console.error("search failed", err);
        }finally{
            setLoading(false);
        }
    };
    return(
        <NewsContext.Provider
        value={{
            articles,
            setArticles,
            fetchTopHeadlines,
            fetchByCategory,
            searchNews,
            loading,
            setLoading,
        }}
        >
            {children}
        </NewsContext.Provider>
    );


};

export const useNews = () => useContext(NewsContext)