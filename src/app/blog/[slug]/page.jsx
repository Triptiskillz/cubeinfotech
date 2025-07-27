"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Banner from "@/app/components/homepage/Banner";
import NewsletterSubscription from "@/app/components/service/NewsletterSubscription";
import bannerBg from "../../images/banner.jpg";
import defaultImage from "../../images/service/image 3-2.png";

export default function BlogDetail({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    if (slug) {
      fetchBlogDetail();
      fetchRelatedBlogs();
    }
  }, [slug]);

  const fetchBlogDetail = async () => {
    try {
      console.log('Fetching blog with slug:', slug);
      const response = await fetch(`/api/blogs/slug/${slug}`);
      const data = await response.json();
      console.log('API Response:', response.status, data);
      
      if (response.ok && data.blog) {
        setBlog(data.blog);
        console.log('Blog set successfully:', data.blog);
      } else {
        console.error('Blog not found or error:', data.message);
        setError(data.message || 'Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?limit=3');
      const data = await response.json();
      
      if (response.ok) {
        // Filter out current blog
        const filteredBlogs = data.blogs
          .filter(b => b.slug !== slug)
          .slice(0, 3);
        setRelatedBlogs(filteredBlogs);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  // Helper function to calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Helper function to get content preview
  const getContentPreview = (content, maxLength = 200) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + "..." 
      : plainText;
  };

  // Update document meta tags
  useEffect(() => {
    if (blog) {
      // Update page title
      document.title = blog.metaTitle || blog.title || 'Blog Post';
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.metaDescription || getContentPreview(blog.content));
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = blog.metaDescription || getContentPreview(blog.content);
        document.head.appendChild(meta);
      }

      // Add Open Graph tags
      const ogTags = [
        { property: 'og:title', content: blog.metaTitle || blog.title },
        { property: 'og:description', content: blog.metaDescription || getContentPreview(blog.content) },
        { property: 'og:image', content: blog.featuredImage || '/images/default-og.jpg' },
        { property: 'og:type', content: 'article' },
        { property: 'article:published_time', content: blog.createdAt },
        { property: 'article:modified_time', content: blog.updatedAt }
      ];

      ogTags.forEach(tag => {
        let element = document.querySelector(`meta[property="${tag.property}"]`);
        if (element) {
          element.setAttribute('content', tag.content);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('property', tag.property);
          meta.content = tag.content;
          document.head.appendChild(meta);
        }
      });
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog && !error) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Blog</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <article className="py-16 px-4 md:px-12 max-w-5xl mx-auto">
        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {blog.title}
        </h1>

        {/* Blog Meta Info */}
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          <span>•</span>
          <span>{calculateReadTime(blog.content)}</span>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="rounded-xl overflow-hidden shadow-lg mb-12">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-lg prose-img:shadow-md mb-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back to Blog Link */}
        <div className="border-t pt-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to All Posts
          </Link>
        </div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  href={`/blog/${relatedBlog.slug}`}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    {relatedBlog.featuredImage ? (
                      <img
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <Image
                        src={defaultImage}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(relatedBlog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <NewsletterSubscription />
    </>
  );
}