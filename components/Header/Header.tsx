"use client";

import React from "react";
import { HeaderProps } from "./HeaderType";
import { useStore } from "@/context/Store";

const Header: React.FC<HeaderProps> = ({}) => {
  const { title, description } = useStore();
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
      <p className="mt-3 text-xl text-gray-500">{description}</p>
    </div>
  );
};

export default Header;
