"use client";

import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { TbHistory } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";

const SideNavigationBar = () => {
  const router = useRouter();
  const path = usePathname();
  const pathfinal = path.slice(1);
  const [clicked, setClicked] = useState({
    home: pathfinal == "" ? true : false,
    events: pathfinal == "events" ? true : false,
    contactus: pathfinal == "contactus" ? true : false,
    history: pathfinal == "history" ? true : false,
    settings: pathfinal == "settings" ? true : false,
  });
  function onSet(id) {
    const updatedSelected = {
      home: false,
      events: false,
      contactus: false,
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
      <div className="mt-10 gap-2 w-full flex flex-col items-center justify-center">
        <div
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.home && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("home");
            router.push("/");
          }}
        >
          <GrHomeRounded className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p className="">Home</p>
          </div>
        </div>
        <div
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.events && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("events");
            router.push("/events");
          }}
        >
          <MdOutlineEmojiEvents className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p className="">Events</p>
          </div>
        </div>
        <div
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.contactus && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("contactus");
            router.push("/contactus");
          }}
        >
          <GrGroup className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p className="">Contact Us</p>
          </div>
        </div>
        <div
          className={`w-full justify-center cursor-pointer flex items-center md:px-5 md:py-3 rounded-lg gap-2 ${
            clicked.history && "border border-orange-500"
          }`}
          onClick={() => {
            onSet("history");
            router.push("/history");
          }}
        >
          <TbHistory className="w-4 h-4 lg:w-6 lg:h-6" />
          <div className="lg:flex hidden w-full items-center">
            <p className="">History</p>
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
            <p className="">Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigationBar;
