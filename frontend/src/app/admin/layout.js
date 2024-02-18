"use client";

import SideBar from "../../Components/admin/AdminSideBar";

export default function Layout({ children }) {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }
  return (
    <>
      <SideBar />
      <div className="w-full flex justify-end min-h-screen">
        <div className="w-full md:w-[80%]">{children}</div>
      </div>
    </>
  );
}
