import Image from 'next/image';
import imageBanner from "../../images/about/image 38.png";

export default function ValuesSection() {
  return (
    <section className="py-12 px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
      {/* Left Side */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <p className="text-gray-700 mb-6">
          Quality, Promising timelines and Latest Technical knowledge to implement are not the only reasons to trust this
          Toronto web design company. We know what makes our clients comfortable and we’ve shaped ourselves accordingly.
        </p>

        <div className="flex flex-wrap gap-6 mb-8">
          <div>
            <p className="text-red-500 text-xl font-semibold">1.9k</p>
            <p className="text-gray-600">Total Audience</p>
          </div>
          <div>
            <p className="text-green-500 text-xl font-semibold">5.7k</p>
            <p className="text-gray-600">Complete Project</p>
          </div>
        </div>

        <div>
          <Image
            src={imageBanner}
            alt="Performance Chart"
            className="rounded-md w-full h-auto max-w-full"
            priority
          />
        </div>
      </div>

      {/* Right Side Boxes */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-full self-center">
          {/* The Team */}
          <div className="w-full max-w-sm p-4 bg-white border border-blue-300 rounded-xl shadow self-center">
            <h4 className="text-lg font-semibold mb-2">The Team</h4>
            <p className="text-gray-700">
              We are a team of creative thinkers, committed to bringing out new ideas and innovative technology which are
              lead-focused and sales-driven for growing businesses.
            </p>
          </div>

          {/* Our Achievements */}
          <div className="w-full max-w-sm p-4 bg-red-100 rounded-xl shadow self-center">
            <h4 className="text-lg font-semibold mb-2">Our Achievements</h4>
            <p className="text-gray-700">
              We have over 19 associates across 9 states of USA & Canada, just to ensure we serve our clients the best.
              We have a client base that stretches all over the globe through referrals.
            </p>
          </div>
        </div>

        {/* Right Column Box */}
        <div className="w-full max-w-sm p-4 bg-green-100 rounded-xl shadow self-center">
          <h5 className="text-lg font-semibold mb-2">Pocket Friendly Packages</h5>
          <p className="text-gray-700">
            We have the most attractive and pocket-friendly packages to suit your business type and the kind of marketing
            requirements you would need.
          </p>
        </div>
      </div>
    </section>
  );
}
