import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import React from "react";

gsap.registerPlugin(useGSAP);

const House = () => {
  const containerRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const animationRef = useRef(null);
};

const Building = () => {
  return (
    <div>
      {" "}
      <div
        ref={containerRef}
        className="bg-gray-100 w-full [&>svg]:w-full h-screen [&>svg]:h-full [&>svg]:object-center overflow-hidden"
      ></div>
      {!svgLoaded && <div>Loading ...</div>}
    </div>
  );
};

export default Building;
