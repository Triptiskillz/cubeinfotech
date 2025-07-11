"use client";
import { useState } from "react";
import Image from "next/image";
import MainPhoneImage from "../../images/Statistic.png";

export default function ProcessSection() {
  const [activeSection, setActiveSection] = useState(null);
  const sections = [
    {
      title: "Consultation And Strategy Creation",
      description:
        "Clients are first, therefore, we believe in attentive listening. Every business is unique, so has the website to be. We mix your business goals with our website designing experience and create an affordable web design solution.",
      color: "bg-red-500",
    },
    {
      title: "Wireframes And Mockups",
      description:
        "We start by creating a wireframe and then a mockup. This is to give you a clear picture of how your website will look like after the entire process is complete. In this phase, making changes to design per your feedback is easily possible.",
      color: "bg-blue-600",
    },
    {
      title: "Building Front End And Backend",
      description:
        "Using the mockup for front end development is the next step. As well as creating functionality through FYI custom code takes longer as compared to building a website on CMS.",
      color: "bg-red-500",
    },
    {
      title: "Testing To Ensure The Perfection",
      description:
        "After completing the front end and back end development, website is ready to go live. However, in order to ensure website works perfectly fine for all type of users, thorough testing is vital. After this, the website is ready to go live.",
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="bg-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Simple Process to Design Extraordinary websites
        </h1>
        <p className="text-gray-600 mb-12">
          Cube InfoTech's web designing process never lacks research and
          analysis. Moreover, there will be complete transparency. While we work
          on your website, you can call us anytime to know the progress of the
          project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
              onMouseEnter={() => setActiveSection(index)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div
                className={`w-[100px] h-[100px] rounded-full p-6 mb-4 text-center text-white ${section.color}`}
                style={{
                  backgroundColor:
                    section.color === "bg-red-500" ? "#ef4444" : "#2563eb",
                }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src={MainPhoneImage}
                    alt="test"
                    className="p-3"
                    height={50}
                    width={50}
                  />
                </div>
              </div>

              <h5 className="text-xl font-semibold text-gray-800 mb-2">
                {section.title}
              </h5>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
