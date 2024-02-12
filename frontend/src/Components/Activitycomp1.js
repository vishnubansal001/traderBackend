import React from "react";

const Activitycomp1 = ({ data }) => {
  return (
    <div className="relative group bg-back noise-panel rounded-sm shadow-lg drop-shadow-sm border-[1px] border-[#222222] py-4 w-full h-16  px-8 hover:bg-gradient-to-br duration-500 ease-in-out font-bold from-[#191919] to-[#202020]">
      <div className="h-full flex items-center justify-between bg-transparent">
        <div className=" bg-transparent">
          <p className=" bg-transparent">{data?.department?.name ?? "abc"}</p>
        </div>
        <div className=" bg-transparent">
          <p className=" bg-transparent">
            <span className=" bg-transparent">₹</span> {data?.amount}
            <span className=" bg-transparent">/-</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activitycomp1;
