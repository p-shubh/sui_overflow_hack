import React from "react";
import { MdOutlineCancel } from "react-icons/md";

interface Props {
  setIsEditProfileClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfilePopup = ({ setIsEditProfileClicked }: Props) => {
  return (
    <form className="flex fixed w-full mt-10">
      <div className="relative xs:w-[60%] sm:w-[30%] m-auto rounded p-4 shadow bg-gradient-to-r from-green-300 to-blue-300">
        <MdOutlineCancel
          className="absolute right-0 mr-5 text-2xl text-green-100 cursor-pointer"
          onClick={() => setIsEditProfileClicked(false)}
        />
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 gray-900"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="visitors"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              className="outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 gray-900"
              placeholder="25"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              className="outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 gray-900"
              placeholder="male"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Interest
            </label>
            <input
              type="text"
              id="interest"
              className="outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 gray-900"
              placeholder="Technology"
            />
          </div>
        </div>
        <button className="bg-[#4ea5ec] hover:bg-[#4890cb] text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditProfilePopup;
