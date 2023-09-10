"use client";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import Loader from "./Loader/Loader";
export default function fetchDonors() {
  const [sort, setSort] = React.useState("batch");

  const {
    isLoading: loading,
    isError: error,
    data: donors,
  } = useQuery({
    queryKey: ["donors", sort],
    queryFn: async () => {
      try{
        const res = await fetch(
          `http://localhost:4000/blood/getDonors?sort=${sort}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        return data.data;
      }catch(err){
        console.log(err)
      }
    },
    staleTime: 6000,
  });

  const handleSort = (event) => {
    setSort(event.target.value);
  };
  return (
    <div className="px-8 min-h-screen pt-10 bg-gray-200">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-2xl">
            List of the all donors who are interested to donate :{" "}
          </p>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort By"
              onChange={handleSort}
            >
              <MenuItem value="batch">Batch</MenuItem>
              <MenuItem value="idno">ID</MenuItem>
              {/* <MenuItem value="name">Name</MenuItem> */}
            </Select>
          </FormControl>
        </div>

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
      {loading && <Loader />}
    </div>
  );
}
