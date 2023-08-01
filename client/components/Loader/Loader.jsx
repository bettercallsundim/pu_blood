import React from "react";
import loader from "./loader.gif";
import Image from "next/image";
export default function Loader() {
  return (
    <div>
      <Image src={loader} alt="loader" width={50} height={50} />
    </div>
  );
}
