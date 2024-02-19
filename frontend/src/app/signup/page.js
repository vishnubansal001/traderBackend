"use client";

import React, { useState } from "react";
import Image from "next/image";
import login from "@/Assests/login.svg";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { toast } from "react-toastify"

const Page = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  function onChange(e) {
    setFormdata((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/auth/register`, formdata);
      setFormdata({
        name: "",
        email: "",
        password: "",
      })
      toast.success("user registered successfully");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className=" w-[60%] mx-auto p-8">
      <div className=" flex flex-col items-center">
        <div className=" w-[50%] h-[40%]">
          <Image src={login} alt="login svg" />
        </div>
        <div className="w-[50%] mt-8 space-y-5">
          <div>
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              placeholder="email"
              type="email"
              name="email"
              id="email"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={onChange}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-green-600 hover:bg-green-700 focus:bg-green-800 py-3  w-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
