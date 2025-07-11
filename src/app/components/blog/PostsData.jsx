"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import service2 from "../../images/service/image 3-2.png";
import service3 from "../../images/service/image 3-3.png";
import service4 from "../../images/service/image 3-4.png";
import service5 from "../../images/service/image 3-5.png";

const postsData = [
  { id: 1, title: "Lorem ipsum dolor", date: "April 24, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },
  { id: 2, title: "Lorem ipsum dolor", date: "April 03, 2022", time: "4 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service3 },
  { id: 3, title: "Lorem ipsum dolor", date: "March 12, 2022", time: "6 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service4 },
  { id: 4, title: "Lorem ipsum dolor", date: "April 24, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },
  { id: 5, title: "Lorem ipsum dolor", date: "April 03, 2022", time: "4 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },
  { id: 6, title: "Lorem ipsum dolor", date: "March 12, 2022", time: "6 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service5 },
  { id: 7, title: "Lorem ipsum dolor", date: "March 12, 2022", time: "6 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service4 },
  { id: 8, title: "Lorem ipsum dolor", date: "March 14, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service3 },
  { id: 9, title: "Lorem ipsum dolor", date: "March 15, 2022", time: "4 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service5 },
  { id: 10, title: "Lorem ipsum dolor", date: "April 24, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },
  { id: 11, title: "Lorem ipsum dolor", date: "April 24, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },
  { id: 12, title: "Lorem ipsum dolor", date: "April 24, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },
  { id: 13, title: "Lorem ipsum dolor", date: "April 24, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },
  { id: 14, title: "Lorem ipsum dolor", date: "April 24, 2022", time: "5 min read", description: "Nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.", image: service2 },

];

const BlogPosts = () => {
  const POSTS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + POSTS_PER_PAGE);
      setLoading(false);
    }, 1500);
  };

  const handleViewLess = () => {
    setVisibleCount((prev) => prev - POSTS_PER_PAGE);
  };

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visiblePosts = postsData.slice(0, visibleCount);
  const hasMore = visibleCount < postsData.length;

  return (
    <div className="relative py-16 px-4 md:px-12 bg-white text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow h-full flex flex-col"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="object-cover w-full h-40"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h6 className="text-blue-900 font-semibold">{post.title}</h6>
              <small className="text-gray-500 mb-2">{post.date} - {post.time}</small>
              <span className="text-sm text-gray-600 flex-grow">{post.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
        {!loading && hasMore && (
          <button
            onClick={handleLoadMore}
            className="border text-sm border-[var(--Secondary-Color)] text-[var(--Secondary-Color)] px-6 py-2 rounded-full hover:bg-[var(--Secondary-Color)] hover:text-white transition-colors"
          >
            VIEW MORE POSTS
          </button>
        )}

        {!loading && visibleCount > POSTS_PER_PAGE && (
          <button
            onClick={handleViewLess}
            className="border text-sm border-[var(--Secondary-Color)] text-[var(--Secondary-Color)] px-6 py-2 rounded-full hover:bg-[var(--Secondary-Color)] hover:text-white transition-colors"
          >
            VIEW LESS
          </button>
        )}

        {loading && <div className="text-gray-500">Loading...</div>}
      </div>

      <button
        onClick={handleGoTop}
        className="fixed bottom-22 right-9 border border-gray-300 text-gray-600 w-10 h-10 rounded-full bg-white shadow hover:bg-gray-200 transition-colors"
      >
        ↑
      </button>
    </div>
  );
};

export default BlogPosts;
