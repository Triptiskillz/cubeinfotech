import Image from "next/image";
import bg1 from "../../images/image 13.png";
import bg2 from "../../images/image 13.png";
import bg3 from "../../images/image 13.png";

const features = [
  {
    title: "Small team of experts",
    description:
      "We have an in-house team of 55+ specialists, many with around a decade of experience.",
    stat: "55+",
    bg: bg1,
  },
  {
    title: "Competent experience",
    description:
      "Cube InfoTech started around 6 years back with a team of 4 and now we are 55+.",
    stat: "6+",
    bg: bg2,
  },
  {
    title: "Websites launched",
    description:
      "We’ve designed unique websites with creativity in various niches for startups as well as enterprises.",
    stat: "700+",
    bg: bg3,
  },
];

export default function AboutSection() {
  return (
    <section className="px-6 md:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          About Our Web Design Services
        </h2>
        <p className="text-gray-700 mb-4">
          At Cube InfoTech, we believe that the best website is one that
          represents the products or services effectively and is engaging. We’ve
          been working for clients based in Ontario, Texas, and various other
          parts of the world.
        </p>
        <p className="text-gray-700 mb-10">
          Every day, we endeavor to enhance your brand’s online visibility,
          increase engagement & reach with your target audience, and achieve the
          sales and conversions you seek.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden h-64 flex flex-col justify-between p-6 text-white"
            >
              <Image
                src={item.bg}
                alt={item.title}
                fill
                className="object-cover absolute inset-0 z-0"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
              <div className="relative z-20">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
              <div className="relative z-20 text-2xl font-bold self-end">
                {item.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
