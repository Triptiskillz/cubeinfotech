"use client";

import Banner from "../../components/homepage/Banner";
import ServicesSection from "@/app/components/homepage/ServicesSection";
import Image from "next/image";

import bannerBg from "../../images/banner.jpg";
import service1 from "../../images/service/image 3.png";
import service2 from "../../images/service/image 3-2.png";
import service3 from "../../images/service/image 3-3.png";
import service4 from "../../images/service/image 3-4.png";
import service5 from "../../images/service/image 3-5.png";

import MainPhoneImage from "../../images/service/image 53.png";
import MainPhoneImage1 from "../../images/service/image 54.png";
import MainPhoneImage2 from "../../images/service/image 55.png";

import WebsiteRoadmap from "@/app/components/service/WebsiteRoadmap";
import WebsiteDesignServices from "@/app/components/service/WebsiteDesignServices";
import WhyCubeInfotech from "@/app/components/service/WhyCubeInfotech";
import FAQ from "@/app/components/homepage/FAQ";
import NewsletterSubscription from "@/app/components/service/NewsletterSubscription";

export default function Home() {
  const serviceslist = [
    {
      title: "Website Design Services",
      description:
        "It all starts with a website.It never ends if it's adorable.",
      image: service1,
      url: "/services/website-design",
    },
    {
      title: "Web Development Services",
      description:
        "Fast, secure and SEO friendly with automation.We use clean code for desired functionality.",
      image: service2,
      url: "/services/web-development",
    },
    {
      title: "Ecommerce Development",
      description: "Want to sell your product?We have the right solution.",
      image: service3,
      url: "/services/ecommerce-development",
    },
    {
      title: "Web Development Services",
      description:
        "Fast, secure and SEO friendly with automation.We use clean code for desired functionality.",
      image: service4,
      url: "/services/web-development",
    },
    {
      title: "Ecommerce Development",
      description: "Want to sell your product?We have the right solution.",
      image: service5,
      url: "/services/ecommerce-development",
    },
  ];

  const sections = [
    {
      title: "Understanding Your Business and Creating a Plan",
      points: [
        "We start by understanding your business and audience.",
        "Our team researches competitors to identify industry trends.",
        "We analyze your brand to create a unique online presence.",
        "We define clear goals that align with your business needs.",
        "A detailed roadmap guides the entire design process.",
      ],
    },
    {
      title: "UI/UX Design",
      points: [
        "We design intuitive interfaces that simplify navigation.",
        "Every element improves usability and interaction.",
        "We focus on easy access to important information.",
        "We enhance visual appeal with modern design principles.",
        "User-friendly layouts keep visitors on your website for a long period.",
        "We test different design variations for the best results.",
      ],
    },
    {
      title: "Custom Website Development",
      points: [
        "We create custom web designs according to your business needs.",
        "We ensure fast performance for a smooth user experience.",
        "Security features protect your data and users.",
        "We integrate advanced functionalities based on your needs.",
        "Our development process ensures clean and efficient code.",
      ],
    },
    {
      title: "SEO-Friendly Structure",
      points: [
        "We build websites using SEO best practices.",
        "Clean code improves search engine indexing.",
        "Fast loading times improve user experience and rankings.",
        "Structured content helps search engines understand your website.",
        "We optimize images and multimedia for better performance.",
      ],
    },
    {
      title: "Conversion Optimization",
      points: [
        "We optimize layouts to increase engagement.",
        "Strong calls to action encourage visitors to take action.",
        "We test and refine designs for full impact.",
        "Every detail helps convert visitors into customers.",
      ],
    },
    {
      title: "Testing & Launch",
      points: [
        "We check compatibility across different browsers.",
        "Speed and performance tests ensure smooth operation.",
        "Every function gets reviewed for accuracy.",
        "We fix bugs and make final improvements.",
        "Once everything is perfect, we launch your website.",
      ],
    },
  ];
  const services = [
    {
      title: "Custom Website Design",
      description:
        "Need a one-of-a-kind website? We craft designs that showcase your brand. Moreover, your website should stand out, not blend in. Further, we use modern design principles to create a visually stunning website. On top of this, every page reflects your brand's unique identity, values, and message.",
      image: service1,
    },
    {
      title: "Corporate Website Design",
      description:
        "Build credibility with a professional business website. A strong online presence increases trust and attracts clients. Not to mention, we design sleek and informative websites that highlight your expertise. Moreover, clear messaging makes sure that visitors understand your brand instantly.",
      image: service1,
    },
    {
      title: "Landing Page Design",
      description:
        "A high-converting landing page is key for marketing success. We create pages that grab the attention of users and encourage them to take the desired action. Furthermore, a clean layout keeps visitors focused on your message. Strong call to action encourages sign-ups, downloads, or purchases. Moreover, fast loading speeds reduce bounce rates and improve engagement.",
      image: service1,
    },
    {
      title: "eCommerce Website Design",
      description:
        "Sell online with ease. Our eCommerce designs make shopping simple. Our web designers build user-friendly layouts that guide customers effortlessly. Moreover, secure payment options help build trust and boost sales. Further, we optimize product pages for better visibility and conversions. Additionally, your online store will load fast and work seamlessly on all devices. Smooth navigation keeps customers coming back.",
      image: service1,
    },
    {
      title: "WordPress Website Design",
      description:
        "Want a flexible and easy-to-manage website? WordPress is the perfect choice. Our web designers design and develop WordPress websites with custom features. Moreover, editing content is simple with an intuitive dashboard. We optimize the website for speed, security, and SEO. Furthermore, your website will be scalable, allowing you to grow your business without limitations.",
      image: service1,
    },
  ];
  const features = [
    {
      title: "We Have Experienced Team",
      description:
        "Our web designers and developers have years of hands-on experience. Furthermore, we understand what works and what doesn’t. Further, your project benefits from our knowledge and expertise. Moreover, we follow industry trends to build modern and high-performing websites. Additionally, your vision guides our website designing process; making sure that the website meets your business objectives and preferences.",
    },
    {
      title: "We Have a Transparent Process",
      description:
        "We believe in transparent communication. You’ll always know what’s happening with your project. Moreover, we keep you involved at every stage, from planning to launching your website. No hidden surprises—just a clear and honest process.",
    },
    {
      title: "We Offer Continuous Support",
      description:
        "A website needs regular updates to stay secure and effective. Moreover, we offer continuous support to keep your website running smoothly. Whether it’s maintenance, updates, or troubleshooting, we’re here to help. Moreover, our team makes sure that your website stays optimized and performs at its best.",
    },
    {
      title: "Building Visually Stunning & User-Friendly Websites",
      description:
        "A great website keeps visitors engaged. Moreover, we design your website by keeping your target audience in mind. Further, simple navigation makes browsing easy. Not to mention, every layout enhances usability and interaction. Moreover, we focus on visual appeal while ensuring a smooth user experience. Ultimately, your website will keep visitors interested and encourage them to take the desired action.",
    },
    {
      title:
        "Building Websites with the Latest Tools, Frameworks & Programming Languages",
      description:
        "Technology changes fast, and we stay ahead of it. Moreover, we use the latest tools and programming languages to build fast, secure, and scalable websites. Furthermore, modern frameworks improve the performance and functionality of your website. Not to mention, we future-proof your website to keep it updated and secured for years to come.",
    },
  ];
  return (
    <>
      <Banner
        bannerBg={bannerBg}
        title="Transform Your Online Presence with Expert Website Design Services"
        showbutton={true}
        primaryShowbutton={{
          status: true,
          url: "/contact",
          title: "Direct Call",
        }}
      />

      <div className="container mx-auto md:px-6 md:py-8 mt-6 text-center">
        <p>
          Your website is your digital storefront. If it looks outdated or isn’t
          user friendly, visitors will leave, which means lost sales and missed
          opportunities. At Cube InfoTech, we solve this problem by designing
          stunning websites that grab attention and drive results.
        </p>
        <p>
          Our expert team focuses on three things: aesthetics, usability, and
          performance. We craft eye-catching designs that make a strong first
          impression. Furthermore, we offer seamless navigation so users stay
          engaged. We optimize speed and functionality for smooth browsing.
        </p>
        <p>
          Moreover, a great website isn’t just about looks. It should turn
          visitors into customers. That’s exactly what we deliver. Ready to
          transform your online presence? Let’s build a website that converts!
        </p>
      </div>
      <ServicesSection serviceslist={serviceslist} />

      <section className="py-16 px-6 bg-white">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <p className="text-gray-700 mb-6">
              We're not just an ecommerce website development company in
              Toronto, however, we provide complete A to Z e-commerce solution:
              <br />
              <br />
              Website designing creates the look, feel, and structure of a
              website. It includes layout, colors, fonts, images, and
              interactive elements. Not to mention, a good design ensures smooth
              navigation and an engaging user experience. Moreover, it balances
              aesthetics with functionality. Furthermore, web designers use
              tools like Figma, Adobe XD, and Sketch to build visually appealing
              interfaces. Mobile responsiveness and fast loading times improve
              usability. In addition to this, clear call-to-action buttons guide
              users effectively. SEO-friendly design helps websites rank higher.
              Additionally, accessibility features make websites inclusive.
              Every element works together to enhance user interaction.
              Moreover, a well-designed website attracts visitors, boosts
              conversions, and strengthens brand identity.
            </p>
          </div>

          {/* Right Image Area */}
          <div className="relative w-full">
            <Image
              src={MainPhoneImage}
              alt="Main"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
      <WebsiteRoadmap sections={sections} />
      <WebsiteDesignServices
        services={services}
        subtitle="Every website needs a unique solution. We make designs that engage users and convert them into paying customers."
        title={
          <>
            Custom{" "}
            <span className="text-blue-600">Website Design Services</span> to
            Boost Your Online Presence
          </>
        }
        rounded={true}
         card_bg='card-gradient-bg'
      />

      <WhyCubeInfotech
        features={features}
        title=" Why Cube InfoTech is the Right Choice for Website Design Services?"
        subtitle="Choosing the right web design company is important. At Cube InfoTech, we focus on quality, creativity, and results."
        bg_color="bg-[#E8F7FF]"
      />
      <section className="py-16 px-6">
        <h3 className="text-center">
          Redesign Your Website: Improve Branding, Speed, & Functionality
        </h3>
        <p className="text-center mb-6 text-gray-600 pb-6">
          Is your website outdated or is it underperforming? Or it may be
          driving customers away. Furthermore, a fresh redesign can fix that and
          improve engagement.
        </p>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div className="relative w-full">
            <Image
              src={MainPhoneImage1}
              alt="Main"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right Image Area */}
          <div>
            <ul className="list-disc pl-6 pt-6 text-[#1D1D1F] text-base leading-relaxed space-y-2 marker:text-[#1D1D1F]">
              <li>
                Slow load times frustrate visitors. We optimize speed to keep
                them on your website longer.
              </li>
              <li>
                Moreover, poor mobile experience leads to less traffic. We make
                your website fully responsive on all devices.
              </li>
              <li>
                Weak branding makes your brand identity blend in with other
                businesses. We work on a redesign that makes your business stand
                out.
              </li>
              <li>
                Moreover, complicated navigation causes high bounce rates. We
                streamline your website for a smooth user journey.
              </li>
              <li>
                Outdated SEO practices hurt rankings. We implement the latest
                SEO strategies to boost visibility.
              </li>
              <li>
                Furthermore, low conversions mean lost revenue. We design with
                conversion-focused elements to drive sales.
              </li>
              <li>
                Security risks put your business at stake. We improve security
                to protect your website and customers.
              </li>
              <li>
                Not to mention, broken links and outdated content create a bad
                impression. We fix errors and refresh your content.
              </li>
            </ul>
            <br /> 
            <p className="text-gray-700 mb-6">
              A redesigned website strengthens your brand identity and increases
              engagement. On top of this, it also improves SEO rankings and
              visibility. Moreover, a fresh look builds trust and credibility.
              Ready for a transformation? Let’s give your website the upgrade it
              deserves!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#E8F7FF]">
        <h3 className="text-center">
          Benefits of Choosing Cube InfoTech for Website Design Services
        </h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <ul className="list-disc pl-6 text-[#1D1D1F] text-base leading-relaxed space-y-2 marker:text-[#1D1D1F]">
              <li> We design intuitive interfaces that simplify navigation.</li>
              <li>Every element improves usability and interaction.</li>
              <li>We focus on easy access to important information.</li>
              <li>We enhance visual appeal with modern design principles.</li>
              <li>
                User-friendly layouts keep visitors on your website for a long
                period.
              </li>
              <li>We test different design variations for the best results.</li>
            </ul>
            <br />
            <p className="text-gray-700 mb-6">
              Your website is the heart of your online presence. Build it with
              visually stunning designs and unique website development
              solutions. Connect with Cube InfoTech today to get started.
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
      <FAQ />
      <NewsletterSubscription />
    </>
  );
}
