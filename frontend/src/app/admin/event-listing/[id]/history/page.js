"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { useParams } from "next/navigation";

const Log = ({ ind, data }) => {
  const dateTime = data.createdAt.split(/[T.]/);
  return (
    <div className="w-full rounded-xl border border-white hover:border-orange-500 h-16 flex justify-around items-center">
      <div className=" flex items-end">
        <p className="mb-4">{ind + 1}.</p>
      </div>
      <div>
        <p className="text-center">Transaction</p>
        <p>{data.transactionId}</p>
      </div>
      <div>
        <p className="text-center">Transaction</p>
        <p>{data?.sender}</p>
      </div>
      <div>
        <p className="text-center">Date & Time</p>
        <div className="flex flex-wrap w-36 justify-between">
          <p>{dateTime[0]}</p>
          <p>{dateTime[1]}</p>
        </div>
      </div>
      <div>
        <p className="text-center">Amount</p>
        <p>{data.amount}/-</p>
      </div>
    </div>
  );
};

const Page = () => {
  const params = useParams();
  const [logs, setLogs] = useState([]);
  const { id } = params;

  useEffect(() => {
    async function allfetching() {
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.post(`${baseUrl}/transaction/${id}`,{
            token: token,
          });
          setLogs(res?.data?.transactions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    allfetching();
  }, []);

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="text-center text-3xl md:text-5xl font-semibold">
        <p>History</p>
      </div>
      <div className="flex items-center flex-col justify-center gap-3 pb-[8rem] md:pb-0">
        {logs?.map((log, index) => (
          <Log key={index} ind={index} data={log} />
        ))}
        {logs.length === 0 && <p>No history found</p>}
      </div>
    </div>
  );
};

export default Page;
