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

export default function ContactSection() {
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
          <form className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Name *"
              className="w-full border border-gray-200 mt-4 px-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-blue-300"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 mt-4 px-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-blue-300"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone number *"
              className="w-full border border-gray-200 mt-4 px-4 py-4 text-sm text-gray-700 focus:outline-none focus:border-blue-300"
            />

            {/* Service Select */}
            <div className="relative w-full mt-4">
              <select
                className="w-full border border-gray-200 px-4 py-4 text-sm text-gray-700 bg-white rounded-none appearance-none focus:outline-none focus:border-blue-300"
                defaultValue=""
              >
                <option disabled value="">
                  Select a service
                </option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>SEO</option>
              </select>

              {/* Custom Arrow */}
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
