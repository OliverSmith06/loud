import { SM } from "@/app/SM";
import React from "react";
import ProjectItem from "../ProjectItem/ProjectItem";
import "./ProjectGallery.scss";

const ProjectGallery = () => {
  const classes = {};

  return (
    <div className="project-gallery">
      <ProjectItem
        title="LOUD"
        date="June 2023"
        desc="A webapp to upload, store and organise videos of various learnings"
        url="https://github.com/OliverSmith06/loud"
        projectUrl="https://noppy.link"
        skills={["Typescript", "React", "NodeJS"]}
      />
      <ProjectItem
        title="List Webapp"
        date="June 2023"
        desc="A list to store and organise various interests with my friend"
        url="https://github.com/OliverSmith06/loud"
        projectUrl="https://noppy.link/list"
        skills={["Typescript", "React", "NodeJS"]}
      />
      <ProjectItem
        title="Calling App"
        date="June 2023"
        desc="Using websockets to create a real time video/audio calling app"
        url="https://github.com/OliverSmith06/loud"
        skills={["Javascript", "Web Sockets"]}
      />
      <ProjectItem
        title="Portfolio"
        date="June 2023"
        desc="Portfolio website using Typescript across the whole stack"
        url="https://github.com/OliverSmith06/loud"
        skills={["Typescript", "React", "NodeJS"]}
      />
      <ProjectItem
        title="Speechy"
        date="August 2022"
        desc="An attempt at using multithreading and Google speech recognition for a PC siri"
        url="https://github.com/OliverSmith06/speechy-2"
        skills={["Python", "Multithreading"]}
      />
      <ProjectItem
        title="Tixel Observer"
        date="May 2023"
        desc="Python bot using selenium to track new tixel tickets and notify through Twilio"
        url="https://github.com/OliverSmith06/tixel_reader"
        skills={["Python", "Selenium"]}
      />
      <ProjectItem
        title="Discord Bot"
        date="April 2020"
        desc="Integrated with Discord API, a bot that can create and manage events through discord commands"
        url="https://github.com/OliverSmith06/Eventsbot"
        skills={["Javascript", "Discord API"]}
      />
      <ProjectItem
        title="Covid Stats"
        date="July 2020"
        desc="Selenium webscraper to take all live Covid case numbers from official source and output to excel"
        url="https://github.com/OliverSmith06/covid19"
        skills={["Python", "Selenium"]}
      />
    </div>
  );
};

export default ProjectGallery;
