"use client";

import SideBar from "../../Components/admin/AdminSideBar";

export default function Layout({ children }) {
  if (typeof window !== "undefined" && window.localStorage) {
    const user = localStorage.getItem("user");
    const data = JSON.parse(user);
    if (data) {
      if (
        data["role"] === "masterAdmin" ||
        data["role"] === "executiveAdmin" ||
        data["role"] === "juniorAdmin"
      ) {
        console.log("welcome admin");
      } else {
        window.location.href = "/login";
      }
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
