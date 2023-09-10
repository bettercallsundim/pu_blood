"use client";
import React, { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateConfig } from "next/dist/server/config-shared";
import axios from "axios";
import { toggleDark } from "../redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Navbar() {
  const { dark } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const router = useRouter();
  function handleDark() {
    dispatch(toggleDark());
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
  const handleLogout = async () => {
    await axios
      .get(`http://localhost:4000/auth/signout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert(res.data.message);
          localStorage.removeItem("token");
          router.push("/signin");
        }
      });
  };
  return (
    <div className="flex items-center justify-between bg-slate-100 text-rose-600 font-medium py-4 px-6">
      <div className="logo">PU Blood</div>
      <ul className="links flex items-center gap-x-4">
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/donors">Donors</Link>
        </li>
        <li>
          <button onClick={handleLogout} href="/donors">
            Log Out
          </button>
        </li>
        <li>
          <button onClick={handleDark} href="/donors">
            {dark ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
        </li>
      </ul>
    </div>
  );
}
