"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../Components/SideNavigationBar";
import Profile from "../Components/Profile";

const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname == "/admin" || pathname.match(/^\/admin\//) ? (
        <>{children}</>
      ) : (
        <>
          <Sidebar />
          {children}
          <Profile />
        </>
      )}
    </>
  );
};

export default LayoutProvider;
