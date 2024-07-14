"use client";
import { useEffect } from "react";
import { SM } from "../../app/SM";
import Link from "next/link";

const classes = {
  navLink: {
    padding: `${SM.spacing.XS} ${SM.spacing.S}`,
  },
};

interface GoToPageProps {
  url: string;
}

const GoToPage: React.FC<GoToPageProps> = ({ url }) => {
  // useEffect(() => {
  //   const handleOnClick = () => {
  //     window.location.hash = url;
  //   };

  //   const divElement = document.getElementById(url);
  //   if (divElement){
  //       divElement.addEventListener('click', handleOnClick);
  //   }

  //   return () => {
  //       if (divElement){
  //           divElement.removeEventListener('click', handleOnClick);
  //       }
  //   };
  // }, []);

  return (
    <Link className="pr-12" href={`#${url}`} passHref>
      <div
        className="hover:text-[#b837eb] hover:cursor-pointer"
        style={classes.navLink}
      >
        {url}
      </div>
    </Link>
  );
};

export default GoToPage;
