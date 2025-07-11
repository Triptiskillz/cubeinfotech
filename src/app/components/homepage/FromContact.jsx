import Image from "next/image";
import sideImage from "../../images/contact-side.png"; // Your image path

export default function FromContact() {
  return (
    <div>
      <div className="py-10 px-6 bg-green-500 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Form Section */}
          <div className="w-full md:w-2/2">
            <h3 className="text-xl font-semibold mb-6 text-white">
              To get information, latest news, and other interesting offers
              about
            </h3>
            <form className="p-8 space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white focus:outline-none focus:border-white py-2"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white focus:outline-none focus:border-white py-2"
                />
              </div>
              {/* Phone and Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white focus:outline-none focus:border-white py-2"
                />
                <input
                  type="text"
                  placeholder="Website *"
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white focus:outline-none focus:border-white py-2"
                />
              </div>
              {/* Message */}
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white focus:outline-none focus:border-white py-2 resize-none"
                />
              </div>
              {/* Send Button */}
              <div>
                <button
                  type="submit"
                  className="text-white bg-green-500 border py-2 px-8 rounded-full hover:bg-green-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex  mt-[110px]justify-center">
            <Image
              src={sideImage}
              alt="Contact Us"
              width={400}
              height={400}
              className="object-contain  position-absolute
          "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
