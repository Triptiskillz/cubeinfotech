"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "../../images/service/image 3-2.png";

const BlogPosts = () => {
  const POSTS_PER_PAGE = 6;
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?limit=100');
      const data = await response.json();
      
      if (response.ok) {
        // Filter only active/published blogs
        const activeBlogs = data.blogs.filter(blog => blog.isActive);
        setBlogs(activeBlogs);
        setTotalPages(Math.ceil(activeBlogs.length / POSTS_PER_PAGE));
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setFetchingMore(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setFetchingMore(false);
      }, 300);
    }
  };

  const handleViewLess = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate visible posts based on current page
  const startIndex = 0;
  const endIndex = currentPage * POSTS_PER_PAGE;
  const visiblePosts = blogs.slice(startIndex, endIndex);
  const hasMore = currentPage < totalPages;
  const canViewLess = currentPage > 1;

  // Helper function to strip HTML tags and get plain text
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Helper function to get excerpt
  const getExcerpt = (content, maxLength = 150) => {
    const plainText = stripHtml(content);
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + "..." 
      : plainText;
  };

  // Helper function to calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = stripHtml(content).split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="relative py-16 px-4 md:px-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Our Blog Posts</h2>
      
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blog posts available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Image
                      src={defaultImage}
                      alt={blog.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <span className="mx-2">•</span>
                    <span>{calculateReadTime(blog.content)}</span>
                  </div>
                  <p className="text-gray-600 flex-grow line-clamp-3">
                    {getExcerpt(blog.content)}
                  </p>
                  <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-700">
                    Read More →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            {/* Pagination Info */}
            {blogs.length > POSTS_PER_PAGE && (
              <div className="text-center text-gray-600">
                Showing {visiblePosts.length} of {blogs.length} posts
              </div>
            )}
            
            {/* Pagination Buttons */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {!fetchingMore && hasMore && (
                <button
                  onClick={handleLoadMore}
                  className="border text-sm border-[var(--Secondary-Color)] text-[var(--Secondary-Color)] px-6 py-2 rounded-full hover:bg-[var(--Secondary-Color)] hover:text-white transition-colors"
                >
                  VIEW MORE POSTS
                </button>
              )}

              {!fetchingMore && canViewLess && (
                <button
                  onClick={handleViewLess}
                  className="border text-sm border-[var(--Secondary-Color)] text-[var(--Secondary-Color)] px-6 py-2 rounded-full hover:bg-[var(--Secondary-Color)] hover:text-white transition-colors"
                >
                  VIEW LESS
                </button>
              )}

              {fetchingMore && <div className="text-gray-500">Loading more...</div>}
            </div>
          </div>
        </>
      )}

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
