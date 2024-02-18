"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EventsCard = ({ event }) => {
  const [hover, setHover] = useState(false);
  const date = new Date(event.date);
  const router = useRouter();
  return (
    <>
      <div className="duration-500 ease-in-out bg-transparent flex flex-col gap-2 text-3xl justify-center items-center p-5">
        <div className="bg-transparent text-4xl flex items-center gap-2 justify-center flex-col">
          <p className="bg-transparent">{event.title}</p>
          <div className="bg-transparent text-base flex items-center justify-center">
            <p className="bg-transparent">{date.toDateString()}</p>
          </div>
          <div className="bg-transparent text-base flex items-center text-center justify-center">
            <p className="bg-transparent">{event.description}</p>
          </div>
        </div>
        <div
          className="w-96 h-96 relative rounded-md overflow-hidden hover:border hover:border-orange-500 transition ease-in duration-200"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Image src={event.poster} fill={true} alt="event poster" />
          {hover && (
            <div className="h-full w-full bg-black/60 absolute">
              <div className="flex h-full bg-transparent justify-center items-center">
                <div className="bg-transparent transition-all">
                  <button
                    className="w-fit bg-orange-500 py-2 px-8 transition-all text-base border border-transparent hover:bg-transparent hover:border-orange-500 rounded-md"
                    onClick={() => router.push(`events/${event._id}`)}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-transparent w-full pt-8 flex items-center justify-center">
        <p className="bg-transparent text-base">ALL THE BEST ✨</p>
      </div>
    </>
  );
};

export default EventsCard;
