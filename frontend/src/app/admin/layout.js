"use client";

import { useEffect, useState } from "react";
import SideBar from "../../Components/admin/AdminSideBar";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const [isAdmin,setIsAdmin] = useState(false);
  const router = useRouter()
  useEffect(()=>{
    if (typeof window !== "undefined" && window.localStorage) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
  
      if(!token || !user){
         router.push("/login")
      }
      const data = JSON.parse(user);
      if (data) {
        if (
          data["role"] === "masterAdmin" ||
          data["role"] === "executiveAdmin" ||
          data["role"] === "juniorAdmin"
        ) {
          setIsAdmin(true);
        } else {
          router.push("/login")
        }
      }
    }
  },[])
  
  return (
    <>   {isAdmin && (<>
      <SideBar />
      <div className="w-full flex justify-end min-h-screen">
        <div className="w-full md:w-[80%]">{children}</div>
      </div>
    </>)}
    </>
  );
}
