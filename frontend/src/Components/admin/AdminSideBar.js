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
    history: pathfinal == "admin/history" ? true : false,
    settings: pathfinal == "settings" ? true : false,
  });
  function onSet(id) {
    const updatedSelected = {
      admin: false,
      "create-event": false,
      "event-listing": false,
      history: false,
      settings: false,
    };
    updatedSelected[id] = true;

    setClicked(updatedSelected);
  }
  return (
    <div className="min-h-screen w-[20%] text-white px-8 py-5 border-r border-orange-500 fixed left-0">
      <div className="flex items-center justify-center lg:flex-row flex-col">
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 rotate-45 bg-orange-500"></div>
          <div className="w-5 h-5 rotate-45 border border-white relative -left-3 bg-transparent"></div>
        </div>
        <p className="text-center">Traders Portal</p>
      </div>
      <div className="mt-10 space-y-2">
        <div
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
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
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
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
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
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
        <div
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
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
        </div>
        <div
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.settings && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("settings");
            router.push("/settings");
          }}
        >
          <IoSettingsOutline className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p>Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
