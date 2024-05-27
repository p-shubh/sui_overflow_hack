import React from "react";
import { useRouter } from "next/navigation";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { UserFriendInterface } from "./Sidebar";

// This Props can be changed according to incoming data from backend
interface Props {
  userData: UserFriendInterface;
}

const SidebarList = ({ userData }: Props) => {
  const router = useRouter();

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  function capitaliseFirstLetter(string: string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
  }
  console.log(userData)
  const handleRemoveFriend = () => {
    if (typeof window !== undefined) {
      const userId = localStorage.getItem("userId");
        console.log(userId, userData.friends);
      // todo
      fetch(
        `http://${IP_ADDRESS}/v1.0/voyager/user_friends/${userId}/${userData.friends}`,
        {
          method: "DELETE",
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
          return response.json()
        })
        .then((data) => {
          return data;
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex justify-between items-center my-1 px-3 py-2 text-white bg-[#393646] hover:bg-[#4e516d] rounded">
      <li
        className="list-none font-medium text-lg"
        onClick={() => router.push("/voyager/random_chat/randomUserId")}
      >
        {capitaliseFirstLetter(userData.friendsName)}
      </li>
      <IoIosRemoveCircleOutline
        className="font-bold text-xl"
        onClick={handleRemoveFriend}
      />
    </div>
  );
};

export default SidebarList;
