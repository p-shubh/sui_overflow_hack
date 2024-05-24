"use client";
import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

interface Props {
  like: boolean;
  setLike: Dispatch<SetStateAction<boolean>>;
}

const RandomChatNavbar = ({ like, setLike }: Props) => {
  return (
    <div className="flex bg-[#25262D] p-5">
      <div className="ml-auto">
        {like ? (
          <AiFillLike
            className="text-blue-500 font-medium text-2xl cursor-pointer"
            onClick={() => setLike(false)}
          />
        ) : (
          <AiOutlineLike
            className="text-white font-medium text-2xl cursor-pointer"
            onClick={() => setLike(true)}
          />
        )}
      </div>
    </div>
  );
};

export default RandomChatNavbar;
