"use client";

import Image from "next/image";
import MainPhoneImage from "../../images/image 31.png";

export default function SidePartSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Content */}
        <div>
          <p className="text-gray-700 mb-6">
            We're not just an ecommerce website development company in Toronto,
            however, we provide complete A to Z e-commerce solution:
          </p>
          <ul className="list-disc pl-6 text-[#1D1D1F] text-base leading-relaxed space-y-2 marker:text-[#1D1D1F]">
            <li>Hosting</li>
            <li>Dropshipping</li>
            <li>Digital Marketing</li>
            <li>eCommerce Audit</li>
            <li>Customer Support</li>
            <li>Order Management</li>
            <li>Website Management</li>
            <li>eCommerce Consultation</li>
            <li>Marketplace Management</li>
            <li>Ecommerce Website Designing</li>
          </ul>
        </div>

        {/* Right Image Area */}
        <div className="relative w-full">
          <Image
            src={MainPhoneImage}
            alt="Main"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
