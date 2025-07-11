"use client";

import Banner from "../../components/homepage/Banner";
import bannerBg from "../../images/banner.jpg";
import Image from "next/image";

import service1 from "../../images/service/image 3.png";
import service2 from "../../images/service/image 3-2.png";
import service3 from "../../images/service/image 3-3.png";

import MainPhoneImage from "../../images/service/image 53.png";
import MainPhoneImage1 from "../../images/service/image 54.png";
import MainPhoneImage2 from "../../images/service/image 55.png";

import band from "../../images/service/image 61.png";

import PrimaryButton from "@/app/components/comman/PrimaryButton";
import ServicesSection from "@/app/components/homepage/ServicesSection";
import WebsiteDesignServices from "@/app/components/service/WebsiteDesignServices";
import ServiceFrom from "@/app/components/service/ServiceFrom";
import FAQ from "@/app/components/homepage/FAQ";
import NewsletterSubscription from "@/app/components/service/NewsletterSubscription";

export default function Home() {
  const serviceslist = [
    {
      title: "Conversion Rate Optimization Services",
      description:
        "Cube InfoTech offers comprehensive Conversion Rate Optimization (CRO) services to help businesses of all types website’s potential.",
      image: service1,
      url: "/services/website-design",
    },
    {
      title: "Mockup Design Services",
      description:
        "At Cube InfoTech, we believe the foundation of every great digital product starts with a well-thought-out design. ",
      image: service2,
      url: "/services/web-development",
    },
    {
      title: "Website Redesign Services",
      description:
        "Your website is more than just a digital platform; it’s your brand's first impression. Moreover, it acts as a 24/7 salesperson",
      image: service3,
      url: "/services/ecommerce-development",
    },
  ];
  const services = [
    {
      title: "Aesthetics Matter",
      description:
        "We create a website that conveys your message clearly and attracts the visitors within a second. Converting them into buyers.",
      image: service1,
    },
    {
      title: "Corporate Website Design",
      description:
        "A website that flows like a breeze. Easy navigation to any part of the website. User friendly user journey is really priceless.",
      image: service1,
    },
    {
      title: "SEO Friendly",
      description:
        "Make your website search engine friendly so that it might come on the first page of Google, Yahoo, Bing, etc. by easy SEO efforts.",
      image: service1,
    },
  ];

  const digitalServices = [
    {
      title: "Website Creation",
      description:
        "Cube InfoTech offers top-grade website design services as well as web development services to make your website look more appealing and engaging. We make sure to build responsive web design with advanced tools and technology, for better accessibility, reach as well as conversion.",
      image: service1,
    },
    {
      title: "Content Management",
      description:
        "Cube InfoTech focuses on creating quality content as well as circulating it to the target audience with the right tools and Strategies. This not only builds your brand name but also helps your business grow exponentially. And we’ll be more than happy to help your business grow.",
      image: service1,
    },
    {
      title: "SEO Services",
      description:
        "Cube InfoTech, with an in-depth understanding of the current trends, provides the best SEO services through complete optimization and providing effective solutions and strategies to help your business rank on the top of the search results and drive higher organic traffic than before.",
      image: service1,
    },
    {
      title: "IT Related Works",
      description:
        "Cube InfoTech understands the significance of technology in the modern digital era, and no business would fail to thrive without a proper IT system at the back end. We make sure that all our IT and related operations are in place for a greater efficiency of what we do.",
      image: service1,
    },
  ];
  return (
    <>
      <Banner
        bannerBg={bannerBg}
        title="Ecommerce Website Design Company"
        showbutton={true}
        primaryShowbutton={{
          status: true,
          url: "/contact",
          title: "Direct Call",
        }}
      />
      <section className="py-16 px-6 bg-white">
        <h3 className="text-center mb-6">Ecommerce Web Development Company</h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="relative w-full">
            <Image
              src={MainPhoneImage2}
              alt="Main"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right Image Area */}
          <div>
            <p className="mb-2">
              As a full-service ecommerce solution provider company, Cube
              InfoTech meets the need for B2C and B2B e-commerce businesses for
              companies in
            </p>

            <ul className="list-disc pl-6 mb-4 pb-4">
              <li>Ecommerce website design and development </li>
              <li>
                Website integration with front-end & back-office processes as
                well as in-store operations
              </li>
              <li>Customization based on customer experience </li>
              <li>Advanced data analytics and research </li>
            </ul>
            <div className="px-6">
              <PrimaryButton url="/contact" title="Portfolio" />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection serviceslist={serviceslist} />
      <WebsiteDesignServices
        services={services}
        title={
          <>
            Why a
            <span className="text-green-600"> Website Designing Service </span>
            from Us?
          </>
        }
        rounded={false}
        card_bg="card-gradient-bg"
      />
      <div>
        <Image
          src={band}
          alt="Main"
          className="w-full h-auto object-contain my-8"
        />
      </div>

      <section className="py-16 px-6 bg-[#F3FFE9]">
        <h3 className="text-center mb-6">
          What are Your Ecommerce Development Needs?
        </h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <p className="mb-4">
              From groceries to aeronautical parts, from jewelry to ear
              implants! Ecommerce websites have made them all available online!
              Get online with your business and become a successful
              entrepreneur! We, as a renowned website design company in Toronto,
              cater to varied development needs ranging from high performing
              websites to user-centered web designs. You can launch your new
              online store in style with Cube InfoTech, an ecommerce website
              design company. Check out our web development assistance Now!
            </p>
          </div>

          {/* Right Image Area */}
          <div className="relative w-full">
            <Image
              src={MainPhoneImage2}
              alt="Main"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
      <section className="py-16 px-6">
        <h3 className="text-center mb-6">Tailored Web Design Solutions</h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <p className="mb-4">
              Every online store has different requirements. Therefore, we
              believe in bringing up unique designs as per the business. We
              start from creating UI / UX for your website’s compatibility in
              smartphones and desktop. The next aspect of our service is to
              ensure a seamless payment gateway for increased customer
              satisfaction and online conversions.
            </p>
          </div>

          {/* Right Image Area */}
          <div className="relative w-full">
            <Image
              src={MainPhoneImage2}
              alt="Main"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <h3 className="text-center mb-6">
          Maintain Your Store’s Online Presence
        </h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="relative w-full">
            <Image
              src={MainPhoneImage2}
              alt="Main"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right Image Area */}
          <div>
            <p className="mb-2">
              In today’s world, the selling doesn’t stop at just displaying your
              products for your customers. It involves engaging your customers,
              increasing the time spent on your store and making it a convenient
              experience for them to ensure first sales or repeat orders. You
              can trust Cube InfoTech to be a reliable partner in your journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <h3 className="text-center mb-6">Ecommerce Website Development</h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <p className="mb-4">
              A customer centric website with convenient options to navigate
              through, keeps your customers engaged. You need to ensure that
              your website is not text heavy. Color patterns used also play an
              important role in attracting customers. Cube InfoTech takes care
              of such small details for earning adequate profits for your
              business.
            </p>
          </div>

          {/* Right Image Area */}
          <div className="relative w-full">
            <Image
              src={MainPhoneImage2}
              alt="Main"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F3FFE9]">
        <h3 className="text-center mb-6"></h3>
        <small></small>
        <WebsiteDesignServices
          services={digitalServices}
          subtitle=" Every business tends to rely heavily on digital marketing experts to
          help them expand and widen their reach among consumers. Cube InfoTech,
          one of the leading e-commerce web design companies in Austin, provides
          complete optimum solutions and strategies to its clients to make their
          way into the world of top digital companies. Being a top e-commerce
          website design company, it not only makes your website look appealing
          and engaging, but also strives relentlessly to help the businesses
          grow through targeting right audience, effective search engine
          optimization (SEO), domain registration, web hosting, e-commerce
          solutions, content management and other IT related works. Our highly
          specialised team of professional e- commerce developers make sure that
          your business website is infused with attractive web design, rich
          content, right keywords, and great user interface. We target the right
          audience with the perfect strategies and solutions to your every
          problem!"
          title={<>In The 21st Digital ERA…</>}
          rounded={false}
          fourCard={true}
          card_bg="bg-white"
        />
      </section>

      <ServiceFrom />

      <FAQ/>
      <NewsletterSubscription/>
    </>
  );
}
