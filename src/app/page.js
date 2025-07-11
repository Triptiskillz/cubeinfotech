"use client";

import Image from "next/image";
import { useState } from "react";

import Banner from "./components/homepage/Banner";
import FromContact from "./components/homepage/FromContact";
import BlogPost from "./components/homepage/BlogPost";
import FAQ from "./components/homepage/FAQ";
import Testimonials from "./components/homepage/Testimonials";
import OurWork from "./components/homepage/OurWork";
import SliderBanner from "./components/homepage/SliderBanner";

import Image8 from "./images/image 4.png";
import Image9 from "./images/image 6.png";
import Image14 from "./images/image 11.png";
import Image15 from "./images/image 12.png";
import Image16 from "./images/image 16.png";
import Image17 from "./images/image 17.png";
import bannerBg from "./images/banner.jpg";

import service1 from "./images/image 13.png";
import service2 from "./images/image 13.png";
import service3 from "./images/image 13.png";
 

import SidePartSection from "./components/homepage/SidePartSection";
import BrandPartnerSection from "./components/homepage/BrandPartnerSection";
import ProcessSection from "./components/homepage/ProcessSection";
import AgencyUSP from "./components/homepage/AgencyUSP";
import ServicesSection from "./components/homepage/ServicesSection";
import AboutSection from "./components/homepage/AboutSection";
import WhatsAppButton from "./components/comman/WhatsAppButton";
export default function Home() {
 
  const serviceslist = [
    {
      title: "Website Design Services",
      description: "It all starts with a website.It never ends if it's adorable.",
      image: service1,
      url: "/services/website-design",
    },
    {
      title: "Web Development Services",
      description: "Fast, secure and SEO friendly with automation.We use clean code for desired functionality.",
      image: service2,
      url: "/services/web-development",
    },
    {
      title: "Ecommerce Development",
      description: "Want to sell your product?We have the right solution.",
      image: service3,
      url: "/services/ecommerce-development",
    },
  ];
  const [SliderBannerList] = useState([
    {
      alt: "Creative Agency Website",
      image: Image8,
    },
    {
      alt: "Statistical Dashboard",
      image: Image9,
    },
    {
      alt: "Wallet Management App",
      image: Image14,
    },
    {
      alt: "Medical Consultation Platform",
      image: Image15,
    },
    {
      alt: "Gaming Social Platform",
      image: Image16,
    },
    {
      alt: "Business Website Builder",
      image: Image17,
    },
  ]);
  return (
    <>
      <Banner
        bannerBg={bannerBg}
        title="Web Design Company in Toronto: Cube InfoTech"
        subtitle="Get an engaging and visually appealing website and connect your audience with a strategic approach.
           Cube InfoTech is a web design company in Toronto known to build websites that converts website visitors into customers."
        showbutton={true}
        primaryShowbutton={{
          status: true,
          url: "/contact",
          title: "See Our Work",
        }}
        secondaryShowbutton={{
          status: true,
          url: "/contact",
          title: "Contact Today!",
        }}
      />
      <AboutSection />
      <ServicesSection serviceslist={serviceslist}/>
      <AgencyUSP />
      <ProcessSection />
      <SliderBanner SliderBannerList={SliderBannerList} title="Clients" />
      <BrandPartnerSection />
      <SidePartSection />
      <SliderBanner SliderBannerList={SliderBannerList} title="Technologies" />
      <OurWork />
      <Testimonials />
      <FAQ />
      <BlogPost />
      <FromContact />
    </>
  );
}
