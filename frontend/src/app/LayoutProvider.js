"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../Components/SideNavigationBar";
import Profile from "../Components/Profile";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  return (
    <NextUIProvider>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
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
