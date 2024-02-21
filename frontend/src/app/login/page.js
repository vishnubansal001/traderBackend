"use client";

import React, { useState } from "react";
import Image from "next/image";
import login from "../../Assests/login.svg";
import baseUrl from "@/Constants/baseUrl";
import axios from "axios";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
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
      console.log(formdata);
      const { data } = await axios.post(`${baseUrl}/auth/login`, formdata);
      localStorage.setItem("token", data.token);
      await axios.post(`${baseUrl}/auth/about`, { token: data.token }).then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }).catch((err) => {
            console.log(err);
          });
      toast.success("user login successfully");
      window.location.reload();
      router.push("/admin");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
