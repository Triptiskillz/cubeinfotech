"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function SliderBanner({ SliderBannerList, title }) {
  return (
    <div className="mt-10 mx-12 shadow-md  md:mx-20 lg:mx-32">
    
    <div className="bg-[#F8F9FB] rounded-[20px]  px-2 py-4 md:px-6 md:py-4">
      <div className="flex items-center gap-6 mb-6">
        <h3 className="text-[#0F2B89] text-xl font-semibold whitespace-nowrap">
          {title}
        </h3>
        <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {SliderBannerList.map((li, index) => (
          <SwiperSlide key={index} className="flex p-2 justify-center">
            <Image src={li.image} alt={li.title} height={100} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

     
    </div>
    </div>
  );
}
