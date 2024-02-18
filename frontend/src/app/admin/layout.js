"use client";

import SideBar from "../../Components/admin/AdminSideBar";

export default function Layout({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  return (
    <>
      <SideBar />
      <div className="w-full flex justify-end">
        <div className="w-[80%]">{children}</div>
      </div>
    </>
  );
}
