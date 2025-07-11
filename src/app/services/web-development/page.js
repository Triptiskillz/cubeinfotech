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

import WhyChooseUs from "@/app/components/about/WhyChooseUs";
import WhyCubeInfotech from "@/app/components/service/WhyCubeInfotech";
import ServicesSection from "@/app/components/homepage/ServicesSection";
import FAQ from "@/app/components/homepage/FAQ";
import NewsletterSubscription from "@/app/components/service/NewsletterSubscription";
import WebsiteDesignServices from "@/app/components/service/WebsiteDesignServices";

export default function Home() {
  const features = [
    {
      title: "Breaking Code Into Smaller Chunks",
      description:
        "Cube InfoTech offers comprehensive Conversion Rate Optimization (CRO) services to help businesses of all types website’s potential.",
    },
    {
      title: "Version Control",
      description:
        "Cube InfoTech’s backend developers use the version control tool ‘Git’ to keep them updated on any changes to the codebase. Therefore, we get rid of any confusion & complications. Moreover, we maintain a quality backend process. Furthermore, this makes the overall process of building a website easier and faster.",
    },
    {
      title: "Documenting Code",
      description:
        "Our backend developers keep records of the code by documenting them. We do in-line commenting on the code to help each other stay on the same page. This is because some of us might know the code while others might not know certain concepts of it. Thus, we are able to build your website faster than you can expect.",
    },
  ];
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
  ];
  return (
    <>
      <Banner
        bannerBg={bannerBg}
        title="Web Development Services"
        subtitle="Are your users experiencing slow speed or poor performance of your website? 
        Well, it is time to convert your static website into a dynamic website with Cube InfoTech’s
         web development services. Since our developers use SQL and NoSQL databases effectively in order 
         to organize your website data securely. Therefore, this will result in fast data retrieval as well as processing. 
         So, ultimately you will have an enhanced performance of your website and it will provide a seamless user experience."
        showbutton={true}
        primaryShowbutton={{
          status: true,
          url: "/contact",
          title: "Direct Call",
        }}
      />

      <div className="container mx-auto md:px-6 md:py-8 mt-6 text-center">
        <h2 className="text-center text-2xl md:text-3xl font-bold">
          Web Development{" "}
          <span className="text-[var(--Primary-Color)]">Services</span>
        </h2>

        <p>
          Cube InfoTech is basically a web development company that provides web
          development services to build dynamic as well as high-performing
          websites. Whether you are from IT, Pharma, manufacturing, media, food
          industry or education industry, Cube InfoTech is here to help you
          build powerful websites.
        </p>
        <br />
        <p>
          We at Cube InfoTech have backend developers who are proficient in
          various server-side programming languages such as Node.js, Django,
          Python, PHP, etc. Moreover, we have an excellent knowledge of web
          server, version control and we know better than anyone else how to
          secure a website from security threats.
        </p>
      </div>

      <section className="py-16 px-6 bg-white">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <p className="mb-4">
              When it comes to the process of our web development services, this
              is how we do it and do it differently:
            </p>
            <ul className="list-disc pl-6 pt-2">
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

              <li>
                Our backend developers write clean code to build bug-free as
                well as more functional websites.{" "}
              </li>
              <li>
                We keep ourselves updated on the new technology trends by
                joining various online dev communities.{" "}
              </li>
              <li>
                We are experts in building RESTful APIs that enable seamless
                communication between frontend & backend.{" "}
              </li>
              <li>
                To create robust & high-performing websites, we have a master
                level of skills in various server-side languages.{" "}
              </li>
              <li>
                Our back end development team collaborate with front-end
                developers to merge user-facing components with server-side
                logic.
              </li>
            </ul>

            <p className="mb-6 mt-6">
              We think that a well-optimized backend process is more than
              crucial to enable quick response times, increased scalability,
              optimal resource utilization, and much more.
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
      <WhyCubeInfotech
        features={features}
        title="This is how our backend developers do website development differently:"
        subtitle="In order to build high-performing & reliable websites, we at Cube InfoTech follow specific web development methods or techniques. Here is what we do differently:"
        bg_color="bg-[#F6F6F6]"
      />

      <section className="py-16 px-6 bg-white">
        <h3 className="text-center mb-6">
          Why Businesses Prefer to Work with Cube InfoTech for Their Web
          Solutions
        </h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <p className="mb-4">
              There are many things that make us one of the best choices for
              your web solutions. We first thoroughly understand the project
              requirements; therefore, we are able to provide you with the best
              web solutions. Other than this:
            </p>
            <ul className="list-disc pl-6 pt-2">
              <li>
                Our developers know how to effectively use authentication &
                authorization methods to protect sensitive data.
              </li>
              <li>
                Using technologies like MongoDB, MySQL & Oracle, we manage
                databases to store & retrieve data effectively.
              </li>
              <li>
                Using expertise in various backend programming languages, we
                will build better databases, APIs & back-end logic.
              </li>
              <li>
                Our developers know how to optimize code as well as databases to
                enhance the performance of your website.
              </li>
            </ul>
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

      <ServicesSection serviceslist={serviceslist} />
      <section className="py-16 px-6 bg-white">
        <h3 className="text-center mb-6">
          What You Will Get from Our Website Development Services
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
            <p className="mb-4">
              If you choose Cube InfoTech, then you will have various benefits
              for your website development such as:
            </p>

            <ul className="list-disc pl-6 pt-2">
              <li>
                {" "}
                We know how to use server-side languages effectively such as
                Ruby, PHP, Python, etc. to build dynamic websites.
              </li>
              <li>
                We ensure an organized as well as effective management of large
                amounts of data by using data management tools.
              </li>
              <li>
                Our API development process enables an easy incorporation with
                third-party services: ensuring a seamless user experience.
              </li>
              <li>
                Our backend developers use their expert knowledge to optimize
                code & database to boost the performance of a website.
              </li>
              <li>
                Your website will be protected from cyber attacks as we use
                encryption algorithms like AES (Advanced Encryption Standard).
              </li>
            </ul>

            <p className="mt-4">
              So, our robust backend architecture ensures that you have a
              dynamic, high-performing, and more functional website. Moreover,
              it will also minimize the risk of any data breach.
            </p>
          </div>
        </div>
      </section>
      <WebsiteDesignServices
        services={services}
        subtitle="Cube InfoTech’s robust backend process will save resources, lower costs as well as help in preventing expensive downtime. "
        title={
          <>
            eCommerce Website
            <span className="text-blue-600">Development Services</span>
          </>
        }
        rounded={false}
        card_bg='card-gradient-bg'
      />
      <section className="py-16 px-6 bg-[#E8F7FF]">
        <h3 className="text-center mb-6">
          The Difference You Must Know Between Web Design & Web Development
        </h3>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Content */}
          <div>
            <p className="mb-4">
              Web development is very much different than web design. Web
              development is a backend process of building a website that
              includes server-side development, building libraries as well as
              writing APIs. On the other hand, web design is the work of
              front-end developers who are responsible for how a website looks
              rather than how it works. Therefore, they are more focused on UI
              and to make the website as attractive as possible. Moreover,
              backend developers also do tasks such as database management,
              security as well as management of the website.
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
