"use client";

import CommunitiesNavbar from "../../components/communities_components/CommunitiesNavbar";
import { v4 as uuidv4 } from "uuid";
import {
  COMMUNITY_PAGE_BUTTONS,
  VIBRANT_COMMUNITY_CARD_IMAGES,
} from "../../utils/constants";
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
          {COMMUNITY_PAGE_BUTTONS.map((data) => (
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
              src="https://img.freepik.com/premium-photo/business-network-hand-shakes_777576-2834.jpg?w=740"
              alt="img"
              height={568}
              width={888}
              className="object-cover rounded"
            />
          </div>
          <div className="row-span-1 col-span-1">
            <Image
              src="https://img.freepik.com/free-photo/view-3d-islamic-lantern_23-2151112512.jpg?t=st=1716012965~exp=1716016565~hmac=858b24ad9e9d0d06bf022baa0961fdf7c192d7c09b38aade943bd4e2bfd25cf8&w=740"
              alt="img"
              height={272}
              width={432}
              className="object-cover rounded"
            />
          </div>
          <div className="row-span-1 col-span-1">
            <Image
              src="https://img.freepik.com/premium-photo/holographic-wireframe-representation-global-world-planet-earth-laptop_973328-2856.jpg?w=740"
              alt="img"
              height={272}
              width={432}
              className="object-cover rounded"
            />
          </div>
        </div>
        <div className="row-2 mt-10">
          <div className="text-lg font-bold mt-10 mb-5">
            Discover Vibrant Communities
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            <VivrantCommunitiesCard
              imgSrc1={VIBRANT_COMMUNITY_CARD_IMAGES.card1.src1}
              imgSrc2={VIBRANT_COMMUNITY_CARD_IMAGES.card1.src2}
              imgSrc3={VIBRANT_COMMUNITY_CARD_IMAGES.card1.src3}
              sectionHeading="Discover New Connections"
              sectionTagline1="Dynamic rewards"
              sectionTagline2="Meet new people"
            />
            <VivrantCommunitiesCard
              imgSrc1={VIBRANT_COMMUNITY_CARD_IMAGES.card2.src1}
              imgSrc2={VIBRANT_COMMUNITY_CARD_IMAGES.card2.src2}
              imgSrc3={VIBRANT_COMMUNITY_CARD_IMAGES.card2.src3}
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

