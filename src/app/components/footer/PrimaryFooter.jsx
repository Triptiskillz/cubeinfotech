"use client";
import Image from "next/image";
import Link from "next/link";
import companylog from "../../images/companylogo.png";
import vector from "../../images/Vector.png";
import vector1 from "../../images/Vector-2.png";
import Cookies from 'js-cookie';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaArrowRight
} from "react-icons/fa";
import { usePathname } from 'next/navigation';

export default function PrimaryFooter() {
    const pathname = usePathname();
  const token = Cookies.get('token');

   const isAdmin = pathname.startsWith('/admin') && token;
     if (isAdmin) {
    // ✅ Admin Footer
    return (
      <footer className="bg-black text-white py-6 text-center">
        <p className="mb-2">Admin Panel Footer — Digital Era © {new Date().getFullYear()}</p>
      </footer>
    );
  }
  return (
    <>
      <footer className="w-full bg-[var(--Primary-Color-Background)] text-[var(--Tertiary-Color)] px-6 py-12">
        {/* Top Section */}
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/20 pb-8 gap-8">
            {/* Left Side - Logo */}
            <div className="md:w-3/3 w-full">
              <Image
                src={companylog}
                alt="Company Logo"
                width={180}
                height={70}
                className="object-contain"
                priority
              />
            </div>

            {/* Right Side - Contact Info */}
            <div className="md:w-2/3 w-full">
              <div className="flex flex-col sm:flex-row justify-stretch items-start sm:items-center gap-3">
                <div className="flex items-start gap-3">
                  <Image
                    src={vector}
                    alt="Phone Icon"
                    width={24}
                    height={24}
                    className="object-contain mt-2"
                  />
                  <p className="text-sm font-light leading-relaxed">
                    9024225444
                    <br />
                    info@digitalera.com
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Image
                    src={vector1}
                    alt="Location Icon"
                    width={26}
                    height={30}
                    className="object-contain mt-2"
                  />
                  <p className="text-sm font-light leading-relaxed">
                    S27 Division St, New York, NY <br />
                    10002, United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 4-column Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10 text-sm">
            <div className="space-y-3">
              <p className="text-sm opacity-80 leading-relaxed">
                Ewebot has much planned for the future, working with great
                clients and continued software development.
              </p>
              <div className="flex justify-start items-center gap-6 mt-4 text-black text-lg">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    SEO Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    SEO Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Pay Per Click
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    SEO Audit
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    What We Do?
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Main Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cases"
                    className="hover:text-[var(--Primary-Color)] transition-colors duration-300"
                  >
                    Our Cases
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Copyright Section */}
      <div className="pt-4 pb-4 border-t border-white/10 bg-[var(--Primary-Color)] text-white text-center text-xs">
        <p>© {new Date().getFullYear()} — All Rights Reserved.</p>
      </div>
    </>
  );
}
