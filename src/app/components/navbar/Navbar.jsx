'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import PrimaryButton from "../comman/PrimaryButton";
import companylog from "../../images/companylogo.png";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    setToken(storedToken);
  }, []);

  // 👉 Check if it's an admin page
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <nav className="bg-black text-white flex justify-between items-center p-4">
        <div className="font-bold text-lg">Admin Panel</div>
        <div className="flex gap-4 items-center">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/blogs">Manage Blogs</Link>
          {token && (
            <button
              onClick={() => {
                Cookies.remove('token');
                router.push('/login');
              }}
              className="bg-red-600 px-4 py-1 rounded text-white"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    );
  }

  // 👉 Public Navbar (your existing code)
  return (
    <nav className="bg-[var(--Primary-Color-Background)] sticky top-0 z-50 h-17">
      <div className="flex justify-between items-center px-4 py-3">
        <Link href='/' className="flex h-auto overflow-hidden">
          <Image
            src={companylog}
            alt="Company Logo"
            width={150}
            height={60}
            className="object-contain"
          />
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-1.5 rounded-md bg-[var(--Secondary-Color)] text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent ${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-6`}>
          <div className="flex flex-col md:flex-row md:items-center px-4 py-4 md:p-0 w-[100px] md:w-auto">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 w-full">
              <Link href="/" className="relative group navbar_text_size text-[var(--Tertiary-Color)] hover:text-[var(--Primary-Color)] py-1">
                Home
              </Link>
              <Link href="/about" className="relative group navbar_text_size text-[var(--Tertiary-Color)] hover:text-[var(--Primary-Color)] py-1">
                About Us
              </Link>
              <Link href="/services" className="relative group navbar_text_size text-[var(--Tertiary-Color)] hover:text-[var(--Primary-Color)] py-1">
                Our Services
              </Link>
              <Link href="/portfolio" className="relative group navbar_text_size text-[var(--Tertiary-Color)] hover:text-[var(--Primary-Color)] py-1">
                Portfolio
              </Link>
              <Link href="/blog" className="relative group navbar_text_size text-[var(--Tertiary-Color)] hover:text-[var(--Primary-Color)] py-1">
                Blog
              </Link>
            </div>
            <PrimaryButton url="/contact" title="Contact Us" />
          </div>
        </div>
      </div>
    </nav>
  );
}
