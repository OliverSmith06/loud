"use client";
import { SM } from "@/app/SM";
import React, { useState, useRef, useEffect } from "react";
import "./TimelineV2.scss";
import TimelineItem from "../TimelineItem/TimelineItem";

export interface Experience {
  title: string;
  company: string;
  dateStarted: Date;
  dateEnded?: Date;
  description?: string;
  icon?: string;
}

const classes = {
  circle: {
    width: "4vh",
    height: "4vh",
    borderRadius: "50%",
    // backgroundColor: "#b3e3ff",
    outline: "0.7vh solid #404040",
    color: "red",
  },
  thing: {
    // height: '1000px',
    width: "12.25%",
    // backgroundColor: 'red',
  },
  startingYear: {
    marginLeft: "-21.5vh",
    marginTop: "3vh",
  },
};

const experiences: Experience[] = [
  {
    title: "Lead Instructor and Course Designer",
    company: "CodeCreate",
    dateStarted: new Date("2020-06-01T00:00:00"),
    dateEnded: new Date("2022-03-01T00:00:00"),
  },
  {
    title: "Software Engineer Intern",
    company: "Snap Inc.",
    dateStarted: new Date("2022-05-01T00:00:00"),
    dateEnded: new Date("2022-09-01T00:00:00"),
  },
  {
    title: "Course Instructor",
    company: "Code Camp",
    dateStarted: new Date("2022-11-01T00:00:00"),
    dateEnded: new Date("2023-03-01T00:00:00"),
  },
  {
    title: "IT Technical Support",
    company: "itGlobal Networks",
    dateStarted: new Date("2022-11-01T00:00:00"),
    dateEnded: new Date("2023-03-01T00:00:00"),
  },
  {
    title: "Graduate Software Engineer",
    company: "ubank",
    dateStarted: new Date("2023-04-01T00:00:00"),
  },
  {
    title: "Bachelor of Computer Science",
    company: "University of New South Wales",
    dateStarted: new Date("2023-05-01T00:00:00"),
  },
  {
    title: "Associate Software Engineer",
    company: "ubank",
    dateStarted: new Date("2024-04-01T00:00:00"),
  },
];

function getWindowDimensions() {
  // const { innerWidth: width, innerHeight: height } = window;
  let height = 100;
  let width = 100;
  if (typeof window !== "undefined") {
    height = window.innerHeight;
    width = window.innerWidth;
  }

  return {
    width,
    height,
  };
}

function TimelineV2() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number | null>(null);
  const [parentHeight, setParentHeight] = useState<number | null>(null);

  useEffect(() => {
    if (parentRef.current) {
      const width = parentRef.current.offsetWidth;
      const height = parentRef.current.offsetHeight;
      setParentWidth(width);
      setParentHeight(height);
    }
  }, []);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  let dW = 500;
  if (parentWidth != null) {
    dW = parentWidth;
  }
  let dH = 500;
  if (parentHeight != null) {
    dH = parentHeight;
  }
  return (
    <div className="flex h-1/2 flex-row justify-center timeline">
      {experiences.map((experience, index) => (
        <TimelineItem
          key={index}
          title={experience.title}
          company={experience.company}
          dateStarted={experience.dateStarted}
          dateEnded={experience.dateEnded}
          description={experience.description}
          icon={experience.icon}
        ></TimelineItem>
      ))}
    </div>
  );
}

export default TimelineV2;
