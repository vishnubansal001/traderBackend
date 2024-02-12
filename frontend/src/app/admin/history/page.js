import React from "react";

const Log = () => {
  return (
    <div className="w-full rounded-xl border border-white hover:border-orange-500 h-16 flex justify-around items-center justify-center">
      <div className=" flex items-end">
        <p className="mb-4">1.</p>
      </div>
      <div>
        <p>Transaction</p>
        <p>hjsvbhjss</p>
      </div>
      <div>
        <p>Time</p>
        <p>shksbhjs</p>
      </div>
      <div>
        <p>Amount</p>
        <p>516786282t</p>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="p-8">
      <div className="text-center text-5xl font-semibold">
        <p>History</p>
      </div>
      <div className=" mt-10 space-y-4">
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
        <Log />
      </div>
    </div>
  );
};

export default page;
