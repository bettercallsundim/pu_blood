"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const initInput = {
    idno: 0,
    batch: 0,
    password: "",
  };

  const [input, setInput] = useState(initInput);
  const router = useRouter();
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  async function handleGoogle(e) {
    e.preventDefault();
    await axios.get("http://localhost:4000/auth/google");
  }

  async function submitInput(e) {
    e.preventDefault();
    console.log(input);
    console.log("why");
    await axios
      .post("http://localhost:4000/auth/signin", input, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          toast("Logged In Successfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          router.push("/home");
        }
      });
  }
  async function handleLocal(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/auth/local_login", input, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          router.push("/home");
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
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="idno"
                  className="block mb-2 text-sm font-medium  dark:text-white"
                >
                  Your ID (last 4 digit) :
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="idno"
                  id="idno"
                  className="sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                ></input>
              </div>
              <div>
                <label
                  htmlFor="batch"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Batch :
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="batch"
                  id="batch"
                  placeholder="Ex. 60"
                  className="bg-gray-50 border block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                ></input>
              </div>

              <button
                onClick={submitInput}
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Sign In
              </button>
              <button
                onClick={handleLocal}
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Sign In With Local Strategy
              </button>
              <a
                href="http://localhost:4000/auth/google"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Sign In With Google
              </a>
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
