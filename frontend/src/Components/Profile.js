"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../Assests/Kim Seon Ho - Link 1.png";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [data, setData] = useState({});
  const [token, setToken] = useState(null);
  const router = useRouter();
  

  useEffect(() => {
    const fetchData = () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        axios
          .post(`${baseUrl}/auth/about`, { token })
          .then((res) => {
            setData(res.data);
            setToken(localStorage.getItem("token"));
            localStorage.setItem("user", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchData();
  }, [token]);
  console.log(token);
  return (
    <div className="z-10 w-full bg-[#141414] md:w-[20%] md:px-5 p-4 md:py-12 border-b md:border-b-0 md:border-l border-orange-500 fixed top-0 md:right-0 md:h-full">
      <div className="w-full h-full flex flex-row md:flex-col gap-6 items-start justify-start">
        <div className="w-[100%] text-sm md:text-base flex flex-col gap-2">
          <div className="text-center">
            <p>Trader Profile</p>
          </div>
          <div className="rounded-full w-fit overflow-hidden mx-auto">
            <Image
              src={profile}
              alt="profile"
              className="md:w-16 md:h-16 h-10 w-10"
            />
          </div>
          <div className="text-center">
            <p>{data?.user?.name}</p>
          </div>
        </div>
        <div className="w-[100%] flex md:flex-col text-sm md:text-base flex-row gap-4">
          <div className="w-max text-gray-400 flex flex-col gap-2">
            <div className="text-orange-500">
              <p>Account</p>
            </div>
            <div className="flex flex-col">
              <div className="lg:text-base text-sm flex justify-between gap-2">
                <p>Team Name</p>
                <p className="">{data?.user?.teamId?.name}</p>
              </div>
              <div className="lg:text-base text-sm flex justify-between gap-2">
                <p>Balance</p>
                <p className="">₹ {data?.user?.teamId?.amount}/-</p>
              </div>
            </div>
          </div>
          <hr className=" bg-white text-white md:rotate-0 rotate-90" />
        </div>
        <div className="w-[100%] flex md:flex-col h-full justify-between text-sm md:text-base flex-row gap-4">
          <div className="w-max flex flex-col gap-2 max-[470px]:hidden">
            <div>
              <p>Team Members</p>
            </div>
            <div className=" text-gray-400">
              <ol
                type="1"
                className="list-inside"
                style={{ listStyleType: "decimal" }}
              >
                {console.log(data?.user?.teamMembers)}
                {data?.user?.teamMembers.length > 0 ? (
                  data.user.teamMembers.map((member) => (
                    <li key={member._id}>{member.name}</li>
                  ))
                ) : (
                  <p>No members added yet</p>
                )}
              </ol>
            </div>
          </div>
          <div>
            {token && (
              <button
                className="md:w-full w-20 bg-white text-black py-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  router.push("/");
                }}
              >
                Log Out
              </button>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
