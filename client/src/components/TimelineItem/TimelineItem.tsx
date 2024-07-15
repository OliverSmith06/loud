"use client";
import { SM } from "@/app/SM";
import React, { useState, useRef, useEffect } from "react";
import "./TimelineItem.scss";
import { Experience } from "../TimelineV2/TimelineV2";

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

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TimelineItem: React.FC<Experience> = ({
  title,
  company,
  dateStarted,
  dateEnded,
  description,
  icon,
}) => {
  useEffect(() => {}, []);
  return (
    <div className="timelineItem__wrapper">
      <div className="timelineItem__container">
        <div className="timelineItem__content">
          <div className="timelineItem__title">{title}</div>
          <div className="timelineItem__company">{company}</div>
          <div className="timelineItem__dates">
            {monthNames[dateStarted.getMonth()]} {dateStarted.getFullYear()}{" "}
            {dateEnded && (
              <>
                - {monthNames[dateEnded.getMonth()]} {dateEnded.getFullYear()}
              </>
            )}
          </div>
          <div className="timelineItem__description">{description}</div>
        </div>
        <div className="timelineItem__icon">
          <div className="timelineItem__top-hexagon"></div>
          <div className="timelineItem__middle-hexagon"></div>
          <div className="timelineItem__bottom-hexagon"></div>
        </div>
      </div>
      <div className="timelineItem__experience-line"></div>
    </div>
  );
};

export default TimelineItem;
