"use client";

import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    allotment: "",
  });

  const { allotment } = formData;

  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <div className="p-8 h-screen">
      <div className="h-full flex justify-center items-center">
        <div className="flex flex-col space-y-5">
          <div className="flex text-3xl font-semibold">
            <p>Department Name: </p>
            <p className="ml-4">ABS</p>
          </div>
          <div className="flex text-xl font-semibold">
            <p>Department Admins: </p>
            <p className="ml-4">ghgsdyjs</p>
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <label htmlFor="allotment">Admin Allotment:</label>
            </div>
            <div>
              <input
                type="text"
                value={allotment}
                name="allotment"
                id="allotment"
                className="bg-white px-3 py-2 w-full text-black "
                onChange={onChange}
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={onSubmit}
                className="py-2 px-3 w-full bg-orange-600 hover:bg-orange-700 focus:bg-orange-800"
              >
                Allot Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
