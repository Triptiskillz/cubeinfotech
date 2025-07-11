
import React from "react";

const WhyCubeInfotech = ({features,title,subtitle,bg_color}) => {
 

  return (
   <div className={`${bg_color} py-16 px-4 md:px-12`}>
      <h3 className="text-center mb-4">
       {title}
      </h3>
      <p className="text-center text-gray-600 mb-12 mx-auto">
        {subtitle}
      </p>

      <div className="flex flex-wrap justify-center gap-6 text-center mb-6">
        {features.slice(0, 3).map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 w-full md:w-[360px] flex flex-col">
            <span className="text-blue-800 font-bold text-lg mb-3">{item.title}</span>
            <span className="text-gray-700 text-sm leading-relaxed flex-grow">{item.description}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center text-center gap-6">
        {features.slice(3).map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 w-full md:w-[550px] flex flex-col">
            <span className="text-blue-800 font-bold text-lg mb-3">{item.title}</span>
            <span className="text-gray-700 text-sm leading-relaxed flex-grow">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyCubeInfotech;
