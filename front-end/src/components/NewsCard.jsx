import React from 'react';

    const NewsCard = ({ article }) => {
        return (
          <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
            {article.urlToImage && (
              <img src={article.urlToImage} alt="news" className="w-full object-cover" />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold">{article.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{article.description || "No description"}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                Read More
              </a>
            </div>
          </div>
        );
      };


export default NewsCard;