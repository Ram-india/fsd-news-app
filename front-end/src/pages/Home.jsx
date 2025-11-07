import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NewsCard from "../components/NewsCard";
import API from "../utils/axios";
import { useNews } from "../context/NewsContext";
import io from "socket.io-client";

const socket = io('http://localhost:1338');

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const[breakingnews, setBreakingNews] = useState(null);
  const { articles, fetchTopHeadlines, searchNews, loading, } = useNews();


  useEffect(() => {
      fetchTopHeadlines();
  }, []);

  useEffect (() => {
    socket.on("breaking-news", (data) => {
      setBreakingNews(data);
    });
  },[]);

  // Breakpoints for responsive brick grid
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    await searchNews(searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-red-100  p-4 text-red--800 font-bold">
        {
          breakingnews.title
        }

      </div>
      <h1 className="text-3xl font-bold mb-6">📰 Latest News</h1>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search News.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4  p-2 rounded mb-5"
          >
            Search
          </button>
        </form>
      </div>
      {/* Show loader while loading */}
      {loading ? (
        <div className="text-center text-blue-600 font-semibold py-10">
          <span className="loader"></span> {/* Spinner animation */}
          
          <p>Loading news...</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-4"
          columnClassName="my-masonry-column"
        >
          {articles.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))}
        </Masonry>
      )}
    </div>
  );
};
export default Home;
