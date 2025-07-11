"use client";

import { useState } from "react";
import Image from "next/image";
import PrimaryButton from "../comman/PrimaryButton";
import Image8 from "../../images/image 8.png";
import Image9 from "../../images/image 9.png";
import Image14 from "../../images/image 14.png";
import Image15 from "../../images/image 15.png";
import Image16 from "../../images/image 16.png";
import Image17 from "../../images/image 17.png";

export default function OurWork() {
  const [caseStudies] = useState([
    {
      alt: "Creative Agency Website",
      image: Image8,
    },
    {
      alt: "Statistical Dashboard",
      image: Image9,
    },
    {
      alt: "Wallet Management App",
      image: Image14,
    },
    {
      alt: "Medical Consultation Platform",
      image: Image15,
    },
    {
      alt: "Gaming Social Platform",
      image: Image16,
    },
    {
      alt: "Business Website Builder",
      image: Image17,
    },
  ]);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto">
        <h2 className="text-center">Case Studies</h2>

        <p className="text-center text-gray-500 mb-12 leading-relaxed">
          For our clients, we build result-oriented websites. We've built
          websites from scratch that are capable to compete the market leaders.
          We've redesigned the outdated and low performing websites and
          implement CRO strategy to improve the outcome. Cube InfoTech is a 6
          years old website design company in Toronto that values clients'
          business and their hard-earned money and creates matchless websites.
          Please take a look at some of our case studies and understand why our
          clients appreciate our efforts.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="overflow-hidden">
              <Image
                src={study.image}
                alt={study.title}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <PrimaryButton url="/contact" title="View more" />
        </div>
      </div>
    </div>
  );
}
