"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

const Page = () => {
  const [value, setValue] = useState("");
  return (
    <div className="md:pt-8 pt-[8rem] w-full md:w-[60%] mx-auto p-8">
      <div className="w-full h-60 relative">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="h-[80%]"
        />
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 py-4 rounded-xl"
        >
          Send Mail
        </button>
      </div>
    </div>
  );
};

export default Page;
