"use client";
import Link from "next/link";

export default function SecondaryButton({ url, title }) {
  return (
    <Link
      href={url}
      className="mt-2 md:mt-0  md:w-[200px] w-[200px] text-sm  px-7 py-2.5 bg-[var(--Fourth-Color)] 
      text-[var(--Secondary-Color)] px-3 py-1.5 rounded-[12px] hover:bg-[var(--Secondary-Color)]
       hover:text-[var(--Fourth-Color)] border border-transparent 
       hover:border-[var(--Secondary-Color)] transition duration-200 ease-in-out text-center"
    >
      {title}
    </Link>
  );
}
