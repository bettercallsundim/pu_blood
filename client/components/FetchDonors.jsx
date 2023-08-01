"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addDonors } from "../redux/donorSlice";
export default function fetchDonors() {
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();
  const donors = useSelector((state) => state.donors.data);
  // console.log(donors);
  async function fetching() {
    const res = await fetch(`http://localhost:4000/blood/getDonors`, {
      credentials: "include",
    });
    const data = await res.json();

    return data.data;
  }
  useEffect(() => {
    async function hello() {
      const res = await fetching();
      // setArr(res);
      dispatch(addDonors(res));
    }
    hello();
  }, []);
  return (
    <div className="px-8 min-h-screen pt-10 bg-gray-200">
      <div>
        <h1 className="text-2xl">
          List of the all donors who are interested to donate :{" "}
        </h1>
        <table className="min-w-full mt-8 text-xl">
          {donors?.length > 0 && (
            <tr className="text-rose-700 font-bold">
              <td>Batch</td>
              <td>ID No.</td>
              <td>Blood Group</td>
            </tr>
          )}
          {donors?.length > 0 &&
            donors.map((elm) => (
              <tr key={elm.idno}>
                <td>
                  {elm.batch}
                  <sub>st</sub>
                </td>
                <td>{elm.idno}</td>
                <td>{elm.bgroup}</td>
              </tr>
            ))}
        </table>
      </div>
      {donors?.length == 0 && <Loader />}
    </div>
  );
}
