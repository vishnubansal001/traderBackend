"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";

const Card = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <div
      className="relative group bg-back noise-panel rounded-sm shadow-lg drop-shadow-sm border-[1px] border-[#222222] py-4 w-full h-full flex flex-col p-6 gap-4  hover:bg-[#191919]"
      onClick={() =>
        router.push(`/events/${params.id}/dashboard/department/${data._id}`)
      }
    >
      <div className="flex gap-2 bg-transparent">
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
      <div className="flex gap-2 bg-transparent">
        <div className="w-full  bg-transparent">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Description:{" "}
          </p>
        </div>
        <div className="w-full bg-transparent flex justify-end">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const params = useParams();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const getDepartments = async () => {
      const res = await axios.get(`${baseUrl}/event/${params.id}/departments`);
      console.log(res);
      setDepartments(res.data.departments);
    };
    getDepartments();
  }, []);
  return (
    <div className="md:pt-8 pt-[8rem] w-full md:w-[60%] mx-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {departments && departments.length > 0 ? (
          departments?.map((department, index) => (
            <div key={index} className="flex justify-center w-full h-full">
              <Card key={index} data={department} />
            </div>
          ))
        ) : (
          <p>No Department Listed</p>
        )}
      </div>
    </div>
  );
};

export default Page;
