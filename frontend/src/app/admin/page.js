"use client"

import React, { useState, useEffect } from "react";
import baseUrl from "@/Constants/baseUrl";
import axios from "axios";

const Card = ({ data, event }) => {
  function onChange(e){
    console.log(e.target.value);
    if(e.target.value === 'juniorAdmin'){
      const id = data._id
      axios.post(`${baseUrl}/admin/make-junior-admin/${id}`)
    }
    if(e.target.value === 'executiveAdmin'){
      const id = data._id
      axios.post(`${baseUrl}/admin/make-executive-admin/${id}`)
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
            <option disabled value={data.role} className="text-black">{data.role}</option>
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
                  <option value={dept.name} disabled selected className="text-white">{dept.name}</option>
                )
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
    )
}


const Page = () => {
  const [executives, setExecutives] = useState([]);
  const [junior, setJunior] = useState([]);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    async function allfetching() {
      const fetcher1 = await axios.get(`${baseUrl}/admin/executives`).catch((error) => { console.log(error) });
      setExecutives(fetcher1.data.executives);
      const fetcher2 = await axios.get(`${baseUrl}/admin/junior-admins`).catch((error) => { console.log(error) });
      setJunior(fetcher2.data.juniorAdmins);
      const request = await axios.get(`${baseUrl}/event/`).catch((error) => { console.log(error) })
      const events = request.data.events;
      const departments = await axios.get(`${baseUrl}/event/${events[0]._id}/departments`).catch((error) => { console.log(error) })
      setDepartments(departments.data.departments);
    }
    allfetching();
  })
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
      {executives ? executives.map((user, i) => (
        <div key={i}>
          {user && (
            <Card data={user} event={departments} />
          )}
        </div>
      )) : ("no Executives")}
      {junior ? junior.map((user, i) => (
        <div key={i}>
          {user && (
            <Card data={user} event={departments} />
          )}
        </div>
      )) : ("no Executives")}
    </div>
  );
};

export default Page;
