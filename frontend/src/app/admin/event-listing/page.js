"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { toast } from "react-toastify";

const Card = ({ data }) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const eventDelete = await axios.delete(`${baseUrl}/event/${id}`, {
        token: token });
      console.log(eventDelete);
      toast.success("Deleted Succesfully")
      window.location.reload();
    } catch (error) {
      toast.error("Failed")
      console.log(error);
    }
  };
  return (
    <div className="rounded-md overflow-hidden w-full border border-white hover:border-orange-500">
      <div
        className="w-full h-60 relative overflow-hidden duration-150 ease-in-out"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={data.poster}
          fill={true}
          className={`${
            hover && "scale-105"
          } transition-scale duration-200 ease-in object-fit w-full h-full`}
          alt="event poster"
        />
        {hover && (
          <div className="absolute w-full h-full bg-black/60 flex justify-center items-center">
            <div>
              <button
                className="bg-orange-500 rounded-lg hover:bg-orange-600 py-3 px-5 focus:bg-orange-700"
                onClick={() => {
                  router.push(`/admin/event-listing/${data._id}`);
                }}
              >
                Create Dept.
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 w-full flex-col">
        <div className="flex items-center justify-between flex-row w-full px-3 py-1">
          <p>Event Name</p>
          <p>{data.title}</p>
        </div>
        <div className="flex items-center flex-1 h-full justify-between flex-row w-full px-2 py-1">
          <p className="w-full text-center">{data.description}</p>
        </div>
        <div className="flex items-center justify-between flex-row w-full px-3 py-1">
          <p>Event Date</p>
          <p>{data.date.split("T")[0]}</p>
        </div>
        <div className="w-full">
          <button
            className="w-full py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800"
            onClick={() => {
              router.push(`/admin/event-listing/${data._id}/create-user`);
            }}
          >
            Create Users
          </button>
          <button
            className="w-full py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800"
            onClick={() => {
              router.push(`/admin/event-listing/${data._id}/teams`);
            }}
          >
            See Teams
          </button>
          <button
            className="w-full py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800"
            onClick={() => {
              router.push(`/admin/event-listing/${data._id}/history`);
            }}
          >
            history
          </button>
          <button
            className="w-full py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800"
            onClick={() => {
              router.push(`/admin/event-listing/${data._id}/request`);
            }}
          >
            requests
          </button>
          <div className="w-full flex justify-center bg-red-500 text-white hover:bg-transparent hover:border-t hover:border-orange-500 hover:text-red-500">
            <button>
              <MdDelete
                onClick={() => handleDelete(data._id)}
                className="text-3xl bg-transparent"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    async function fetchEvents() {
      const events = await axios.get(`${baseUrl}/event`);
      setEvents(() => events.data.events);
      console.log(events.data.events);
    }
    fetchEvents();
  }, []);
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="text-center text-3xl md:text-5xl font-semibold">
        Event Listing
      </div>
      <div className="grid pb-[8rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events?.map((item, index) => (
          <div key={index} className="flex justify-center">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
