import { SM } from "@/app/SM";
import React from "react";
import GithubLogo from "@/icons/github";
import Chip from "../Chip/Chip";
import LinkButton from "../LinkButton/LinkButton";
import { Button } from "@mui/material";

interface ProjecItemProps {
  title: string;
  date: string;
  desc: string;
  url: string;
  projectUrl?: string;
  skills: string[];
}

const ProjectItem: React.FC<ProjecItemProps> = ({
  title,
  date,
  desc,
  url,
  projectUrl,
  skills,
}) => {
  const classes = {
    tile: {
      // height: "25%",
      width: "60%",
      outline: "0.3vh solid #B837EB",
      padding: "1vh",
      borderRadius: "1vh 1vh 1vh 1vh",
    },
  };

  return (
    <div
      style={classes.tile}
      className="mt-5 mb-5 bg-[#232b35] flex flex-col justify-start"
    >
      <div className="text-brandPurple text-xl font-extrabold">{title}</div>
      <div className="text-xs font-semibold">{date}</div>
      <div className="text-base mt-5">{desc}</div>
      <div className="flex flex-row text-xs mt-2">
        {skills.map((item, index) => (
          <Chip>{item}</Chip>
        ))}
      </div>

      <div className="flex flex-col flex-grow justify-end">
        <div
          className="flex flex-row mb-2 mt-2 hover:cursor"
          onClick={() => {
            window.location.href = url;
          }}
        >
          <div className="w-7">
            <GithubLogo />
          </div>
          <div className="ml-1">GitHub Page</div>
        </div>
        {projectUrl && (
          <div
            onClick={() => {
              window.location.href = projectUrl;
            }}
            className="flex flex-row hover:cursor"
          >
            <Button className="bg-brandPurple" variant="contained">
              Project Demo
            </Button>
            {/* <div className="ml-1 text-brandPurple">Project Demo</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
