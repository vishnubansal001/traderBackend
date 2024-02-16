"use client";

import React, { useState } from "react";
import Image from "next/image";
import testing from "../../../Assests/testing.jpeg";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const Card = () => {
  const [hover, setHover] = useState(false);
  const id = "fjhdgdfjhdsagfkhjsdhf";
  const router = useRouter();
  return (
    <div className="rounded-md overflow-hidden w-full border border-white hover:border-orange-500">
      <div
        className="w-full h-60 relative overflow-hidden duration-150 ease-in-out"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={testing}
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
                  router.push(`/admin/event-listing/${id}`);
                }}
              >
                View Event
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 w-full flex-col">
        <div className="flex items-center justify-between flex-row w-full px-3 py-1">
          <p>Event Name</p>
          <p>Event Name</p>
        </div>
        <div className="flex items-center justify-between flex-row w-full px-3 py-1">
          <p>Event Description</p>
          <p>Event Description</p>
        </div>
        <div className="flex items-center justify-between flex-row w-full px-3 py-1">
          <p>Event Date</p>
          <p>Event Date</p>
        </div>
        <div className="w-full flex justify-center bg-red-500 text-white hover:bg-transparent hover:border-t hover:border-orange-500 hover:text-red-500">
          <button>
            <MdDelete className="text-3xl bg-transparent" />
          </button>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="text-center text-3xl md:text-5xl font-semibold">
        Event Listing
      </div>
      <div className="grid pb-[8rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex justify-center">
          <Card />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default page;
