"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useRouter, useParams } from "next/navigation";
import { UserFriendInterface } from "@/app/voyager/random_chat/[id]/page";
interface Props {
  like: boolean;
  setLike: Dispatch<SetStateAction<boolean>>;
  setFriendList: Dispatch<SetStateAction<UserFriendInterface[]>>;
}

const RandomChatNavbar = ({ like, setLike, setFriendList }: Props) => {
  const [profileName, setProfileName] = useState("");

  const router = useRouter();
  const params = useParams();
  const friendId = params.id;

  let cachedUserId: string | null;
  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  async function handleLikeUser() {
    if (typeof window !== undefined) {
      cachedUserId = localStorage.getItem("userId");
    }
    setLike(true);
    // post user friend
    const body = {
      userId: cachedUserId,
      friends: friendId,
    };

    await fetch(`http://${IP_ADDRESS}/v1.0/voyager/user_friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not okay " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        setFriendList((prev) => [...prev, data]);
      })
      .catch((error) => console.log(error));
    await getUpdatedFriends();
    if (like) {
      //  give profile access
    }
  }

  async function getUpdatedFriends() {
    const userFriends: UserFriendInterface[] = await fetch(
      `http://${IP_ADDRESS}/v1.0/voyager/user_friends/${cachedUserId}`,
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
            "Network response was not okay " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          return [];
        }
        console.log(data);
        const dataOfAUser: UserFriendInterface = data.filter(
          (friendData: UserFriendInterface) => friendData.friends === friendId
        )[0];
        console.log(dataOfAUser);
        setProfileName(dataOfAUser.friendsName);
        return data;
      })
      .catch((error) => console.log(error));
    if (setFriendList !== undefined && cachedUserId !== friendId) {
      setFriendList(userFriends);
    }
  }

  return (
    <div className="flex bg-[#25262D] p-5 justify-between gap-5">
      <div className="ml-auto self-center">
        {like ? (
          <AiFillLike className="text-blue-500 font-medium text-3xl cursor-pointer" />
        ) : (
          <AiOutlineLike
            className="text-white font-medium text-3xl cursor-pointer"
            onClick={handleLikeUser}
          />
        )}
      </div>
      <div>
        {like && (
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
            <span
              className="font-medium text-gray-600 dark:text-gray-300"
              onClick={() => router.push(`/voyager/profile/${friendId}`)}
            >
              {profileName.slice(0, 1).toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomChatNavbar;
