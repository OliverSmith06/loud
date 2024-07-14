"use-client";
import { SM } from "@/app/SM";
import React, { useRef, useEffect, useState, ReactNode } from "react";
import "../../app/globals.css";

interface ChipProps {
  children: ReactNode;
}

const Chip: React.FC<ChipProps> = ({ children }) => {
  return (
    <div className="pr-2 pl-2 rounded-full ml-1 mr-1 bg-brandPurple">
      {children}
    </div>
  );
};

export default Chip;
