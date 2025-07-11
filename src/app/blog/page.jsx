"use client";

import Banner from "@/app/components/homepage/Banner";
import NewsletterSubscription from "@/app/components/service/NewsletterSubscription";

import bannerBg from "../images/banner.jpg";
import BlogPosts from "../components/blog/PostsData";

export default function Home() {
 
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
      />

<BlogPosts />
      <NewsletterSubscription />
    </>
  );
}
