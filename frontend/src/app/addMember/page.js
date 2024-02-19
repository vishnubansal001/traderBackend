"use client";

import React, { useState } from "react";
import Image from "next/image";
import login from "../../Assests/login.svg";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { toast } from "react-toastify"

const Page = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
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
      if (
        !localStorage.getItem("token")
      ) {
        return;
      }

      // const event = JSON.parse(localStorage.getItem("events"));

      formdata.token = localStorage.getItem("token");
      const data = await axios.post(
        `${baseUrl}/auth/add-user`,
        formdata
      );
      console.log(data);
      setFormdata({
        name: "",
        email: "",
        password: "",
        token: "",
      });
      toast.success("Member added successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong check console!");
      console.log(error);
    }
  };
  return (
    <div className=" md:pt-0 pt-[8rem] w-full md:w-[60%] mx-auto p-8 ">
      <div className="gap-3 flex flex-col items-center">
        <div className="w-[50%] h-[40%]">
          <Image src={login} alt="login svg" />
        </div>
        <div className="w-[80%] max-w-3xl flex items-center pb-[8rem] justify-center gap-3 flex-col">
          <div className="w-full flex items-center justify-center">
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              onChange={onChange}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              placeholder="email"
              type="email"
              name="email"
              id="email"
              onChange={onChange}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={onChange}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-green-600 hover:bg-green-700 focus:bg-green-800 py-3 w-full"
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
