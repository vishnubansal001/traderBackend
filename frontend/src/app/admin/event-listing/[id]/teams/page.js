"use client";
import React, { useState, useEffect, useMemo } from "react";
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
import { FaBan, FaPlus } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const columns = [
  { name: "Sr No.", uid: "_id" },
  { name: "Team Name", uid: "name" },
  { name: "Team Amount", uid: "amount" },
  { name: "Banned", uid: "banned" },
  { name: "Action", uid: "actions" },
];
const statusColorMap = {
  false: "success",
  true: "danger",
};

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      async function teamFetch() {
        const token = localStorage.getItem("token");
        const result = await axios.post(`${baseUrl}/event/${id}/teams`, {
          token: token,
        });
        console.log(result.data.teams);
        setTeams(() => result.data.teams);
      }
      teamFetch();
    }
  }, []);

  async function teamBan(teamId) {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.put(
        `${baseUrl}/event/${id}/team/${teamId}/ban`,
        {
          token: token,
        }
      );

      console.log(result);
      toast.success("Team Banned");
    } catch (error) {
      toast.error("Request Failed");
    }
  }
  async function teamUnban(teamId) {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.put(
        `${baseUrl}/event/${id}/team/${teamId}/unban`,
        {
          token: token,
        }
      );
      console.log(result);
      toast.success("Team UnBanned");
    } catch (error) {
      toast.error("Request Failed");
    }
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
      case "_id":
      case "amount":
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
            {cellValue?.toString()}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="success" content="UnBan">
              <span
                onClick={() => teamUnban(user._id)}
                className="text-lg text-default-400 bg-green-600 hover:bg-green-700 focus:bg-green-800 py-2 px-4 cursor-pointer active:opacity-50"
              >
                <TiTick className="bg-transparent text-white" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Ban">
              <span
                onClick={() => teamBan(user._id)}
                className="text-lg text-danger bg-red-600 hover:bg-red-700 focus:bg-red-800 py-2 px-4  cursor-pointer active:opacity-50"
              >
                <FaBan className="text-white bg-transparent" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Add Transaction">
              <span
                onClick={() =>
                  router.push(`/admin/event-listing/${id}/teams/${user._id}`)
                }
                className="text-lg text-danger bg-orange-600 hover:bg-orange-700 focus:bg-orange-800 py-2 px-4  cursor-pointer active:opacity-50"
              >
                <FaPlus className="text-white bg-transparent" />
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
      <div className="flex items-center justify-center w-full max-w-5xl mx-auto">
        <Table aria-label="user table" className="bg-[#202020] rounded-lg">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={teams}>
            {(item) => (
              <TableRow key={item._id}>
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
