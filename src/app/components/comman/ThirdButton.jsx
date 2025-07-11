"use client";

export default function ThirdButton({ title }) {
  return (
    <button
      type="submit"
      className="w-full bg-[var(--Secondary-Color)] 
                  hover:bg-[var(--Fourth-Color)] 
                  hover:text-[var(--Secondary-Color)] 
                  border border-[var(--Secondary-Color)]
                  text-white font-semibold py-3 text-sm transition-all"
    >
      {title}
    </button>
  );
}
