"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../Assests/Kim Seon Ho - Link 1.png";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";

const Profile = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = () => {
      const token = localStorage.getItem("token");
      axios
        .post(`${baseUrl}/auth/about`, { token })
        .then((res) => {
          setData(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="w-[20%] px-5 py-12 border-l border-orange-500 fixed right-0 h-full">
      <div className="h-full">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p>Trader Profile</p>
          </div>
          <div className="rounded-full w-fit overflow-hidden mx-auto">
            <Image src={profile} />
          </div>
          <div className="text-center">
            <p>{data?.user?.name}</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="text-gray-400 gap-4">
            <div className="text-orange-500">
              <p>Account</p>
            </div>
            <div className="lg:text-base text-sm flex justify-between gap-2">
              <p>Team Name</p>
              <p className="">{data?.user?.teamId?.name}</p>
            </div>
            <div className="lg:text-base text-sm flex justify-between gap-2">
              <p>Balance</p>
              <p className="">₹ {data?.user?.teamId?.amount}/-</p>
            </div>
          </div>
          <hr className="mt-8" />
          <div className="mt-8">
            <div>
              <p>Team Members</p>
            </div>
            <div className="px-5 mt-4 text-gray-400">
              <ol type="1" style={{ listStyleType: "decimal" }}>
                {data?.user?.teamId?.teamMembers > 0 ? (
                  data.user.teamId.teamMembers.map((member) => (
                    <li key={member._id}>{member.name}</li>
                  ))
                ) : (
                  <p>No members added yet</p>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
