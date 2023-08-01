"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateConfig } from "next/dist/server/config-shared";
import axios from "axios";
export default function Navbar() {
  const router = useRouter();
  const handleLogout = async () => {
    await axios
      .get(`http://localhost:4000/auth/signout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert(res.data.message);
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
      </ul>
    </div>
  );
}
