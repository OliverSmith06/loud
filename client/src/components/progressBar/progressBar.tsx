import styles from "./progressBar.module.css";
import React, { useState, useEffect } from 'react';

interface ProgressProps {
    progressCount: number;
}

const ProgressBar: React.FC<ProgressProps> = ({ progressCount }) => {
// function ProgressBar() {

    return (
      <div className={styles.wrapper}>
        <div className={styles.counter}>
            <div className={styles.innerCounter}>{progressCount}%</div></div>
        <div style={{width: `${progressCount}%`}} className={styles.bar}></div>
      </div>
    );
  }
  
  export default ProgressBar;
  