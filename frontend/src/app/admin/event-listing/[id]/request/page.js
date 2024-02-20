"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "@/Constants/baseUrl";
import { useParams } from "next/navigation";
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
import { FaBan, FaEye } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { toast } from "react-toastify";

const Log = ({ ind, data }) => {
  const dateTime = data.createdAt.split(/[T.]/);
  return (
    <div className="w-full rounded-xl border border-white hover:border-orange-500 h-16 flex justify-around items-center">
      <div className=" flex items-end">
        <p className="mb-4">{ind + 1}.</p>
      </div>
      <div>
        <p className="text-center">Transaction</p>
        <p>{data.transactionId}</p>
      </div>
      <div>
        <p className="text-center">Date & Time</p>
        <div className="flex flex-wrap w-36 justify-between">
          <p>{dateTime[0]}</p>
          <p>{dateTime[1]}</p>
        </div>
      </div>
      <div>
        <p className="text-center">Amount</p>
        <p>{data.amount}/-</p>
      </div>
    </div>
  );
};

const columns = [
  { name: "Sr No.", uid: "_id" },
  { name: "Subject", uid: "subject" },
  { name: "Team Name", uid: "team" },
  { name: "Department", uid: "department" },
  { name: "Amount", uid: "amount" },
  { name: "Reason", uid: "reason" },
  { name: "Status", uid: "status" },
  { name: "Action", uid: "actions" },
];
const statusColorMap = {
  pending: "warning",
  approved: "success",
  declined: "danger",
};

const Page = () => {
  const params = useParams();
  const { id } = params;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function allfetching() {
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.post(`${baseUrl}/request/${id}`, {
            token,
          });
          console.log(res);
          setRequests(res?.data?.requests);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    allfetching();
  }, []);

  const rejectRequest = async (d) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${baseUrl}/request/${id}/decline/${d}`, {
        token: token,
      });
      console.log(res);
      toast.success("Request Rejected");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Request rejection Failed");
    }
  };

  const acceptRequest = async (d) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${baseUrl}/request/${id}/approve/${d}`, {
        token
      });
      console.log(res);
      toast.success("Request Accepted");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Request acceptance failed");
    }
  };

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
      case "team":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue?.name}</p>
          </div>
        );
      case "department":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue?.name}</p>
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
            <Tooltip color="success" content="Approve Request">
              <span
                onClick={() => acceptRequest(user._id)}
                className="text-lg text-default-400 bg-green-600 hover:bg-green-700 focus:bg-green-800 py-2 px-4 cursor-pointer active:opacity-50"
              >
                <TiTick className="bg-transparent text-white" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Decline Request">
              <span
                onClick={() => rejectRequest(user._id)}
                className="text-lg text-danger bg-red-600 hover:bg-red-700 focus:bg-red-800 py-2 px-4  cursor-pointer active:opacity-50"
              >
                <FaBan className="text-white bg-transparent" />
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
        <p>Requests</p>
      </div>
      <div className="flex items-center flex-col justify-center gap-3 pb-[8rem] md:pb-0">
        <Table aria-label="user table" className="bg-[#202020] rounded-lg">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={requests}>
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
