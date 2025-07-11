"use client";
import Link from "next/link";

export default function PrimaryButton({ url, title }) {
  return (
    <Link
      href={url}
      className=" mt-2 md:mt-0 md:w-[200px] w-[200px]
       text-sm bg-[var(--Secondary-Color)] 
       text-white px-7 py-2.5 rounded-[12px] hover:bg-[var(--Fourth-Color)]
        hover:text-[var(--Secondary-Color)] border  
        border-transparent hover:border-[var(--Secondary-Color)] 
        transition duration-200 ease-in-out text-center"
    >
      {title}
    </Link>
  );
}
