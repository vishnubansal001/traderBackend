"use client";

import React, { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

const Card = () => {
  const router = useRouter();
  const params = useParams();
  const dept_id = "hwgefjhwgfkdjhsfgw";
  return (
    <div
      className="relative group bg-back noise-panel rounded-sm shadow-lg drop-shadow-sm border-[1px] border-[#222222] py-4 w-64 p-5 gap-2  hover:border-orange-500"
      onClick={() =>
        router.push(`/admin/event-listing/${params.id}/${dept_id}`)
      }
    >
      <div className="flex gap-2 bg-transparent w-full">
        <div className="w-full  bg-transparent">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Department Name:{" "}
          </p>
        </div>
        <div className="w-full bg-transparent flex justify-end">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">ABS</p>
        </div>
      </div>
      <div className="flex gap-2 bg-transparent w-full">
        <div className="w-full  bg-transparent">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Description:{" "}
          </p>
        </div>
        <div className="w-full bg-transparent flex justify-end">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Desc
          </p>
        </div>
      </div>
      <div className="flex gap-2 bg-transparent w-full">
        <div className="w-full  bg-transparent">
          <p className=" bg-transparent lg:text-base sm:text-sm text-xs">
            Department Admins:{" "}
          </p>
        </div>
        <div className="w-full bg-transparent flex justify-end">
          <p className="break-words bg-transparent lg:text-base sm:text-sm text-xs">
            Ansh
          </p>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const { name } = formData;
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
    <div className="p-8 flex flex-col items-center">
      <div className="text-5xl font-semibold">
        <p>Department Creation</p>
      </div>
      <div className="mt-8 w-full overflow-x-scroll flex gap-5 py-5 scrollbar">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="w-fit mt-10 space-y-2">
        <div>
          <label htmlFor="name">Department Name</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Enter Department Name"
            className="bg-white text-black py-2 px-3 w-72"
            onChange={onChange}
          />
        </div>
        <div className="">
          <button
            type="submit"
            onClick={onSubmit}
            className="w-full mt-5 bg-orange-600 hover:bg-orange-700 focus:bg-orange-800  py-2 px-3 rounded-md"
          >
            Create Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
