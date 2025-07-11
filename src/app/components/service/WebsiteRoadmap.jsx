"use client";
import React from "react";

const WebsiteRoadmap = ({sections}) => {
 

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#E8F7FF]">
      <h2 className="font-bold text-center mb-2">Our Website Designing Roadmap to Build a Powerful and Engaging Website</h2>
      <p className="text-center text-gray-600 mb-10">We follow a step-by-step process to build high-performing websites.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="p-6 border border-gray-100 border-l-4 border-l-red-600">
            <p className="text-xl font-semibold mb-2">{section.title}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {section.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteRoadmap;
