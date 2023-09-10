"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
export default function CreatePost() {
  const queryClient = useQueryClient();

  const initState = {
    post: "",
    bgroup: "",
    phone: "",
    location: "",
    needBetweenDate: "",
    needBetweenTime: "",
  };
  const [state, setState] = useState(initState);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (param) => {
    return axios.post(`http://localhost:4000/blood/post`, param, {
      withCredentials: true,
    });
  };
  const { mutate } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    // onSuccess: (data) => {
    //   queryClient.setQueryData(["posts"], state);
    // },
  });

  return (
    <div className="bg-gray-200 text-black px-8 text-xl">
      <p className="mb-12 pt-16 text-3xl underline">Create Post :</p>
      <p className="flex">
        <span className="mr-2">Write post :</span>
        <textarea
          className="bg-gray-300 text-black rounded p-2 border-b-2 mb-4"
          onChange={handleChange}
          name="post"
          type="text"
        />
      </p>
      <p>
        <span className="mr-2">Location :</span>
        <input
          className="bg-gray-300 text-black rounded p-2 border-b-2 mb-4"
          onChange={handleChange}
          name="location"
          type="text"
        />
      </p>
      <p>
        <span>Blood Group : </span>
        <select
          className="bg-gray-300 text-black rounded p-2 border-b-2 mb-4"
          onChange={handleChange}
          name="bgroup"
        >
          <option selected>Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </p>
      <p>
        <span>Phone : </span>
        <input
          className="bg-gray-300 text-black rounded p-2 border-b-2 mb-4"
          onChange={handleChange}
          name="phone"
          type="number"
        />
      </p>
      <p>
        <span>Date : </span>
        <input
          className="bg-gray-300 text-black rounded p-2 border-b-2 mb-4"
          onChange={handleChange}
          type="date"
          name="needBetweenDate"
          id=""
        />
      </p>
      <p>
        <span>Time : </span>
        <input
          className="bg-gray-300 text-black rounded p-2 border-b-2 mb-4"
          onChange={handleChange}
          type="time"
          name="needBetweenTime"
          id=""
        />
      </p>
      <p>
        <button
          onClick={() => mutate(state)}
          className="bg-rose-600 px-3 py-2 text-white rounded-lg mt-4 text-md hover:bg-rose-700 duration-100 focus:scale-95"
        >
          Post
        </button>
      </p>
    </div>
  );
}
