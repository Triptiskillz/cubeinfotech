import Image from "next/image";

import PrimaryButton from "../comman/PrimaryButton";
import SecondaryButton from "../comman/SecondaryButton";

export default function Banner({bannerBg, title, subtitle, showbutton,primaryShowbutton, secondaryShowbutton}) {
  return (
    <div className="relative w-full h-[400px] md:h-[400px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={bannerBg}
        alt="Banner Background"
        fill
        className="object-cover  h-[400px] md:h-[900px] z-0"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-50 z-10"></div>

      {/* Content */}
      <div
        className="absolute bottom-6  left-6 md:left-16 z-20 text-white flex flex-col 
      gap-4 max-w-xl md:text-left"
      >
        <h1>
          {title}
       
        </h1>

        <p>
        {subtitle}
        </p>
  {showbutton && (
  <div className="flex flex-wrap gap-4">
    {primaryShowbutton?.status && (
      <div className="col">
        <PrimaryButton 
          url={primaryShowbutton.url} 
          title={primaryShowbutton.title} 
        />
      </div>
    )}
    {secondaryShowbutton?.status && (
      <div className="col">
        <SecondaryButton 
          url={secondaryShowbutton.url} 
          title={secondaryShowbutton.title} 
        />
      </div>
    )}
  </div>
)}

      </div>
    </div>
  );
}
