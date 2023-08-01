import React from "react";
import CreatePost from "components/CreatePost";
import FetchPosts from "components/FetchPosts";
import Navbar from "../../components/Navbar";
export default function posts() {
  return (
    <div>
      <Navbar />
      <CreatePost />
      <FetchPosts />
    </div>
  );
}
