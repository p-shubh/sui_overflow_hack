"use client";

import React, { useState } from "react";
import ProfileNavbar from "../../components/profile_components/ProfileNavbar";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { PROFILE_PAGE_CULT_CARDS } from "../../utils/constants";
import Footer from "@/app/components/reusable/Footer";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommunityCard from "@/app/components/profile_components/CommunityCard";
import CategoriesDropdown from "@/app/components/reusable/CategoriesDropdown";
import Link from "next/link";

const Profile = () => {
  const [isProfileLiked, setIsProfileLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("Cults");

  return (
    <main className="w-[95vw] mx-auto p-10">
      <ProfileNavbar />
      <hr className="mt-5" />
      <div className="row-1 flex flex-wrap items-center gap-5 justify-center mt-5">
        <div className="h-[212px] w-[212px]">
          <Image
            src="https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg?t=st=1716449282~exp=1716452882~hmac=164428b5943ab7140be5d8cbfa15eaf12b2ff3961b720f9e86d1163628d92e9f&w=826"
            height={212}
            width={212}
            alt="profile-picture"
            className="rounded-full contain h-[100%]"
          />
        </div>
        <div className="ml-8">
          <div className="flex items-center">
            <h3 className="text-xl font-bold">VoyagerConnect</h3>
            {isProfileLiked ? (
              <FaHeart className="ml-8 text-[#EE4E4E] text-xl cursor-pointer" />
            ) : (
              <FaRegHeart
                className="ml-8 text-xl cursor-pointer"
                onClick={() => setIsProfileLiked(true)}
              />
            )}
          </div>
          <div className="font-medium text-md text-[#5d5d5b]">
            Virtual world explorer
          </div>
          <span>
            <CategoriesDropdown category="Interests" />
          </span>
          <span>Gender:</span>
          <div className="flex gap-3 mt-5">
            <div className="">
              <span className="font-medium text-md mr-2">45</span>
              <span className="font-medium text-md text-[#5d5d5b]">
                Achievement
              </span>
            </div>
            <div>
              <span className="font-medium text-md mr-2">Co</span>
              <span className="font-medium text-md text-[#5d5d5b]">
                Communities
              </span>
            </div>
            <div>
              <span className="font-medium text-md mr-2">Int</span>
              <span className="font-medium text-md text-[#5d5d5b]">
                Discoveries
              </span>
            </div>
          </div>
          <div className="flex gap-5 mt-8">
            <button className="bg-[#0A72C7] hover:bg-[#2a73ae] text-white font-bold py-1 px-14 rounded">
              Join
            </button>
            <button className="bg-[#EAECF0] font-bold py-1 px-14 rounded hover:shadow-md">
              Chat
            </button>
          </div>
        </div>
      </div>
      <div className="row-2 flex justify-center gap-10 mt-14">
        <Link
          href="#"
          className={`font-bold text-md text-[#5d5d5b] ${
            activeTab === "My Journey" && "underline underline-offset-4"
          }`}
          onClick={() => setActiveTab("My Journey")}
        >
          My Journey
        </Link>
        <Link
          href="#"
          className={`font-bold text-md text-[#5d5d5b] ${
            activeTab === "Cults" && "underline underline-offset-4"
          }`}
          onClick={() => setActiveTab("Cults")}
        >
          Cults
        </Link>
        <Link
          href="#"
          className={`font-bold text-md text-[#5d5d5b] ${
            activeTab === "Poaps" && "underline underline-offset-4"
          }`}
          onClick={() => setActiveTab("Poaps")}
        >
          Poaps
        </Link>
      </div>
      <hr className="mt-5" />
      <div className="flex flex-wrap gap-x-8 gap-y-8 justify-center mt-10">
        {PROFILE_PAGE_CULT_CARDS.map((cardData) => (
          <CommunityCard
            key={uuidv4()}
            name={cardData.name}
            imgSrc={cardData.src}
          />
        ))}
      </div>
      <div className="flex justify-center mt-14 mb-12">
        <button className="bg-[#EAECF0] font-semibold py-2 px-4 rounded hover:shadow-md">
          Discover More
        </button>
      </div>
      <hr className="mt-5" />
      <Footer />
    </main>
  );
};

export default Profile;
