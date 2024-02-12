"use client";

import React, { useEffect, useState } from "react";
import EventsCard from "@/Components/EventsCard";
import axios from "axios";

const Page = () => {
  const [hover, setHover] = useState(false);
  const [event, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const events = await axios.get("http://localhost:4545/event");
      console.log(events);
      setEvents(events.data.events);
    };
    fetchData();
  }, []);
  return (
    <div className=" w-[60%] mx-auto p-8">
      <div className="">
        {event?.map((event) => (
          <EventsCard event={event} />
        ))}
      </div>
    </div>
  );
};

export default Page;
