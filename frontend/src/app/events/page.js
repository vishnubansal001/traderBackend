"use client";

import React, { useEffect, useState } from "react";
import EventsCard from "@/Components/EventsCard";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";

const Page = () => {
  const [hover, setHover] = useState(false);
  const [event, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const events = await axios.get(`${baseUrl}/event`);
      console.log(events);
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("events", JSON.stringify(events.data.events));
      }
      setEvents(events.data.events);
    };
    fetchData();
  }, []);
  return (
    <div className=" md:pt-0 pt-[8rem] w-full md:w-[60%] mx-auto p-8">
      <div className="">
        {event?.map((event, index) => (
          <EventsCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Page;
