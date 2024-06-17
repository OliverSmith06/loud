import ProgressBar from "../progressBar/progressBar";
import Timer from "../timer/timer";
import styles from "./gradientPic.module.css";
import React, { useState, useEffect } from "react";

function GradientPic() {
  const startDate = new Date("2024-02-27T18:00:00"); // Replace with your start date
  const endDate = new Date("2024-06-28T08:20:00"); // Replace with your end date 06/14/2024 08:20:00

  // Calculate the total time difference in milliseconds
  const totalTime: number = +endDate - +startDate;

  // Initialize the percentage state variable
  const [percentage, setPercentage] = useState(0);

  const roundHQuarter = (num: number) => {
    return Math.round(num * 4) / 4;
  };

  const calculatePercentage = () => {
    const currentTime = new Date();
    const elapsedTime: number = +currentTime - +startDate;
    const currentPercentage: number = roundHQuarter(
      (elapsedTime / totalTime) * 100
    );
    console.log(percentage);
    if (currentPercentage < 100) {
      setPercentage(currentPercentage);
    }
  };

  // Use useEffect to run the calculation function and update every minute
  useEffect(() => {
    calculatePercentage(); // Initial calculation

    const intervalId = setInterval(calculatePercentage, 100); // Update every minute

    return () => {
      clearInterval(intervalId); // Clean up the interval
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* <ProgressBar progressCount={percentage} /> */}
      <Timer />
      <div className={styles.seoulBW}></div>
      <div
        style={{ width: `${percentage}%` }}
        className={styles.seoulImg}
      ></div>
    </div>
  );
}

export default GradientPic;
