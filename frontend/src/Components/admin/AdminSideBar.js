"use client";

import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { TbHistory } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";

const AdminSideBar = () => {
  const router = useRouter();
  const path = usePathname();
  const pathfinal = path.slice(1);
  const [clicked, setClicked] = useState({
    admin: pathfinal == "admin" ? true : false,
    "create-event": pathfinal == "admin/create-event" ? true : false,
    "event-listing": pathfinal == "admin/event-listing" ? true : false,
    // requests: pathfinal == "admin/request" ? true : false,
    // history: pathfinal == "admin/history" ? true : false,
    settings: pathfinal == "settings" ? true : false,
  });
  function onSet(id) {
    const updatedSelected = {
      admin: false,
      // requests: false,
      "create-event": false,
      "event-listing": false,
      // history: false,
      settings: false,
    };
    updatedSelected[id] = true;

    setClicked(updatedSelected);
  }
  return (
    <div className="z-10 bg-[#141414] md:min-h-screen w-full md:w-[20%] text-white flex flex-col gap-6 p-4 md:px-8 md:py-5 border-t md:border-t-0 md:border-r border-orange-500 fixed bottom-0 md:left-0">
      <div className="flex items-center justify-center lg:flex-row flex-col">
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 rotate-45 bg-orange-500"></div>
          <div className="w-5 h-5 rotate-45 border border-white relative -left-3 bg-transparent"></div>
        </div>
        <p className="text-center">Traders Portal</p>
      </div>
      <div className="gap-2 w-full flex flex-row md:flex-col items-center justify-center">
        <div
          className={`w-full justify-center cursor-pointer flex items-center p-2 md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.admin && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("admin");
            router.push("/admin");
          }}
        >
          <GrHomeRounded className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p>Admin</p>
          </div>
        </div>
        <div
          className={`w-full justify-center cursor-pointer flex items-center p-2 md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked["create-event"] && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("create-event");
            router.push("/admin/create-event");
          }}
        >
          <MdOutlineEmojiEvents className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p>Create Event</p>
          </div>
        </div>
        <div
          className={`w-full justify-center cursor-pointer flex items-center p-2 md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked["event-listing"] && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("event-listing");
            router.push("/admin/event-listing");
          }}
        >
          <GrGroup className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p>Event Listing</p>
          </div>
        </div>
        {/* <div
          className={`w-full justify-center cursor-pointer flex items-center p-2 md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.requests && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("requests");
            router.push("/admin/request");
          }}
        >
          <TbHistory className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p>Requests</p>
          </div>
        </div> */}
        {/* <div
          className={`w-full justify-center cursor-pointer flex items-center p-2 md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.history && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("history");
            router.push("/admin/history");
          }}
        >
          <TbHistory className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p>History</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminSideBar;
