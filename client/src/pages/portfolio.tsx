import Image from "next/image";
import { SM } from "../app/SM";
import "../app/globals.css";
import NameSteps from "@/components/NameSteps/NameSteps";
import TerminalArrow from "@/components/TerminalArrow/TerminalArrow";
import TerminalSquiggle from "@/components/TerminalSquiggle/TerminalSquiggle";
import GithubLogo from "../icons/github";
import InstagramLogo from "../icons/instagram";
import LinkedInLogo from "../icons/linkedin";
import UbankLogo from "../icons/ubank";
import GoToPage from "@/components/GoToPage/GoToPage";
import ProjectGallery from "@/components/ProjectGallery/ProjectGallery";
import Contact from "@/components/Contact/Contact";
import TimelineV2 from "@/components/TimelineV2/TimelineV2";

const classes = {
  main: {
    backgroundColor: SM.colors.primary2,
  },
  home: {
    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
  },
  pageTitle: {
    fontSize: "2.5em",
    fontWeight: "bold",
    color: SM.colors.text,
    width: "400px",
  },
  introTitle: {
    fontSize: "3.5em",
    color: SM.colors.text,
  },
  projects: {
    backgroundColor: SM.colors.secondary,
    width: "100vw",
    minHeight: "100vh",
    maxWidth: "100%",
  },
  experience: {
    width: "100vw",
    minHeight: "100vh",
    maxWidth: "100%",
  },
  contact: {
    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
  },
  intro: {
    backgroundColor: SM.colors.secondary,
    width: "100vw",
    minHeight: "100vh",
    maxWidth: "100%",
  },
  nav: {
    backgroundColor: SM.colors.primary2,
    width: "100vw",
    maxWidth: "100%",
    fontSize: SM.fontSize.M,
    color: SM.colors.text,
    spacing: SM.spacing.S,
  },
  navLink: {
    padding: `${SM.spacing.XS} ${SM.spacing.S}`,
  },
  introBody: {
    padding: "10% 5%",
    color: SM.colors.text,
    fontSize: "1.5rem",
  },
};

// #1b1f24
// #232b35
export const portfolio = () => {
  const githubUrl = "https://github.com/OliverSmith06";
  const instagramUrl = "https://www.instagram.com/oliver.smith06/";
  const linkedinUrl = "https://www.linkedin.com/in/oliver-smith-66985a196/";

  function navEnter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    target.style.filter = "brightness(75%)";
    target.style.cursor = "pointer";
  }

  function navLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    target.style.filter = "brightness(100%)";
  }
  function gotoPage(url: string) {
    console.log("TEST");
  }

  const handleOnClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main
      style={classes.main}
      className="flex min-h-screen flex-col items-center content-center justify-between"
    >
      <header className="fixed" style={classes.nav}>
        <div className="flex flex-row justify-end items-center">
          <div className="flex-grow pl-4">Oliver Smith</div>
          <GoToPage url="home" />
          <GoToPage url="about" />
          <GoToPage url="experience" />
          <GoToPage url="projects" />
          <GoToPage url="contact" />
        </div>
      </header>
      <div
        id="home"
        className="flex flex-col items-center justify-center content-center"
        style={classes.home}
      >
        <div className="flex flex-row text-center" style={classes.pageTitle}>
          <TerminalArrow />
          <NameSteps />
        </div>
      </div>
      <div id="about" style={classes.intro}>
        <div className="flex flex-col h-full">
          <div className="flex flex-col w-9/12">
            <div
              className="flex flex-row font-medium ml-4"
              style={classes.introTitle}
            >
              <TerminalSquiggle /> <div className="pt-2">intro</div>
            </div>
            <div
              className="flex-grow w-screen flex flex-col justify-center items-center"
              style={classes.introBody}
            >
              <div className="mb-5 ">
                {"Having recently graduated from"}{" "}
                <div className="text-[#FFE600] font-semibold inline">
                  <img
                    className="inline w-7 mr-2 ml-2 mb-2"
                    src="/unsw_logo.png"
                    alt="Github Logo"
                  />
                  {"UNSW"}
                </div>{" "}
                {"with a "}{" "}
                <div className="text-brandPurple font-semibold inline">
                  {"Bachelor of Computer Science"}
                </div>{" "}
                {
                  " I thought I would share all that I've worked on over the years. "
                }
              </div>
              <div className="mt-5 mb-10 ">
                {"I've recently started as a "}{" "}
                <div className="text-brandPurple font-semibold inline">
                  {"Graduate Software Engineer"}
                </div>{" "}
                {" at "}{" "}
                <div className="font-semibold inline">
                  <UbankLogo />
                  {"ubank"}
                </div>{" "}
                {
                  " but still enjoy finding out new software and how we can use them"
                }
              </div>
            </div>
          </div>
          <div className="h-full flex-grow">
            <div className="mr-2 ml-2 mt-2 flex flex-row h-full gap-10 items-center justify-center">
              <div className="w-1/5">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubLogo />
                </a>
              </div>
              <div className="w-1/5">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogo />
                </a>
              </div>
              <div className="w-1/5">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <LinkedInLogo />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="experience" style={classes.experience}>
        <div
          className="flex flex-row font-medium ml-4 mb-10"
          style={classes.introTitle}
        >
          <TerminalSquiggle /> <div className="pt-2">timeline</div>
        </div>
        <TimelineV2 />
      </div>
      <div id="projects" style={classes.projects}>
        <div
          className="flex flex-row font-medium ml-4"
          style={classes.introTitle}
        >
          <TerminalSquiggle /> <div className="pt-2">projects</div>
        </div>
        <ProjectGallery />
      </div>
      <div id="contact" style={classes.contact}>
        <div
          className="flex flex-row font-medium ml-4"
          style={classes.introTitle}
        >
          <TerminalSquiggle /> <div className="pt-2">contact</div>
        </div>
        <Contact />
      </div>
    </main>
  );
};

export default portfolio;
