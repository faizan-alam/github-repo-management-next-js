"use client";

import { TableBodyProps } from "@/components/Table/TableBodyType";
import { getRepoInformation } from "@/services/api.service";
import { File } from "@/types";
import React, { createContext, useContext } from "react";

export interface StoreType {
  selectedFile?: File;
  showModal?: boolean;
  loading?: boolean;
  title?: string;
  description?: string;
  files?: TableBodyProps["data"];
  setSelectedFile: (file?: File) => void;
  setShowModal: (modal?: boolean) => void;
  getRepoData: () => void;
}

export const Store = createContext<StoreType>({
  setSelectedFile(_file) {},
  selectedFile: undefined,
  showModal: false,
  setShowModal(_showModal) {},
  loading: false,
  title: "",
  description: "",
  files: [],
  getRepoData() {},
});

export const useStore = () => useContext(Store);

export const StoreContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [file, setFile] = React.useState<File>();
  const [showModal, setShowModal] = React.useState<boolean>();
  const [loading, setLoading] = React.useState<boolean>();
  const [title, setTitle] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [files, setFiles] = React.useState<TableBodyProps["data"]>();

  const getRepoData = async () => {
    try {
      setLoading(true);
      const response = await getRepoInformation();
      setTitle(response.fullName);
      setDescription(response.description);
      const formattedData =
        response?.fileNames?.map((row) => ({
          filename: row.path,
          url: row.url,
          download: row.download,
          contentURL: row.contentUrl,
        })) || [];

      setFiles(formattedData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getRepoData();
  }, []);

  return (
    <Store.Provider
      value={{
        selectedFile: file,
        setSelectedFile: setFile,
        showModal,
        setShowModal,
        loading,
        description,
        files,
        getRepoData,
        title,
      }}
    >
      {children}
    </Store.Provider>
  );
};
