"use client";
import { useEffect, useState } from "react";
import Card from "../../Components/CardComponent";
import Card2 from "../../Components/Cardsforother";
import Activitycomp from "@/Components/Activitycomp";
import axios from "axios";
import Activitycomp1 from "@/Components/Activitycomp1";

const Page = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");

      const getReq = async () => {
        if (!token) {
          return;
        }
        console.log(token);
        const res = await axios.post(`${baseUrl}/event/history`, {
          token,
        });
        setData(res.data);
        console.log(res.data);
      };

      getReq();
    }
  }, []);
  return (
    <main className="flex flex-col w-[60%] mx-auto p-8">
      <Card data={data} />
      <section className="py-8 h-fit w-full">
        <div className="text-4xl font-semibold">
          <p className="border-b-2 w-fit border-orange-500">Assests</p>
        </div>
        <div className="scrollbar overflow-x-scroll flex gap-4 mt-8">
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </section>
      <section className="py-8 h-fit w-full">
        <div className="text-4xl font-semibold">
          <p className="border-b-2 w-fit border-orange-500">Activity</p>
        </div>
        <div className="scrollbar overflow-x-scroll flex flex-col gap-4 mt-8">
          {data?.history?.history.map((item, ind) => (
            <Activitycomp key={ind} data={item} />
          ))}
          {data?.history?.requests.map((item, ind) => (
            <Activitycomp1 key={ind} data={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
