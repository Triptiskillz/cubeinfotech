"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and.",
      rating: 5,
      author: "Serhiy Hipskyy",
      position: "CEO Universal",
      image: "https://via.placeholder.com/40",
    },
    {
      quote:
        "Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      rating: 5,
      author: "Justus Menke",
      position: "CEO Eronaman",
      image: "https://via.placeholder.com/40",
    },
    {
      quote:
        "Accusamus et iusto odi ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
      rating: 5,
      author: "Britain Eriksen",
      position: "CEO Universal",
      image: "https://via.placeholder.com/40",
    },
    {
      quote:
        "Accusamus et iusto odio blanditiis praesentium deleniti atque corrupti quos dolores.",
      rating: 5,
      author: "Britain Eriksen",
      position: "CEO Universal",
      image: "https://via.placeholder.com/40",
    },
    {
      quote:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and.",
      rating: 5,
      author: "Serhiy Hipskyy",
      position: "CEO Universal",
      image: "https://via.placeholder.com/40",
    },
    {
      quote:
        "Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      rating: 5,
      author: "Justus Menke",
      position: "CEO Eronaman",
      image: "https://via.placeholder.com/40",
    },
    {
      quote:
        "Accusamus et iusto odi ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
      rating: 5,
      author: "Britain Eriksen",
      position: "CEO Universal",
      image: "https://via.placeholder.com/40",
    },
    {
      quote:
        "Accusamus et iusto odio blanditiis praesentium deleniti atque corrupti quos dolores.",
      rating: 5,
      author: "Britain Eriksen",
      position: "CEO Universal",
      image: "https://via.placeholder.com/40",
    },
  ];

  return (
    <section className="bg-[#1F3CBB] text-white py-20 relative overflow-hidden">
      {/* Subheading */}
      <div className="relative z-10 text-center mb-10">
        <p className="text-2xl md:text-3xl font-semibold text-white">
          Some Client Appreciations
        </p>
      </div>

      {/* Swiper */}
      <div className="relative max-w-7xl mx-auto px-4 z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3.2} // Show 3 full + partial
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            1280: { slidesPerView: 3.2 },
            1024: { slidesPerView: 2.5 },
            768: { slidesPerView: 1.5 },
            640: { slidesPerView: 1.2 },
            0: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white text-gray-700 rounded-xl shadow-md p-6 mt-6 relative min-h-[240px]">
                {/* Black Quote Circle */}
                <div
                  className="absolute -top-5 left-6 bg-black text-white w-10 h-10 flex items-center 
                justify-center rounded-full text-lg font-bold z-10"
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#f87171] mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600">{t.quote}</p>
                <hr />
                {/* Author */}
                <div className="flex items-center mt-auto pt-2">
                  <img
                    src={t.image}
                    alt={t.author}
                    className="w-10 h-10 rounded-full border-2 border-blue-500 mr-3"
                  />
                  <div>
                    <p className="font-semibold text-sm text-black">
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-500">{t.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
