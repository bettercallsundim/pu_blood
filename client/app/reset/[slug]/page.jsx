"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page({ params }) {


  const [password, setPassword] = useState("");
  const router = useRouter();


  async function submitInput(e) {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:4000/auth/reset/${params.slug}`,
        { password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast("Reset password done !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="idno"
                  className="block mb-2 text-sm font-medium  dark:text-white"
                >
                  Your password :
                </label>
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                ></input>
              </div>

              <button
                onClick={submitInput}
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Request for reset password
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
