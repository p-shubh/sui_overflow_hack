"use client";

import HomeNavbar from "@/app/components/reusable/HomeNavbar";
import { FaDiscord } from "react-icons/fa";

const Community = () => {
  return (

    <main className="w-[full] mx-auto bg-slate-400 h-[710px]">
      <div className="">
        <HomeNavbar />
      </div>

      <div className="flex justify-between mx-10 mt-10 ">
        <div className=" w-[40%] border-4">
          <div className="text-white">
            <table className="text-center border-separate border-spacing-4  w-full">
              <tr className="bg-slate-800">
                <th className="border border-slate-600 p-2">Roles</th>
                <th className="border border-slate-600 p-2">
                  Reputation Points
                </th>
                <th className="border border-slate-600 p-2">Eligibility</th>
              </tr>
              <tr className="bg-slate-600">
                <td className="border border-slate-600">Moderator</td>
                <td className="border border-slate-600">20</td>
                <td className="border border-slate-600">Yes</td>
              </tr>
              <tr className="bg-slate-600">
                <td className="border border-slate-600">Contributor</td>
                <td className="border border-slate-600">2</td>
                <td className="border border-slate-600">Yes</td>
              </tr>
              <tr className="bg-slate-600">
                <td className="border border-slate-600">Classic Member</td>
                <td className="border border-slate-600">0</td>
                <td className="border border-slate-600">No</td>
              </tr>
            </table>
          </div>

          <div className="mt-20 text-white">
            <table className="text-center border-separate border-spacing-4  w-full">
              <tr className="bg-slate-800">
                <th className="border border-slate-600 p-2">UserName</th>
                <th className="border border-slate-600 p-2">Address</th>
                <th className="border border-slate-600 p-2">Role</th>
                <th className="border border-slate-600 p-2">Loan</th>
                <th className="border border-slate-600 p-2">
                  Registration Date
                </th>
              </tr>
              <tr className="bg-slate-600">
                <td className="border border-slate-600">Crazy Eagle</td>
                <td className="border border-slate-600">0x1245</td>
                <td className="border border-slate-600">Contributor</td>
                <td className="border border-slate-600">Yes</td>
                <td className="border border-slate-600">5th May</td>
              </tr>
              <tr className="bg-slate-600">
                <td className="border border-slate-600">Desi Coder</td>
                <td className="border border-slate-600">0xAbc</td>
                <td className="border border-slate-600">Member</td>
                <td className="border border-slate-600">No</td>
                <td className="border border-slate-600">5th May</td>
              </tr>
              <tr className="bg-slate-600">
                <td className="border border-slate-600">Hulk</td>
                <td className="border border-slate-600">0xBcd</td>
                <td className="border border-slate-600">Member</td>
                <td className="border border-slate-600">No</td>
                <td className="border border-slate-600">5th May</td>
              </tr>
            </table>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="float-right mr-32">
            <a href="">
              <FaDiscord className="text-5xl" />
            </a>
            <button className="text-white bg-black p-2 px-6 rounded-lg mt-6">
              Endorse
            </button>
            <h3 className="text-xl mt-6">Name: Desi Coder</h3>
            <h3 className="text-xl ">Address: 0xAbc</h3>
            <button className="text-white bg-black p-2 px-6 rounded-lg mt-6">
              Add a new role
            </button>{" "}
            <br />
            <button className="text-white bg-black p-2 px-6 rounded-lg mt-32">
              Unseake
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </main>
  );
};

export default Community;
