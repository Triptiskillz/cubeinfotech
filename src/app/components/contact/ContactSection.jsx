"use client";

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import ThirdButton from "../comman/ThirdButton";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email format.";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      errs.phone = "Invalid phone number.";
    }

    if (!formData.service) errs.service = "Please select a service.";

    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", service: "" });
    } else {
      alert(result.message || "Something went wrong.");
    }
  };


  return (
    <section className="bg-white py-20 px-4 md:px-10 lg:px-24">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-14 text-gray-800">
        We’ll Outline the Solution Based on Details You Share
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg ">
        {/* Left Form */}
        <div className=" p-8 md:p-10 ">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Help us Understand Your Requirement
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200 mt-2 px-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-blue-300"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 mt-2 px-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-blue-300"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number *"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 mt-2 px-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-blue-300"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Service */}
            <div className="relative w-full mt-2">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border border-gray-200 px-4 py-4 text-sm text-gray-700 bg-white rounded-none appearance-none focus:outline-none focus:border-blue-300"
              >
                <option value="">Select a service</option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>SEO</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {errors.service && (
                <p className="text-red-600 text-sm mt-1">{errors.service}</p>
              )}
            </div>

            {/* Submit Button */}
            <ThirdButton title="SEND" />
          </form>

          {/* Social Icons */}
          <div className="mt-10">
            <p className="font-semibold text-gray-600 mb-3">Follow us on</p>
            <div className="flex space-x-4 text-gray-600 text-xl">
              <FaTwitter className="hover:text-blue-500 cursor-pointer transition" />
              <FaFacebookF className="hover:text-blue-700 cursor-pointer transition" />
              <FaGooglePlusG className="hover:text-red-600 cursor-pointer transition" />
              <FaPinterestP className="hover:text-red-500 cursor-pointer transition" />
              <FaLinkedinIn className="hover:text-blue-800 cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* Right Info Boxes */}
        <div className="rounded-3xl p-6 md:p-8 grid grid-cols-1 self-center sm:grid-cols-2 gap-6">
          <InfoBox
            icon={<FaPhoneAlt size={24} className="text-white" />}
            title="CALL"
            detail="(237) 666-331-894"
            bg="bg-[#FE8B75] text-white"
            iconColor="text-red-600"
          />
          <InfoBox
            icon={<FaMapMarkerAlt size={24} className="text-white" />}
            title="VISIT US"
            detail={
              <>
                1555 Kingston Rd Unit 320,
                <br />
                Pickering, ON L1V 0E9
              </>
            }
            bg="bg-[#FE8B75] text-white"
            iconColor="text-red-600"
          />
          <InfoBox
            icon={<FaEnvelope size={24} className="text-white" />}
            title="EMAIL"
            detail="info@cubeinfotech.com"
            bg="bg-[#FE8B75] text-white"
            iconColor="text-red-600"
          />
          <InfoBox
            icon={<FaClock size={24} className="text-white" />}
            title="VISIT HOURS"
            detail={
              <>
                Monday–Saturday
                <br />
                8am–8pm (EST)
              </>
            }
            bg="bg-[#FE8B75] text-white"
            iconColor="text-red-600"
          />
        </div>
      </div>
    </section>
  );
}

function InfoBox({ icon, title, detail, bg, iconColor }) {
  return (
    <div className={`${bg} p-6 rounded-xl shadow-md flex flex-col gap-2`}>
      <div className={iconColor}>{icon}</div>
      <h4>{title}</h4>
      <p>{detail}</p>
    </div>
  );
}
