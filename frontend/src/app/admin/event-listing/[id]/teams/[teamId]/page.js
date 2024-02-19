"use client";

import React, { useState } from "react";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const params = useParams();
  const { id, teamId } = params;
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    amount: 0,
    token: "",
  });

  const { amount } = formdata;

  function onChange(e) {
    if (e.target.files) {
      // If the input is a file input
      setFormdata((prev) => ({
        ...prev,
        [e.target.id]: e.target.files[0], // Set the poster property to the selected file
      }));
    } else {
      // If the input is not a file input
      let boolean = null;
      if (e.target.value === "true") {
        boolean = true;
      }
      if (e.target.value === "false") {
        boolean = false;
      }
      setFormdata((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      const formdataWithtoken = {
        amount: formdata.amount,
        token: token,
      };
      console.log(formdataWithtoken);
      const response = await axios
        .post(`${baseUrl}/transaction/${id}/${teamId}`, formdataWithtoken)
        .then((res) => {
          setFormdata({
            amount: 0,
            token: "",
          });
        });
      console.log(response);
      toast.success("Transaction done");
    } catch (error) {
      console.log(error);
      toast.error("Transaction Failed");
    }
  }

  return (
    <div className="p-8 md:w-auto w-full pb-[4rem] flex items-center flex-col gap-3">
      <div className="text-3xl md:text-5xl font-semibold text-center md:mt-10">
        <p>Create Request</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-max flex flex-col gap-4">
          <div>
            <label htmlFor="title">Amount To be added:</label>
            <div>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                className="bg-white text-black py-2 px-3 w-64"
                placeholder="Amount"
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-orange-500 w-full py-2 px-3 hover:bg-orange-600 focus:bg-orange-700"
            >
              Create Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
