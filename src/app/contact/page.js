import Image from "next/image";

import Banner from "../components/homepage/Banner";
import bannerBg from "../images/banner.jpg";
import FromContact from "../components/homepage/FromContact";
import ContactSection from "../components/contact/ContactSection";

export default function AboutUs() {
  return (
    <>
      <Banner
        bannerBg={bannerBg}
        title="Let’s Get in Touch"
        showbutton={true}
        primaryShowbutton={{
          status: true,
          url: "/contact",
          title: "Direct Call",
        }}
        //secondaryShowbutton={{ status: true, url: "/contact", title: "Contact Today!" }}
      />
      <ContactSection />
      <iframe
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps?q=Statue of Liberty, New York&output=embed"
      ></iframe>
    </>
  );
}
