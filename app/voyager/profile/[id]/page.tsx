"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileNavbar from "../../../components/profile_components/ProfileNavbar";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  PROFILE_PAGE_MY_JOURNEY_CARDS,
  PROFILE_PAGE_CULT_CARDS,
  PROFILE_PAGE_POAPS_CARDS,
} from "../../../utils/constants";
import Footer from "@/app/components/reusable/Footer";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import TabsCards from "@/app/components/profile_components/TabsCards";
import Link from "next/link";
import EditProfilePopup from "@/app/components/profile_components/EditProfilePopup";

interface UserData {
  id: string;
  user_address: string;
  sub_id: string;
  name: string;
  provider: string;
  gender: string;
  interest: string;
  location: string;
}

const FriendProfile = () => {
  const [isProfileLiked, setIsProfileLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("Cults");
  const [userData, setUserData] = useState<UserData>();

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  const params = useParams();

  useEffect(() => {
    let getUserData;
    (async function () {
      // send a get request to get data of user saved in db.
      getUserData = await fetch(
        `http://${IP_ADDRESS}/v1.0/voyager/user/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return undefined;
        });
      setUserData(getUserData);
    })();
    // eslint-disable-next-line
  }, [userData]);

  function handleHeartClick() {
    setIsProfileLiked(true);
    // https://suiscan.xyz/devnet/object/0x962de884e9d74e6501a5dd4ce4c50e66623b1994120f85b4e3397f386951d9e6/txs
  }

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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">
                {userData !== undefined && userData.name !== ""
                  ? userData?.name
                  : "Random-User"}
              </h2>
            </div>
            {isProfileLiked ? (
              <FaHeart className="ml-8 text-[#EE4E4E] text-xl cursor-pointer" />
            ) : (
              <FaRegHeart
                className="ml-8 text-xl cursor-pointer"
                onClick={handleHeartClick}
              />
            )}
          </div>
          <div className="font-medium text-[#5d5d5b]">
            Virtual world explorer
          </div>
          <div className="flex flex-wrap gap-5 mt-3">
            {/* <span className="text-sm font-semibold text-[#343433]">
              Interest: {userData?.interest}
            </span> */}
            {/* <span className="text-sm font-semibold text-[#343433]">
              Age:&nbsp;
              {userData !== undefined && userData.name !== ""
                ? userData?.age
                : "00"}
            </span> */}
            <span className="text-sm font-semibold text-[#343433]">
              Gender:&nbsp;
              {userData !== undefined && userData.name !== ""
                ? userData?.gender
                : "other"}
            </span>
          </div>
          <div className="flex gap-3 mt-5">
            <div>
              <span className="font-medium text-md mr-2">25</span>
              <span className="font-medium text-md text-[#5d5d5b]">
                Achievement
              </span>
            </div>
            <div>
              <span className="font-medium text-md mr-2">3</span>
              <span className="font-medium text-md text-[#5d5d5b]">
                Communities
              </span>
            </div>
            <div>
              <span className="font-medium text-md mr-2">4</span>
              <span className="font-medium text-md text-[#5d5d5b]">
                Discoveries
              </span>
            </div>
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
        {activeTab === "My Journey" &&
          PROFILE_PAGE_MY_JOURNEY_CARDS.map((cardData) => (
            <TabsCards
              key={uuidv4()}
              name={cardData.name}
              imgSrc={cardData.src}
            />
          ))}
        {activeTab === "Cults" &&
          PROFILE_PAGE_CULT_CARDS.map((cardData) => (
            <TabsCards
              key={uuidv4()}
              name={cardData.name}
              imgSrc={cardData.src}
            />
          ))}
        {activeTab === "Poaps" &&
          PROFILE_PAGE_POAPS_CARDS.map((cardData) => (
            <TabsCards
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

export default FriendProfile;