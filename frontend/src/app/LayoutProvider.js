"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../Components/SideNavigationBar";
import Profile from "../Components/Profile";
import { NextUIProvider } from "@nextui-org/react";

const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  return (
    <NextUIProvider>
      {pathname == "/admin" || pathname.match(/^\/admin\//) ? (
        <>{children}</>
      ) : (
        <>
          <Sidebar />
          <div className="min-h-screen">{children}</div>
          <Profile />
        </>
      )}
    </NextUIProvider>
  );
};

export default LayoutProvider;
