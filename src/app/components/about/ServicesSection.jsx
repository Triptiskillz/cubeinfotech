import Image from "next/image";
import imageBanner from "../../images/about/image 37.png";
import PrimaryButton from "../comman/PrimaryButton";

export default function ServicesSection() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="w-full md:w-1/2">
          <Image
            src={imageBanner}
            alt="Web Design"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 self-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Team Of Creative Thinkers
          </h3>
          <p className="text-gray-700 mb-6">
            We are a team of creative thinkers, committed to bringing out new
            ideas and innovative technology which are lead focused and
            sales-driven for growing businesses. The team of experts at Cube
            InfoTech works to create and put together the most lucrative
            solutions for your growing business. Be it web development, digital
            marketing, assistance in dropshipping & marketplace, or setting up
            your very own Shopify Store, we make it a point to provide the best
            suitable solutions for your business. Our services when availed by
            creative and growing startups and small businesses, provide an
            opportunity for immense growth and expansion. Lead and ROI focused
            solutions, curated and customized by Cube InfoTech are here to
            assist you and your company.
          </p>
          <PrimaryButton url="/contact-us" title="Contact us" />
        </div>
      </div>
    </section>
  );
}
