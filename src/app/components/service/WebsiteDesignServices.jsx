"use client";
import React from "react";
import Image from "next/image";

const WebsiteDesignServices = ({ services ,title,subtitle,rounded, card_bg,fourCard}) => {
  return (
    <div className=" py-16 px-4 md:px-12 text-center">
      {/* Heading */}
      <h2 className="font-bold text-gray-900 mb-14">
        {title}
       
      </h2>
      <p className="text-center text-gray-600 mb-10 mx-auto">
        {subtitle}
      
      </p>

      {/* Services Cards in Flex */}
 <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 flex-wrap">
  {services.map((service, index) => (
    <div
      key={index}
      className={`flex p-4 flex-col items-center rounded-2xl text-center shadow-md overflow-hidden w-full ${fourCard ? "md:w-[320px]":"md:w-[360px]"} h-full ${card_bg}`}
    >
      <Image
        src={service.image}
        alt={service.title}
        className={`object-cover ${rounded ? 'rounded-full' : ''} w-40 h-40 mb-4 shadow-lg`}
      />
      <div className="flex flex-col mt-4 gap-4 flex-grow">
        <span className="text-lg font-bold text-[#1C2C5B]">
          {service.title}
        </span>
        <span className="text-gray-700 text-sm leading-relaxed flex-grow">
          {service.description}
        </span>
      </div>
    </div>
  ))}
</div>

    </div>
   
  );
};

export default WebsiteDesignServices;
