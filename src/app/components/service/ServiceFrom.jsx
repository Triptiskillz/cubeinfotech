"use client";
import Link from "next/link";
import ThirdButton from "../comman/ThirdButton";

export default function ServiceFrom() {
  return (
    <div className="py-20 px-4 md:px-10 lg:px-24">
      <div className="text-center mt-20 ">
        <h3 className="mb-10">
          Worried About Your <span className="text-green-600">Privacy?</span>
        </h3>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-left">
          <p className="text-gray-700 text-sm leading-relaxed">
            Cube InfoTech, as a top e-commerce website development company,
            helps businesses to prevent hacking, keep the data secure and build
            consumer trust by trademarking the company website using SSL
            certificate, and issuing PCI-DSS (Payment Card Industry Data
            Security Standard) to keep the credit / debit card information of
            the consumers encrypted, which is an essential step in website
            development process. As an e-commerce website developer, Cube
            InfoTech monitors, customizes, and edits throughout the entire
            tenure of your website and thereafter, takes charge of any changes
            to be made later!
          </p>
        </div>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name *"
            className="border border-gray-300  p-2 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300  p-2 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone number *"
            className="border border-gray-300  p-2 focus:outline-none"
          />
          <select className="border border-gray-300  p-2 focus:outline-none">
            <option>Services</option>
            <option>Website Creation</option>
            <option>Content Management</option>
            <option>SEO Services</option>
            <option>IT Related Works</option>
          </select>
          <ThirdButton title="SEND" />
        </form>
      </div>
    </div>
  );
}
