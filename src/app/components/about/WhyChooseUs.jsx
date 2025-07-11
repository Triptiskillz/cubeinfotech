import Image from "next/image";
import image1 from "../../images/about/image 41.png";
import image2 from "../../images/about/image 42.png";
import image3 from "../../images/about/image 43.png";
import image4 from "../../images/about/image 43.png";
import image5 from "../../images/about/image 45.png";
import image6 from "../../images/about/image 46.png";
import image7 from "../../images/about/image 46.png";

export default function WhyChooseUs() {
  const services = [
    { title: "Branding Services", icon: image1 },
    { title: "Website Design Services", icon: image2 },
    { title: "Social Media Management", icon: image3 },
    { title: "Graphic Designing Services", icon: image4 },
    { title: "Digital Marketing Services", icon: image5 },
    { title: "Web Development Services", icon: image6 },
    { title: "Ecommerce Design Services", icon: image7 },
    { title: "SEO Services", icon: image1 },
    { title: "PPC Services", icon: image2 },
    { title: "Virtual Assistant Services", icon: image3 },
  ];

  return (
    <section className="bg-[#D6F9D9] py-12 px-4 sm:px-8 md:px-16 mb-10">
      <div className="text-center mb-10">
        <h2>
          Why We are The Leading Website Design Agency in Toronto
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((service, index) => {
          const addMargin = [1, 3, 6, 8].includes(index) ? "lg:mt-6" : "";

          return (
            <div
              key={index}
              className={`bg-white w-50 h-50 flex flex-col items-center justify-center 
                text-center p-4 shadow-md transition duration-300 hover:shadow-lg rounded-tl-3xl rounded-br-3xl ${addMargin}`}
            >
              <div className="w-15 h-15 mb-4 relative">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[#292D32] font-medium text-sm">
                {service.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
