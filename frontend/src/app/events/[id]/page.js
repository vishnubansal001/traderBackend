"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import login from "../../../Assests/login.svg";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "@/Constants/baseUrl";

const Page = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push(`/events/${id}/dashboard`);
    }
  }, []);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
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
  function onSubmit(e) {
    e.preventDefault();
    // try {
    axios
      .post(`${baseUrl}/auth/${id}/login`, formdata)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Login successful");
          window.location.reload();
          localStorage.setItem("token", res.data.token);
          router.push(`/events/${id}/dashboard`);
        } else {
          toast.error("Login failed");
        }
      })
      .catch((error) => {
        toast.error("something went wrong! check console");
      });
  }
  return (
    <div className="flex items-center justify-center w-full md:pt-8 pt-[8rem] md:w-[60%] mx-auto p-8">
      <div className="flex flex-col items-center w-full">
        <div className="w-[20rem] h-[20rem]">
          <Image src={login} alt="login svg" className="w-full h-full" />
        </div>
        <div className="w-[50%] mt-8 gap-4 flex flex-col items-center justify-center">
          <div className="w-full">
            <div>
              <label htmlFor="Username">Email: </label>
            </div>
            <input
              className="bg-white outline-orange-500 text-black px-3 w-full py-3"
              placeholder="Email"
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
              className="bg-orange-600 hover:bg-orange-700 focus:bg-orange-800 py-3 mt-2 w-full"
              onClick={onSubmit}
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
