"use client";

import Image from "next/image";
import MainPhoneImage from "../../images/image 30.png";

export default function BrandPartnerSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-6">
            Cube InfoTech is Partnered with <br className="hidden md:block" />
            Leading Brands
          </h2>
          <p className="text-[#1D1D1F] text-base leading-relaxed mb-4">
            We’re partnered with leading companies to make our website designing journey Easy, Effective and Everlasting.
          </p>
          <p className="text-[#1D1D1F] text-base leading-relaxed mb-4">
            Also, we’re up to date of what’s going on in the market as well as what’s about to come up as an update or upgrade.
          </p>
          <p className="text-[#1D1D1F] text-base leading-relaxed">
            With an understanding of what mistakes business owners are likely to make, you’ll find us all ready there with a solution.
          </p>
        </div>

        {/* Right: Image Section */}
        <div className="w-full flex justify-center">
          <Image
            src={MainPhoneImage}
            alt="Phone illustration with partner logos"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
