import Head from "next/head";
import Image from "next/image";
import sideImage from "../../images/contact-side.png"; // Replace with your correct image path
import companylog from "../../images/companylogo.png";
import Blog from "../../images/Blogs.png";

import Link from "next/link";
import PrimaryButton from "../comman/PrimaryButton";

import { FaArrowRight } from "react-icons/fa";
export default function BlogPost() {
  const blogPosts = [
    {
      date: "19 Feb. 2022",
      author: "By Admin",
      title: "UI/UX DESIGN TIPS",
      description: "Promotion World has once placed PageTraffic among the top.",
      image: companylog,
    },
    {
      date: "09 Apr. 2022",
      author: "By Admin",
      title: "IMPROVE YOUR UX/UI",
      description: "Promotion World has once placed PageTraffic among the top.",
      image: companylog,
    },
    {
      date: "25 Jan. 2022",
      author: "By Admin",
      title: "META TECHNOLOGY",
      description: "Promotion World has once placed PageTraffic among the top.",
      image: companylog,
    },
    {
      date: "13 Nov. 2022",
      author: "By Admin",
      title: "PAGETRAFFIC RANKS",
      description: "Promotion World has once placed PageTraffic among the top.",
      image: companylog,
    },
  ];

  return (
    <div className="mt-4">
      {/* Blog Header */}
      <header
        className="text-center pt-10 relative text-black bg-center"
        style={{
          backgroundImage: `url(${Blog.src})`,
          backgroundPosition: "center",
          backgroundSize: "contain", // Ensures the image is fully visible and scaled proportionally
          height: "89px", // Set a fixed height for the header
          width: "auto", // The width will depend on the parent container or content
          margin: "0 auto", // Centers the header if the parent container allows it
          backgroundRepeat: "no-repeat", // Prevents repeating the image
        }}
      >
        <h3 className="text-2xl font-bold">See Our Post</h3>
      </header>

      {/* Blog Posts Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => {
            const isGreen = index === 0 || index % 4 === 3;
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row p-1 rounded-lg overflow-hidden border ${
                  isGreen
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                {/* Image section */}
                <div
                  className={`relative md:w-1/2  rounded-lg overflow-hidden border-b md:border-b-0 md:border-r-4 ${
                    isGreen
                      ? "bg-[#2EC4B6] border-[#2EC4B6]"
                      : "bg-[#FF1D03] border-[#FF1D03]"
                  }`}
                  style={{ height: "200px" }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text content */}
                <div className="p-4 flex-1">
                  <small className="text-gray-600">
                    {post.date} • {post.author}
                  </small>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {post.title}
                  </p>
                  <small className="text-sm text-gray-800 mt-2">
                    {post.description}
                  </small>
                  <br />
                  <small>
                    <Link
                      href="#"
                      className={`mt-2 inline-flex items-center ${
                        isGreen ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      READ MORE
                      <FaArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </small>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <PrimaryButton url="/contact" title="View more" />
        </div>
      </section>
    </div>
  );
}
