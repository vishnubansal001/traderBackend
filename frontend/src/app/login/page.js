"use client";

import React, { useState } from "react";
import Image from "next/image";
import login from "../../Assests/login.svg";
import axios from "axios";

const Page = () => {
  const [formdata, setFormdata] = useState({
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
      const { data } = await axios.post(`${baseUrl}/auth/login`, formdata);
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" md:pt-0 pt-[8rem] w-full md:w-[60%] mx-auto p-8">
      <div className="flex flex-col items-center w-full">
        <div className="w-[20rem] h-[20rem]">
          <Image src={login} alt="login svg" className="w-full h-full" />
        </div>
        <div className="w-[50%] mt-8 gap-4 flex flex-col items-center justify-center">
          <div className="w-full">
            <div>
              <label htmlFor="email">Email: </label>
            </div>
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              placeholder="email"
              type="text"
              name="email"
              id="email"
              onChange={onChange}
            />
          </div>
          <div className="w-full">
            <div>
              <label htmlFor="Password">Password: </label>
            </div>
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={onChange}
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-orange-600 hover:bg-orange-700 focus:bg-orange-800 py-3 mt-2 w-full"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
