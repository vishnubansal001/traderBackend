"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { toast } from "react-toastify"

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push(`${id}/login`);
  }, []);
  const [formData, setFormData] = useState({
    quantity: 1,
    reason: "",
    subject: "",
  });
  const params = useParams();
  const { id, departmentId } = params;
  const { quantity, reason, subject } = formData;
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }
  function onSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .post(`${baseUrl}/request`, {
        subject,
        amount: quantity,
        reason,
        department: departmentId,
        token,
      })
      .then((res) => {
        toast.success("Request submitted successfully");
        router.push(`/history`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Request unsucessful try again");
        router.push(`/events/${id}/dashboard`);
      });
  }
  return (
    <div className="md:pt-8 pt-[8rem] w-full md:w-[60%] mx-auto p-8">
      <div>
        <div className="w-full flex justify-center text-5xl font-bold">
          <div>
            <p>Welcome </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-10 text-2xl space-y-5 font-semibold">
          <div className="w-[50%]">
            <p>Enter the Subject for purchasing:</p>
          </div>
          <div className="w-[50%]">
            <input
              type="text"
              id="subject"
              onChange={onChange}
              value={subject}
              name="subject"
              className="bg-white text-black text-2xl font-light py-2 px-3 w-full"
            />
          </div>
          <div className="w-[50%]">
            <p>Enter the quantity for purchasing:</p>
          </div>
          <div className="w-[50%]">
            <input
              type="number"
              id="quantity"
              onChange={onChange}
              value={quantity}
              name="quantity"
              className="bg-white text-black text-2xl font-light py-2 px-3 w-full"
            />
          </div>
          <div className="w-[50%]">
            <p>Enter the Reason for purchasing:</p>
          </div>
          <div className="w-[50%]">
            <input
              type="text"
              id="reason"
              onChange={onChange}
              value={reason}
              name="reason"
              className="bg-white text-black text-2xl font-light py-2 px-3 w-full"
            />
          </div>
          <div className="w-[50%]">
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-orange-600 w-full text-xl py-2 px-3 font-light hover:bg-orange-700 focus:bg-orange-800 "
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
