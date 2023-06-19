import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="logo">PU Blood</div>
      <ul className="links flex items-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/posts">Posts</Link></li>
        <li><Link href="/donors">Donors</Link></li>
      </ul>
    </div>
  );
}
