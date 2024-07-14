"use client";
import { useEffect, useRef } from "react";

type Props = {
  color?: string;
};

function HoverShinyEffect({ color }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function mouseMoveEvent(e: MouseEvent) {
      const { x } = containerRef.current?.getBoundingClientRect() ?? { x: 0 };
      containerRef.current?.style?.setProperty("--px", String(e.clientX - x));
      color && containerRef.current?.style.setProperty("--color", color);
    }
    containerRef.current?.addEventListener("mousemove", mouseMoveEvent);

    return () => {
      containerRef.current?.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      //   className={styles.shiny_boi}
    ></div>
  );
}

export default HoverShinyEffect;
