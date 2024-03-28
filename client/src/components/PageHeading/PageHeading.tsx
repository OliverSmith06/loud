import React, { useEffect } from 'react';
import './PageHeading.scss';
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../../../public/fonts/ProtestStrike-Regular.ttf', weight: '200', })

export const PageHeading = () => {
  const spotlightXSize = 100;
  const spotlightYSize = 500;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get the coordinates of the title
      let titleElement = document.querySelector('.title');
      if (!titleElement) {
        return;
      }

      let titleRect = titleElement.getBoundingClientRect();
      
      // Grab the mouse's X-position
      let mouseX = event.clientX;
      
      // Position spotlight x coordinate based on mouse x, center based on width of spotlight, take into account element x offset
      let spotlightX = mouseX - (spotlightXSize / 2) - titleRect.left;
      
      // Grab the mouse's Y position
      let mouseY = event.clientY;
      
      // Position spotlight y coordinate based on mouse y, center based on width of spotlight, take into account element y offset
      let spotlightY = mouseY - (spotlightYSize / 2) - titleRect.top;
      
      // Set x and y position of spotlight
      const element = titleElement as HTMLElement;
      element.style.backgroundPosition = spotlightX + 'px ' + spotlightY + 'px';
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [spotlightXSize, spotlightYSize ]);

  return (
    <main className="title-wrapper">
      <h1 className={`title ${myFont.className}`}>GOALS</h1>
      <h1 className={`title-placeholder ${myFont.className}`}>GOALS</h1>
    </main>
  );
};
