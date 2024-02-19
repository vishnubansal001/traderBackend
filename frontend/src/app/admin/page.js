"use client";
import Table from "@/Components/admin/Table";
import React from "react";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { toast } from "react-toastify"

const Page = () => {
  const [data, setDate] = React.useState([]);
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      axios
        .post(`${baseUrl}/admin/users`, { token:token })
        .then((res) => {
          setDate(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("User fetch failed");
        });
    }
  }, []);
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div className="text-5xl font-semibold">
        <p>Admin Users</p>
      </div>
      {/* <div className="w-full flex justify-between">
        <div>
          <p>Username</p>
        </div>
        <div>
          <select
            name="Role"
            id="Role"
            className="bg-white text-black py-2 px-4 rounded-sm"
          >
            <option className="text-white" value="Junior">
              Junior Admin
            </option>
            <option className="text-white" value="executive">
              Executive Admin
            </option>
          </select>
        </div>
        <div>
          <select
            name="Department"
            id="Department"
            className="bg-white text-black py-2 px-4 rounded-sm"
          >
            <option className="text-white" value="it">
              It Department
            </option>
            <option className="text-white" value="accounts">
              Accounts Department
            </option>
          </select>
        </div>
      </div> */}
      <Table data={data} />
    </div>
  );
};

export default Page;
