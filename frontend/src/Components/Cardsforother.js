import React from "react";

const Cardsforother = () => {
  return (
    <div className="relative group bg-back noise-panel rounded-sm shadow-lg drop-shadow-sm border-[1px]  py-4 w-64 h-40 px-3 border-[#222222] hover:bg-gradient-to-br duration-500 ease-in-out font-bold from-[#191919] to-[#202020]">
      <p className="bg-transparent">$</p>
      <p className="bg-transparent text-2xl">1820</p>
      <div className="bg-transparent flex justify-between mt-4 w-56">
        <div className="bg-transparent">
          <p className="bg-transparent text-sm">Profit</p>
          <p className="text-green-500 bg-transparent text-sm">+2.8%</p>
        </div>
        <div className="bg-transparent h-full">
          <p className="bg-transparent text-sm">Loss</p>
          <p className="bg-transparent text-sm"></p>
        </div>
        <div className="bg-transparent">
          <p className="bg-transparent text-sm">Neutral</p>
          <p className="bg-transparent text-sm">2.70%</p>
        </div>
      </div>
    </div>
  );
};

export default Cardsforother;
