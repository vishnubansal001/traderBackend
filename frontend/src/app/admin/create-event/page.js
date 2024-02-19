"use client";

import React, { useState } from "react";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"


const Page = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    poster: {},
    date: "",
    teamSize: 1,
    token: "",
  });

  const { title, description, date, teamSize } = formdata;

  function onChange(e) {
    if (e.target.files) {
      // If the input is a file input
      setFormdata((prev) => ({
        ...prev,
        [e.target.id]: e.target.files[0], // Set the poster property to the selected file
      }));
    } else {
      // If the input is not a file input
      let boolean = null;
      if (e.target.value === "true") {
        boolean = true;
      }
      if (e.target.value === "false") {
        boolean = false;
      }
      setFormdata((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      const formdataWithtoken = {
        title: formdata.title,
        description: formdata.description,
        poster: formdata.poster,
        date: formdata.date,
        teamSize: formdata.teamSize,
        token: token,
      };
      console.log(formdataWithtoken);
      const response = await axios
        .post(`${baseUrl}/event`, formdataWithtoken, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setFormdata({
            title: "",
            description: "",
            poster: {},
            date: "",
            teamSize: 1,
            token: "",
          });
        });
        console.log(response);
      router.push("/admin/event-listing");
      toast.success("Event Created");
    } catch (error) {
      toast.error("Event Creation Failed")
      console.log(error);
    }
  }

  return (
    <div className="p-8 md:w-auto w-full pb-[4rem] flex items-center flex-col gap-3">
      <div className="text-3xl md:text-5xl font-semibold text-center md:mt-10">
        <p>Create Event</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-max flex flex-col gap-4">
          <div>
            <label htmlFor="title">Event Name:</label>
            <div>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                className="bg-white text-black py-2 px-3 w-64"
                placeholder="Event Name"
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <div>
              <input
                type="text"
                name="description"
                value={description}
                id="description"
                placeholder="Event Description"
                className="bg-white text-black py-2 px-3 w-64"
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="date">Event Date:</label>
            <div>
              <input
                type="date"
                name="date"
                id="date"
                value={date}
                className="bg-white text-black py-2 px-3 w-64"
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="teamSize">Team Size:</label>
            <div>
              <input
                type="number"
                name="teamSize"
                id="teamSize"
                value={teamSize}
                className="bg-white text-black py-2 px-3 w-64"
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="eventposter">Event Poster:</label>
            <div>
              <input
                type="file"
                name="poster"
                id="poster"
                className="bg-white text-black py-2 px-3 w-64"
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-orange-500 w-full py-2 px-3 hover:bg-orange-600 focus:bg-orange-700"
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
