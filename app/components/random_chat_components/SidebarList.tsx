import React from "react";

// This Props can be changed according to incoming data from backend
interface Props {
  name: string;
}

const SidebarList = ({ name }: Props) => {
  function capitaliseFirstLetter(string: string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
  }

  return (
    <>
      <li className="text-white bg-[#393646] list-none my-1 px-3 py-1 font-medium text-lg hover:bg-[#4e516d] rounded">
        {capitaliseFirstLetter(name)}
      </li>
    </>
  );
};

export default SidebarList;