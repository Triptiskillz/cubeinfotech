import Image from 'next/image';

import Banner from "../components/homepage/Banner";
import bannerBg from "../images/banner.jpg";
import ServicesSection from '../components/about/ServicesSection';
import OurValues from '../components/about/OurValues';
import FromContact from "../components/homepage/FromContact";
import WhyChooseUs from '../components/about/WhyChooseUs';

export default function AboutUs() {
  return (
    <>
 <Banner
  bannerBg={bannerBg}
  title="Let’s Get in Touch"
  showbutton={false}
  //primaryShowbutton={{ status: true, url: "/contact", title: "See Our Work" }}
  //secondaryShowbutton={{ status: true, url: "/contact", title: "Contact Today!" }}
/>

         <ServicesSection/>
         <OurValues/>
<WhyChooseUs/>
          <FromContact />
    </>
    
  );
}