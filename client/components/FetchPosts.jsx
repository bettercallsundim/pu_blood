"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader/Loader";
export default function fetchDonors() {
  const queryClient = useQueryClient();

  // const [arr, setArr] = useState([]);
  // const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts.data);
  const handleDelete = async (id) => {
    return axios.post(
      `http://localhost:4000/blood/deletePost`,
      { _id: id },
      {
        withCredentials: true,
      }
    );
  };
  const {
    isLoading: loading,
    isError: error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:4000/blood/getPosts`, {
          credentials: "include",
        });
        const data = await res.json();
        return data.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const { mutate: remove } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  // async function fetching() {
  //   const res = await fetch(`http://localhost:4000/blood/getPosts`, {
  //     credentials: "include",
  //   });
  //   const data = await res.json();

  //   return data.data;
  // }
  // useEffect(() => {
  //   async function hello() {
  //     const res = await fetching();
  //     dispatch(addPosts(res));
  //   }
  //   hello();
  // }, []);
  return (
    <div className="px-8 bg-gray-200 py-8">
      <hr />
      {loading && <p>Loading...</p>}
      <div className="flex items-center gap-8">
        {posts?.length > 0 &&
          posts?.map((elm) => (
            <div className="bg-gray-200 shadow-gray-500 shadow-sm p-4 rounded  w-[500px]">
              <p>{/* <button onClick={handleEdit}>Edit</button> */}</p>
              <p>
                <span className="bg-lime-600 text-black font-semibold px-2 rounded  ">
                  Post Description :
                </span>{" "}
                {elm.post}
              </p>
              <p>
                <span className="bg-lime-600 text-black font-semibold px-2 rounded  ">
                  Location :
                </span>{" "}
                {elm.location}
              </p>
              <p>
                <span className="bg-lime-600 text-black font-semibold px-2 rounded  ">
                  Blood Group :
                </span>{" "}
                {elm.bgroup}
              </p>
              <p>
                <span className="bg-lime-600 text-black font-semibold px-2 rounded  ">
                  Need Between :
                </span>{" "}
                {elm.needBetween}
              </p>
              <p>
                <button onClick={() => remove(elm._id)}>Delete</button>
              </p>
            </div>
          ))}{" "}
      </div>
      {posts?.length == 0 && <Loader /> && <p>No posts found </p>}
    </div>
  );
}
