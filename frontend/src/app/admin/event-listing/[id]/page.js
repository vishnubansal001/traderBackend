"use client";

import React, { useEffect, useState } from "react";
import baseUrl from "@/Constants/baseUrl";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Card = ({ data }) => {
  const [departmentHead, setDepartmentHead] = useState();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      async function fetchUserName() {
        const departmentAdmin = await axios.post(
          `${baseUrl}/admin/users/${data.departmentHead}`,
          { token: token }
        );
        console.log(departmentAdmin);
        setDepartmentHead(() => departmentAdmin.data.usr);
      }

      fetchUserName();
    }
  }, [data]);

  return (
    <div className="relative group bg-back noise-panel rounded-sm shadow-lg drop-shadow-sm border-[1px] border-[#222222] py-4 w-96 p-5 gap-2  hover:border-orange-500">
      <div className="flex gap-2 bg-transparent w-full">
        <div className="w-full  bg-transparent">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Department Name:{" "}
          </p>
        </div>
        <div className="w-full bg-transparent flex justify-end">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            {data.name}
          </p>
        </div>
      </div>
      <div className="flex gap-2 bg-transparent w-full">
        <div className="w-full  bg-transparent">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Description:{" "}
          </p>
        </div>
        <div className="w-full bg-transparent flex justify-end">
          <p className=" bg-transparent text-right lg:text-base sm:text-sm text-xs">
            {data.description}
          </p>
        </div>
      </div>
      <div className="flex gap-2 bg-transparent w-full">
        <div className="w-full  bg-transparent">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Department Admins:{" "}
          </p>
        </div>
        <div className="w-full bg-transparent flex justify-end">
          <p className="break-words bg-transparent lg:text-base sm:text-sm text-xs">
            {departmentHead?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [executives, setExecutives] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const executivesResponse = await axios.post(
          `${baseUrl}/admin/executives`,
          { token: token }
        );
        console.log(executivesResponse);
        setExecutives(executivesResponse.data.executives);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);
  const [departments, setDepartments] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function fetchDepartments() {
      const departments = await axios.get(`${baseUrl}/event/${id}/departments`);
      setDepartments(departments.data.departments);
    }
    fetchDepartments();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    executiveId: "",
    token: "",
  });

  const { name, description, executiveId } = formData;
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    formData.token = token;
    try {
      const department = await axios.post(
        `${baseUrl}/event/${id}/department`,
        formData
      );
      console.log(department);
      toast.success("Created Department");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="p-8 flex flex-col items-center">
      <div className="text-5xl font-semibold">
        <p>Department Creation</p>
      </div>
      <div className="mt-8 w-full overflow-x-scroll flex gap-5 py-5 scrollbar">
        {departments && departments.length > 0 ? (
          departments?.map((item) => <Card key={item._id} data={item} />)
        ) : (
          <p>No Department Created</p>
        )}
      </div>
      <div className="w-fit mt-10 space-y-2">
        <div>
          <label htmlFor="name">Department Name</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Enter Department Name"
            className="bg-white text-black py-2 px-3 w-72"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="name">Department Admin</label>
        </div>
        <div>
          <select
            type="text"
            name="executiveId"
            id="executiveId"
            value={executiveId}
            placeholder="Enter executiveId"
            className="bg-white text-black py-2 px-3 w-72"
            onChange={onChange}
          >
            <option value="" disabled>
              Select Admin
            </option>
            {(executives && executives.length) > 0 ? (
              executives?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading...
              </option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="name">Department Descrption</label>
        </div>
        <div>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            placeholder="Enter Department Description"
            className="bg-white text-black py-2 px-3 w-72"
            onChange={onChange}
          />
        </div>
        <div className="">
          <button
            type="submit"
            onClick={onSubmit}
            className="w-full mt-5 bg-orange-600 hover:bg-orange-700 focus:bg-orange-800  py-2 px-3 rounded-md"
          >
            Create Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
