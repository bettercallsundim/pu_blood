import React from "react";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
// import { MdOutlineBloodtype } from "react-icons/md";
export default function page() {
  return (
    <div className="dark:bg-black dark:text-white">
      <Navbar />
      <div className="hero relative px-10 min-h-screen ">
        <div className="mt-20">
          <Typography className="text-gray-800" variant="h1">
            One stop <br></br>
            blood source.
          </Typography>
          <button className="bg-rose-600 px-6 py-3 text-white rounded-lg mt-8 text-xl">
            Get Started
          </button>
        </div>
        <div className="w-[700px] absolute right-0 top-[-200px] -z-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#fcb6b6"
              d="M69.8,-18.9C78.9,5.2,66.6,40,42,57.8C17.4,75.7,-19.5,76.7,-42.2,59.7C-65,42.8,-73.6,8.1,-64.2,-16.4C-54.8,-40.9,-27.4,-55.2,1.5,-55.7C30.4,-56.2,60.8,-42.9,69.8,-18.9Z"
              transform="translate(100 100)"
            />
          </svg>
          <div className="width-[300px]  absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img className="" src="./blood-drop.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
