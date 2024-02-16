"use client";

import React, { useState } from "react";

const Page = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    date: "",
    poster: {},
  });

  const { name, description, date, poster } = formdata;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFormdata((prev) => ({
        ...prev,
        poster: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormdata((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(formdata);
  }

  return (
    <div className="p-8 md:w-auto w-full pb-[4rem] flex items-center flex-col gap-3">
      <div className="text-3xl md:text-5xl font-semibold text-center md:mt-10">
        <p>Create Event</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-max flex flex-col gap-4">
          <div>
            <label htmlFor="name">Event Name:</label>
            <div>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
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
