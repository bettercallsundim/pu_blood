"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../redux/postSlice";
export default function fetchDonors() {
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const handleDelete = async (id) => {
    await axios
      .post(
        `http://localhost:4000/blood/deletePost`,
        { _id: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async function fetching() {
    const res = await fetch(`http://localhost:4000/blood/getPosts`, {
      credentials: "include",
    });
    const data = await res.json();

    return data.data;
  }
  useEffect(() => {
    async function hello() {
      const res = await fetching();
      dispatch(addPosts(res));
    }
    hello();
  }, []);
  return (
    <div className="px-8 bg-gray-200 py-8">
      <hr />
      <div className="flex items-center gap-8">
        {posts?.length > 0 &&
          posts?.map((elm) => (
            <div className="bg-gray-200 shadow-gray-500 shadow-sm p-4 rounded  w-[500px]">
              <p>{/* <button onClick={handleEdit}>Edit</button> */}</p>
              <p><span className="bg-lime-600 text-black font-semibold px-2 rounded  ">Post Description :</span> {elm.post}</p>
              <p><span className="bg-lime-600 text-black font-semibold px-2 rounded  ">Location :</span> {elm.location}</p>
              <p><span className="bg-lime-600 text-black font-semibold px-2 rounded  ">Blood Group :</span> {elm.bgroup}</p>
              <p><span className="bg-lime-600 text-black font-semibold px-2 rounded  ">Need Between :</span> {elm.needBetween}</p>
              <p>
                <button onClick={() => handleDelete(elm._id)}>Delete</button>
              </p>
            </div>
          ))}{" "}
      </div>
      {posts?.length == 0 && <Loader /> && <p>No posts found </p>}
    </div>
  );
}
