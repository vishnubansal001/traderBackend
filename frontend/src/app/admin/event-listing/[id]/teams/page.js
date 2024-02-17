"use client";
import React, { useState, useEffect,useMemo } from "react";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
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
import { FaBan } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const columns = [
    { name: "Sr No.", uid: "id" },
    { name: "Team  Name", uid: "name" },
    { name: "Banned", uid: "banned" },
    { name: "Action", uid: "actions" },
  ];
  const users = [
    {
        _id: {
          "$oid": "65c4adc15e3ed89a918778b7"
        },
        name: "cc",
        teamLead: {
          "$oid": "65c4adc15e3ed89a918778b5"
        },
        eventId: {
          "$oid": "65c3816ccbce56bf2ea2fd65"
        },
        amount: 60002,
        banned: false,
        teamMembers: [],
        history: [
          {
            "$oid": "65c4c8c1e6de5af5bcc01d2e"
          }
        ],
        requests: [
          {
            "$oid": "65c4e117134a6f51a09ec83c"
          },
          {
            "$oid": "65c880cb059e28e70442271b"
          }
        ],
        createdAt: {
          "$date": "2024-02-08T10:32:25.018Z"
        },
        __v: 5
      },{
        _id: {
          "$oid": "65c4adc15e3ed89a918778b7"
        },
        name: "cc",
        teamLead: {
          "$oid": "65c4adc15e3ed89a918778b5"
        },
        eventId: {
          "$oid": "65c3816ccbce56bf2ea2fd65"
        },
        amount: 60002,
        banned: false,
        teamMembers: [],
        history: [
          {
            "$oid": "65c4c8c1e6de5af5bcc01d2e"
          }
        ],
        requests: [
          {
            "$oid": "65c4e117134a6f51a09ec83c"
          },
          {
            "$oid": "65c880cb059e28e70442271b"
          }
        ],
        createdAt: {
          "$date": "2024-02-08T10:32:25.018Z"
        },
        __v: 5
      }
  ];
  
  const statusColorMap = {
    false: "success",
    true: "danger",
  };

const Page = () => {

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
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "banned":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.banned]}
            size="sm"
            variant="flat"
          >
            {cellValue.toString()}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="UnBan">
              <span className="text-lg text-default-400 bg-green-600 hover:bg-green-700 focus:bg-green-800 py-2 px-4 cursor-pointer active:opacity-50">
                <TiTick className="bg-transparent text-white"/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Ban">
              <span className="text-lg text-danger bg-red-600 hover:bg-red-700 focus:bg-red-800 py-2 px-4  cursor-pointer active:opacity-50">
                <FaBan className="text-white bg-transparent"/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="text-center text-3xl md:text-5xl font-semibold">
        <p>All Teams</p>
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
              <TableRow key={item}>
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
