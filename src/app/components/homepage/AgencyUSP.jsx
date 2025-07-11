"use client";

import Image from "next/image";
import Image8 from "../../images/image 8.png";
import Image9 from "../../images/image 9.png";
import Image14 from "../../images/image 14.png";
import Image15 from "../../images/image 15.png";
import Image16 from "../../images/image 16.png";
import Image17 from "../../images/image 17.png";
import MainImage from "../../images/image 13.png"; // Replace if needed

export default function USPSection() {
  const usps = [
    { title: "Experience", description: "Ronsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: Image8 },
    { title: "Pricing", description: "Ronsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: Image9 },
    { title: "Delivery", description: "Ronsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: Image14 },
    { title: "Maintenance", description: "Ronsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: Image15 },
    { title: "Approach", description: "Ronsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: Image16 },
    { title: "Top Noch Design", description: "Ronsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: Image17 },
  ];

  return (
    <div className="bg-white py-12 px-4">
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 max-w-3xl">
          Why We Are The Leading Website Design Agency in Toronto
        </h2>
      </div>

      {/* 3-part horizontal layout */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8">

        {/* Left Column */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          {usps.slice(0, 3).map((usp, index) => (
            <div key={index} className="flex items-center justify-end text-right gap-4">
              {/* Image on the left */}
              
              
              {/* Text block aligned to the right */}
              <div className="mt-2" style={{ textAlign: "right" }}>
                <div className="font-semibold text-lg  text-right text-gray-900">{usp.title}</div>
                <div className="text-sm text-gray-600 text-right">{usp.description}</div>
              </div>
              <Image
                src={usp.image}
                alt={usp.title}
                width={50}
                height={50}
                // className="flex-shrink-0"
              />
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="flex justify-center items-center w-full md:w-1/3">
          <Image src={MainImage} alt="Main Illustration" width={250} height={250} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          {usps.slice(3, 6).map((usp, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Image on the left */}
              <Image
                src={usp.image}
                alt={usp.title}
                width={50}
                height={50}
                // className="flex-shrink-0"
              />
              
              {/* Text block aligned to the left */}
              <div className="">
                <div className="font-semibold text-lg text-gray-900">{usp.title}</div>
                <div className="text-sm text-gray-600">{usp.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
