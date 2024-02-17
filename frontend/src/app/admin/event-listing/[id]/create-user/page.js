"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import useSWR from "swr";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const Page = () => {
  const [formdata, setFormdata] = useState({
    file: {},
  });
  function onChange(e) {
    if (e.target.files) {
      setFormdata((prev) => ({
        ...prev,
        file: e.target.files,
      }));
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(formdata);
  }

  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(
    `https://swapi.py4e.com/api/people?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState =
    isLoading || data?.results.length === 0 ? "loading" : "idle";

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
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
              className="bg-white w-full text-black py-2 px-3 w-64"
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
        <Table aria-label="user table" className="bg-[#202020] rounded-lg">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
