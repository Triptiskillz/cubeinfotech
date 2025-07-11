"use client";

import Image from "next/image";
 import PrimaryButton from "../comman/PrimaryButton";

export default function ServicesSection({serviceslist}) {
  return (
    <div className="bg-[#F9FAFB] py-16 px-4 md:px-12 text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-14">
        We Serve What We Have Expertise in
      </h2>

      {/* Services Cards in Flex */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 flex-wrap">
        {serviceslist.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden text-left  w-full md:w-[360px] flex flex-col"
          >
            <Image
              src={service.image}
              alt={service.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col gap-4 flex-grow">
              <span className="text-lg h-12 font-bold text-[#1C2C5B]">
                {service.title}
              </span>
              <div className="text-gray-700 text-sm h-20 whitespace-pre-line">
                {service.description}
              </div>
              <div className="text-center">
              <PrimaryButton url={service.url} title="Know More" />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
