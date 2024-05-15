"use client";

import React, {Suspense} from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import HomeNavbar from "@/app/components/HomeNavbar";
import Footer from "@/app/components/Footer";

const MyAccount = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get("userAddress");
  const id = searchParams.get("userId");

  return (
    <>
      <HomeNavbar />
      <div
        className="p-10 bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/grunge-watercolor-background-using-pastel-colours_1048-6530.jpg?t=st=1715490858~exp=1715494458~hmac=9ff8d1840af080b812a6bf02d4047e276657e07dfeef0c83b997d3d67889cef0&w=740')",
        }}
      >
        <div className="flex flex-col row1 items-center">
          <Image
            src="/profile-image.png"
            height={200}
            width={200}
            alt="profile-picture"
          />
          <div className="mt-5">Name</div>
        </div>
        <div className="flex mt-10 justify-center">
          <div className="flex flex-col gap-3">
            <div className="font-medium bg-white py-2 px-5 rounded-3xl">
              Address: {address}
            </div>
            <div className="font-medium bg-white py-2 px-5 rounded-3xl">
              User Id: {id}
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5" />
      <Footer />
    </>
  );
};

export default MyAccount;
