"use client";

import React from "react";

const NewsletterSubscription = () => {
  return (
    <div className="bg-gradient-to-r h-full from-green-500 to-green-400 py-16 px-6 md:px-12 text-white overflow-hidden">
      <div className="mx-auto text-left">
        <h2 className="font-bold mb-6 leading-tight w-full lg:w-120">
          Subscribe to get information,
          latest news and other 
          interesting offers about
        </h2>

        <p className="mb-10 w-full lg:w-190">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email"
            className="rounded-full px-6 py-3 text-gray-700 bg-white focus:outline-none w-full lg:w-100"
          />
          <button className="rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-8 py-3 font-semibold text-white hover:opacity-90">
            Subscribe
          </button>
        </div>
      </div>

   
    </div>
  );
};

export default NewsletterSubscription;