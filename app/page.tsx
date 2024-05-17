import Image from "next/image";
import HomeNavbar from "./components/reusable/HomeNavbar";
import {
  LANDING_PAGE_BUTTON,
  LANDING_PAGE_VIBRANT_COMMUNITIES_IMAGES,
} from "./utils/constants";
import { v4 as uuidv4 } from "uuid";
import MembershipPlanCard1 from "./components/membership_plan_cards/MembershipPlanCard1";
import MembershipPlanCard2 from "./components/membership_plan_cards/MembershipPlanCard2";
import Footer from "./components/reusable/Footer";

/*
 *
 * @returns landing page or the home page
 */

export default function Home() {
  return (
    <main className="w-[95vw] mx-auto p-10">
      <HomeNavbar />
      <div className="bg-[#CDE1F2] p-10">
        <div className="flex lg:flex-row md:flex-col sm:items-center xs:flex-col justify-between row-1">
          <div className="flex flex-col xs:items-center lg:items-start">
            <h1 className="font-bold text-4xl mt-24 md:w-[70%] sm:w-[100%]">
              Connect with new friends & earn rewards!
            </h1>
            <div className="font-medium mt-20">Start you journey now.</div>
            <button className="bg-[#0A72C7] hover:bg-[#2a73ae] text-white font-bold py-1 px-14 rounded mt-8">
              Get started
            </button>
          </div>
          <Image
            src="/hero-image.png"
            priority
            width={400}
            height={400}
            alt="hero-image"
            className="mt-10 mr-7"
          />
        </div>
        <p className="text-right text-sm font-medium mt-4">
          Dynamic, engaging and fun
        </p>
        <div className="row-2 flex flex-col xs:items-center lg:items-start">
          <h4 className="text-lg font-bold mt-10 mb-10">
            Discover Vibrant Communities
          </h4>
          <div className="grid space-around justify-between gap-4 grid-cols-5 mt-4">
            {/* <div className="flex flex-wrap gap-4 mt-4 xs:justify-center md:justify-start"> */}
            {LANDING_PAGE_VIBRANT_COMMUNITIES_IMAGES.map((data) => (
              <div key={uuidv4()} className="flex flex-col mb-8">
                <Image
                  src={data.src}
                  height={218}
                  width={217}
                  alt="vivrant-communities"
                  className="object-fill"
                />
                <div className="mt-4 font-semibold">
                  {data.community_interest}
                </div>
                <div className="mt-2 text-sm font-medium">
                  {data.interest_taglines}
                </div>
              </div>
            ))}
            {/* </div> */}
          </div>
        </div>
        <hr className="text-white mt-10" />
        <div className="row-3">
          <h4 className="text-lg font-bold mt-10 mb-10 text-center">
            Community Categories
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {LANDING_PAGE_BUTTON.map((data) => (
              <button
                key={uuidv4()}
                className={`bg-${data.bg_color} hover:bg-${data.hover_bg_color} text-${data.text_color} font-semibold py-2 px-4 rounded hover:shadow-md`}
              >
                {data.text}
              </button>
            ))}
          </div>
        </div>
        <hr className="text-white mt-10" />
        <div className="row-4">
          <h4 className="text-lg font-bold mt-10 mb-10 text-center">
            Choose Your Membership
          </h4>
          <div className="flex flex-wrap justify-center gap-5 plan-cards">
            <MembershipPlanCard1 />
            <MembershipPlanCard2 />
          </div>
        </div>
      </div>
      <hr className="mt-5" />
      <Footer />
    </main>
  );
}
