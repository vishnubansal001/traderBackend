"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import baseUrl from "@/Constants/baseUrl";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify"

const columns = [
  { name: "Name", uid: "name" },
  { name: "Password", uid: "password" },
  { name: "Email", uid: "email" },
];

const Page = () => {
  const { id } = useParams();
  const [formdata, setFormdata] = useState({
    file: {},
    token: "",
  });
  const [users, setUsers] = useState([]);
  function onChange(e) {
    if (e.target.files) {
      setFormdata((prev) => ({
        ...prev,
        file: e.target.files[0],
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log(formdata);
    const token = localStorage.getItem("token");
    formdata.token = token;
    try {
      const result = await axios.post(`${baseUrl}/event/${id}/team`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data.teams);
      setUsers(result.data.teams.map((item) => item.user));
      toast.success("Team Lead Created")
    } catch (error) {
      console.error(error);
      toast.error("Request Unseccessful");
    }
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "password":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FaEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div className="flex items-center justify-center w-full pb-[8rem] flex-col gap-6 md:p-8">
      <div className="text-3xl md:text-5xl font-semibold text-center md:mt-10">
        <p>Create Users</p>
      </div>
      <div className="w-full flex mt-16 justify-center">
        <div className="w-full max-w-5xl flex gap-4 items-center justify-center">
          <div>
            <label htmlFor="name">Upload CSV:</label>
          </div>
          <div>
            <input
              type="file"
              accept=".csv"
              name="name"
              id="name"
              className="bg-white text-black py-2 px-3 w-64"
              placeholder="Upload CSV File"
              onChange={onChange}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-orange-500 w-full py-2 px-3 hover:bg-orange-600 focus:bg-orange-700"
            >
              Upload CSV
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full max-w-5xl">
        {users && (
          <Table aria-label="user table" className="bg-[#202020] rounded-lg">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={users}>
              {(item) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Page;
