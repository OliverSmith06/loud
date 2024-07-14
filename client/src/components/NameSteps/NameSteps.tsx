"use client";
import Typical from "react-typical";

const stepss = [
  "",
  1000,
  "O",
  300,
  "Ol",
  300,
  "Oli",
  300,
  "Oliv",
  300,
  "Olive",
  300,
  "Oliver",
  300,
  "Oliver ",
  300,
  "Oliver S",
  300,
  "Oliver Sm",
  300,
  "Oliver Smi",
  300,
  "Oliver Smit",
  300,
  "Oliver Smith",
  1000,
  // "Oliver Smith </>",1000,
  "Oliver Smit",
  100,
  "Oliver Smi",
  100,
  "Oliver Sm",
  100,
  "Oliver S",
  100,
  "Oliver ",
  100,
  "Olive",
  100,
  "Oliv",
  100,
  "Oli",
  100,
  "Ol",
  100,
  "O",
  100,
  "",
  100,
];

function NameSteps() {
  return (
    <div className="block test1 mr-10 flex-col items-center content-center justify-center pl-2 pt-2">
      <Typical steps={stepss} loop={Infinity} wrapper="p" />
    </div>
  );
}

export default NameSteps;

// import React from 'react'
// import { ReactTypical } from '@deadcoder0904/react-typical'

// const Index = () => (
// 	<ReactTypical
// 		steps={['💩',1000, '🙈',1000,'💖',1000,'🚀',1000,'👨‍🎤',1000]}
// 		wrapper="p"
// 	/>
// )

// export default Index
