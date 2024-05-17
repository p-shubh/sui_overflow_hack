"use client";

import CommunitiesNavbar from "../../components/communities_components/CommunitiesNavbar";
import { v4 as uuidv4 } from "uuid";
import { DISCOVER_PAGE_BUTTONS } from "../../utils/constants";
import Image from "next/image";
import VivrantCommunitiesCard from "../../components/communities_components/VivrantCommunitiesCard";
import Footer from "@/app/components/reusable/Footer";

const Community = () => {
  return (
    <main className="w-[95vw] mx-auto p-10">
      <CommunitiesNavbar />
      <div>
        <div className="text-lg font-bold mt-10 mb-5">
          Discover New Connections
        </div>
        <div className="flex flex-wrap gap-3">
          {DISCOVER_PAGE_BUTTONS.map((data) => (
            <button
              key={uuidv4()}
              className="bg-[#EAECF0] font-semibold py-2 px-4 rounded hover:shadow-md"
            >
              {data.text}
            </button>
          ))}
        </div>
        <div className="grid-images grid grid-cols-3 gap-5 mt-10">
          <div className="row-span-2 col-span-2">
            <Image
              src="/dummy-image.png"
              alt="img"
              height={568}
              width={888}
              className="object-cover"
            />
          </div>
          <div className="row-span-1 col-span-1">
            <Image
              src="/dummy-image.png"
              alt="img"
              height={272}
              width={432}
              className="object-cover"
            />
          </div>
          <div className="row-span-1 col-span-1">
            <Image
              src="/dummy-image.png"
              alt="img"
              height={272}
              width={432}
              className="object-cover"
            />
          </div>
        </div>
        <div className="row-2 mt-10">
          <div className="text-lg font-bold mt-10 mb-5">
            Discover Vibrant Communities
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            <VivrantCommunitiesCard
              imgSrc1="/dummy-image.png"
              imgSrc2="/dummy-image.png"
              imgSrc3="/dummy-image.png"
              sectionHeading="Discover New Connections"
              sectionTagline1="Dynamic rewards"
              sectionTagline2="Meet new people"
            />
            <VivrantCommunitiesCard
              imgSrc1="/dummy-image.png"
              imgSrc2="/dummy-image.png"
              imgSrc3="/dummy-image.png"
              sectionHeading="Explore the Possibilities"
              sectionTagline1="Unlock new experiences"
              sectionTagline2="Find your tribe"
            />
          </div>
        </div>
        <div className="flex justify-center mt-14 mb-12">
          <button className="bg-[#EAECF0] font-semibold py-2 px-4 rounded hover:shadow-md">
            Discover More
          </button>
        </div>
      </div>
      <hr className="mt-5" />
      <Footer />
    </main>
  );
};

export default Community;

