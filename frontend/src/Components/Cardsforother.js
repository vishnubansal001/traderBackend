import React from "react";

const Cardsforother = ({ data }) => {
  return (
    <div className="relative group bg-back noise-panel rounded-sm shadow-lg drop-shadow-sm border-[1px]  py-4 w-64 h-40 px-3 border-[#222222] hover:bg-gradient-to-br duration-500 ease-in-out font-bold from-[#191919] to-[#202020]">
      <p className="bg-transparent">Rs.</p>
      <p className="bg-transparent text-2xl">{data.amount}</p>
      <div className="bg-transparent flex justify-between mt-4 w-56">
        <div className="bg-transparent">
          <p className="bg-transparent text-sm">Status</p>
          <p className="text-green-500 bg-transparent text-sm">{data.status}</p>
        </div>
        <div className="bg-transparent h-full">
          <p className="bg-transparent text-sm">Reason</p>
          <p className="bg-transparent text-sm">{data.reason}</p>
        </div>
      </div>
    </div>
  );
};

export default Cardsforother;
