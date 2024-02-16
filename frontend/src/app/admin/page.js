import React from "react";

const Page = () => {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div className="text-5xl font-semibold">
        <p>Admin Users</p>
      </div>
      <div className="w-full flex justify-between">
        <div>
          <p>Username</p>
        </div>
        <div>
          <p>Role</p>
        </div>
        <div>
          <p>Department</p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div>
          <p>Username</p>
        </div>
        <div>
          <select
            name="Role"
            id="Role"
            className="bg-white text-black py-2 px-4 rounded-sm"
          >
            <option className="text-white" value="Junior">
              Junior Admin
            </option>
            <option className="text-white" value="executive">
              Executive Admin
            </option>
          </select>
        </div>
        <div>
          <select
            name="Department"
            id="Department"
            className="bg-white text-black py-2 px-4 rounded-sm"
          >
            <option className="text-white" value="it">
              It Department
            </option>
            <option className="text-white" value="accounts">
              Accounts Department
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Page;
