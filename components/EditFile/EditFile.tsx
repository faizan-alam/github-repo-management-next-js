"use client";

import React from "react";
import Modal from "../Modal/Modal";
import { useStore } from "@/context/Store";
import useGetFileDetails from "@/hooks/useGetFileDetails";
import FileInformation from "./FileInformation";

const EditFile = () => {
  const { showModal, setShowModal, setSelectedFile, selectedFile } = useStore();
  const { data, getData, isLoading } = useGetFileDetails();

  React.useLayoutEffect(() => {
    if (selectedFile?.contentUrl && showModal && !isLoading) {
      getData(selectedFile.contentUrl);
    }
  }, [selectedFile?.contentUrl]);

  const handleClose = () => {
    setSelectedFile();
    setShowModal(false);
  };

  return (
    <div>
      <div id="modal-place-holder-div" />
      <Modal isOpen={!!showModal} onClose={handleClose}>
        {isLoading ? (
          <>LOADING</>
        ) : (
          <FileInformation
            data={data}
            title={selectedFile?.path}
            path={selectedFile?.contentUrl}
          />
        )}
      </Modal>
    </div>
  );
};

export default EditFile;
