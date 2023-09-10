"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const initInput = {
    idno: 0,
    batch: 0,
    bgroup: "",
    password: "",
    email: "",
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [input, setInput] = useState(initInput);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function submitInput(e) {
    e.preventDefault();
    console.log(input);
    console.log("why");
    const res = await axios.post("http://localhost:4000/auth/signup", input, {
      withCredentials: true,
    });
    setInput(initInput);
    router.push("/signin");
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
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
                  placeholder="1000"
                  required
                ></input>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  dark:text-white"
                >
                  Your email :
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1000"
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
              <div>
                <label
                  for="bgroup"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select your blood group
                </label>
                <select
                  onChange={handleChange}
                  name="bgroup"
                  id="bgroup"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <button
                onClick={submitInput}
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
