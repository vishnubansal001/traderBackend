"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify"

const Page = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_zestfzb", "template_y7qqpdi", form.current, {
        publicKey: "WnwpJ91j8UYn_DOZ5",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("email sent successfully")
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("something went wrong");
        }
      );
  };

  return (
    <div className="md:pt-8 pt-[8rem] w-full md:w-[100%] max-w-4xl mx-auto p-8 flex items-center justify-center flex-col gap-4">
      <div className="flex items-center justify-center text-2xl p-2 text-orange-400 font-bold">
        Complain Forum
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 w-full md:w-[50%]"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="message"
            rows="4"
            placeholder="Message"
          ></textarea>
        </div>
        <div className="flex items-center justify-center flex-col gap-2 w-full">
          <input
            type="submit"
            value="Send"
            className="w-full flex items-center justify-center px-3 py-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
