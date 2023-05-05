"use client";

import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableProps } from "./TableType";
import { useStore } from "@/context/Store";

const Table: React.FC<TableProps> = () => {
  const { files } = useStore();
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader columns={["#", "File Name", "Action"]} />
              <TableBody data={files || []} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
