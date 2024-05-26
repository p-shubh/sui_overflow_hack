"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/navigation";

interface RandomCandidate {
  id: string;
  user_address: string;
  sub_id: string;
  name: string;
  provider: string;
  gender: string;
  interest: string;
  location: string;
}

const CategoriesAndGenderDetailsPopup = () => {
  const [interestInputValue, setInterestInputValue] = useState<
    string | undefined
  >();
  const [interestValue, setInterestValue] = useState<string | undefined>();
  const [gender, setGender] = useState<string>("both")
  const [activeUserId, setActiveUserId] = useState<string | null>()
  const [activeUserSubId, setActiveUserSubId] = useState<string | null>();

  const router = useRouter();

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;
  let userId: string | null;
  let subId: string | null;

  const handleInterestValue = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && interestInputValue !== undefined) {
      setInterestValue(interestInputValue);
      setInterestInputValue("");
    }
  };

  const handleStartNewChat = async () => {
    // find a user for chat
    if (typeof window !== undefined) {
      userId = localStorage.getItem("userId");
      setActiveUserId(userId);
      subId = localStorage.getItem("subId")
      setActiveUserSubId(subId);
    }
    UpdateUserData();
    // hard code for now
    let list = await fetch(
      `http://${IP_ADDRESS}/v1.0/voyager/user/list-users-interest/${interestValue}/${activeUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
    if (list.length <= 0) {
      alert("No user found");
    } else {
      const randomNumber = Math.floor(Math.random() * list.length);
      const randomCandidateData = list[randomNumber];
      router.push(`/voyager/random_chat/${randomCandidateData?.id}`);
    }
  };

  function UpdateUserData() {
    const updatedUserData = {
      sub_id: activeUserSubId,
      provider: "Google",
      gender: gender,
      interest: interestValue,
    };
    fetch(`http://${IP_ADDRESS}/v1.0/voyager/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error patching data:", error);
      });
  }

  return (
    <div className="flex flex-col justify-between bg-[#222831] rounded p-4 w-[30%] h-[auto] m-auto">
      <MdOutlineCancel className="self-end text-2xl font-md text-gray-400 cursor-pointer hover:text-gray-50" />
      <div>
        <h6 className="font-md text-sm mb-4 text-[#7AA2E3] text-center">
          Choose gender
        </h6>
        <div className="flex justify-around gap-3">
          <Image
            src="/female.png"
            height={30}
            width={40}
            alt="profile-picture"
            className="hover:border-[#EE99C2] hover:border-2 cursor-pointer"
            onClick={() => setGender("female")}
          />
          <Image
            src="/male.png"
            height={30}
            width={40}
            alt="profile-picture"
            className="hover:border-[#5755FE] hover:border-2 cursor-pointer"
            onClick={() => setGender("male")}
          />
          <Image
            src="/both_gender.png"
            height={30}
            width={40}
            alt="profile-picture"
            className="hover:border-[#3AA6B9] hover:border-2 cursor-pointer"
            onClick={() => setGender("both")}
          />
        </div>
      </div>
      <div className="mt-5">
        <h6 className="font-md text-sm mb-3 text-[#7AA2E3] text-center">
          Match with interests
        </h6>
        <div className="flex flex-wrap gap-2 bg-muted rounded-md p-2 py-4 bg-[#31363F] overflow-x-auto">
          {interestValue !== undefined && (
            <div className="inline-flex items-center justify-center px-2.5 py-1 text-sm font-medium rounded-full bg-gray-300">
              {interestValue}
              <button className="flex-shrink-0 ml-1.5 h-3.5 w-3.5 rounded-full inline-flex items-center justify-center text-card bg-card-foreground hover:bg-card-foreground/80 focus:bg-card-foreground-hover">
                <span className="sr-only">Remove</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  height="10"
                  width="10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          <input
            type="text"
            className="w-32 select-auto sm:text-sm text-sm rounded-md bg-popover dark:bg-placeholder p-1 focus-visible:outline-none inline-flex bg-gray-200"
            maxLength={32}
            placeholder="Add an interest..."
            onChange={(event) => {
              setInterestInputValue(event.target.value);
            }}
            onKeyDown={handleInterestValue}
            value={interestInputValue}
          />
        </div>
      </div>
      <button
        className="bg-[#4ea5ec] mt-3 hover:bg-[#4890cb] text-white font-bold py-2 px-4 rounded"
        onClick={handleStartNewChat}
      >
        Start new chat
      </button>
    </div>
  );
};

export default CategoriesAndGenderDetailsPopup;
