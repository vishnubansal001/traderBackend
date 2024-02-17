"use client";

import React, { useState, useEffect } from "react";
import baseUrl from "@/Constants/baseUrl";
import axios from "axios";

const Card = ({ data, event }) => {
  function onChange(e) {
    console.log(e.target.value);
    if (e.target.value === "juniorAdmin") {
      const id = data._id;
      axios.post(`${baseUrl}/admin/make-junior-admin/${id}`);
    }
    if (e.target.value === "executiveAdmin") {
      const id = data._id;
      axios.post(`${baseUrl}/admin/make-executive-admin/${id}`);
    }
  }
  return (
    <div className="w-full flex justify-between">
      <div className="w-60">
        <p>{data.name}</p>
      </div>
      <div>
        <select
          name="Role"
          id="Role"
          className="bg-white text-black py-2 px-4 rounded-sm"
          value={data.role} // Assuming data.role holds the selected role
          onChange={onChange}
        >
          <option disabled value={data.role} className="text-black">
            {data.role}
          </option>
          <option className="text-black" value="juniorAdmin">
            Junior Admin
          </option>
          <option className="text-black" value="executiveAdmin">
            Executive Admin
          </option>
        </select>
      </div>
      <div>
        <select
          name="Department"
          id="Department"
          className="bg-white text-black py-2 px-4 rounded-sm"
          onChange={onChange}
        >
          {event.map((dept) => {
            if (dept._id === data.departmentId) {
              return (
                <option
                  value={dept.name}
                  disabled
                  selected
                  className="text-white"
                >
                  {dept.name}
                </option>
              );
            }
          })}
          {event.map((dept, i) => (
            <option key={i} className="text-white" value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Page = () => {
  const [executives, setExecutives] = useState([]);
  const [junior, setJunior] = useState([]);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const [executivesResponse, juniorResponse, eventsResponse] =
          await Promise.all([
            axios.get(`${baseUrl}/admin/executives`),
            axios.get(`${baseUrl}/admin/junior-admins`),
            axios.get(`${baseUrl}/event/`),
          ]);

        setExecutives(executivesResponse.data.executives);
        setJunior(juniorResponse.data.juniorAdmins);

        const events = eventsResponse.data.events;
        const departmentsResponse = await axios.get(
          `${baseUrl}/event/${events[0]._id}/departments`
        );

        setDepartments(departmentsResponse.data.departments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

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
      {executives
        ? executives.map((user, i) => (
            <div key={i}>
              {user && <Card data={user} event={departments} />}
            </div>
          ))
        : "no Executives"}
      {junior
        ? junior.map((user, i) => (
            <div key={i}>
              {user && <Card data={user} event={departments} />}
            </div>
          ))
        : "no Executives"}
    </div>
  );
};

export default Page;
