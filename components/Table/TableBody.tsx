"use client";
import React from "react";
import { TableBodyProps } from "./TableBodyType";
import { useStore } from "@/context/Store";
import { deleteFileContent } from "@/services/api.service";

const TableBody: React.FC<TableBodyProps> = ({ data }) => {
  const { setShowModal, setSelectedFile } = useStore();
  const { getRepoData } = useStore();

  const handleEditFile = (row: TableBodyProps["data"][0]) => {
    setSelectedFile({
      download: row.download,
      path: row.filename,
      url: row.url,
      contentUrl: row.contentURL,
    });
    setShowModal(true);
  };

  const handleDeleteFile = async (row: TableBodyProps["data"][0]) => {
    try {
      const response = await deleteFileContent(row.contentURL);
      getRepoData();
    } catch (error) {
      console.log(
        "🚀 ~ file: TableBody.tsx:26 ~ handleDeleteFile ~ error:",
        error
      );
    }
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, index) => (
        <tr key={row.filename}>
          <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <a href={row.url} target="_blank" rel="noopener noreferrer">
              {row.filename}
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center justify-center">
              <a
                href={row.download}
                className="text-gray-400 hover:text-gray-500 mx-2"
              >
                Download
              </a>
              <button
                className="text-gray-400 hover:text-gray-500 mx-2"
                onClick={(e) => handleEditFile(row)}
              >
                Edit
              </button>
              <button
                className="text-gray-400 hover:text-gray-500 mx-2"
                onClick={(e) => handleDeleteFile(row)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
