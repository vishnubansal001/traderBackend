import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import baseUrl from "@/Constants/baseUrl";
import { toast } from "react-toastify";

const Table = ({ data }) => {
  const router = useRouter();
  let token;
  if (typeof window !== "undefined" && window.localStorage) {
    token = localStorage.getItem("token");
  }
  const onClck1 = (id, role) => {
    if (role === "executiveAdmin") {
      axios
        .post(`${baseUrl}/admin/remove-admin/${id}`, { token:token })
        .then((res) => {
          router.refresh();
          toast.success("Executive Role Changed")
          console.log(res.data);
        })
        .catch((err) => {
          toast.error("Role change Request Failed")
          console.log(err);
        });
    } else {
      axios
        .post(`${baseUrl}/admin/make-executive-admin/${id}`, { token:token })
        .then((res) => {
          router.refresh();
          toast.success("Executive Role Changed")
          console.log(res.data);
        })
        .catch((err) => {
          toast.error("Role change Request Failed")
          console.log(err);
        });
    }
  };
  const onClck2 = (id, role) => {
    if (role === "juniorAdmin") {
      axios
        .post(`${baseUrl}/admin/remove-admin/${id}`, { token:token })
        .then((res) => {
          router.refresh();
          toast.success("Junior Role Changed")
          console.log(res.data);
        })
        .catch((err) => {
          toast.error("Role change Request Failed")
          console.log(err);
        });
    } else {
      axios
        .post(`${baseUrl}/admin/make-junior-admin/${id}`, { token:token })
        .then((res) => {
          router.refresh();
          toast.success("Junior Role Changed")
          console.log(res.data);
        })
        .catch((err) => {
          toast.error("Role change Request Failed")
          console.log(err);
        });
    }
  };
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    isExecutive
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    isJunior
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users?.map((user) => (
                  <tr key={user._id} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td
                      onClick={() => onClck1(user._id, user.role)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                    >
                      {user.role === "executiveAdmin" ? "Yes" : "No"}
                    </td>
                    <td
                      onClick={() => onClck2(user._id, user.role)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                    >
                      {user.role === "juniorAdmin" ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
