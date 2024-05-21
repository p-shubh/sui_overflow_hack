"use client";

import { useState } from "react";


interface Props {
  category: string;
  value: string | undefined
}

const Categories = ({ category, value }: Props) => {

  return (
    <div
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      className="font-medium bg-white focus:outline-none text-center inline-flex items-center"
    >
      {category.slice(0, 1).toUpperCase() + category.slice(1).toLowerCase()}:
      {value}
    </div>
  );
};

export default Categories;
