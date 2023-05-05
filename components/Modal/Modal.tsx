"use client";

import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#modal-place-holder-div");

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const MyModal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {children}
    </Modal>
  );
};

export default MyModal;
