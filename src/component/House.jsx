import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const House = () => {
  const containerRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch("house.svg");
        const svgText = await response.text();

        if (containerRef.current) {
          containerRef.current.innerHTML = svgText;

          const svgElement = containerRef.current.querySelector("svg");
          if (svgElement) {
            svgElement.setAttribute("preserveAspectRatio", "xMidYMid slice");
            requestAnimationFrame(() => setSvgLoaded(true));
          }
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    loadSVG();
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="bg-gray-100 w-full [&>svg]:w-full h-screen [&>svg]:h-full [&>svg]:object-center overflow-hidden"
      ></div>

      {!svgLoaded && <div>Loading ...</div>}

      <div className="top-20 left-6 z-50 fixed flex flex-col gap-3">
        <button
          className="bg-gray-800 hover:bg-gray-700 shadow-sm px-4 py-2 rounded-md text-white transition"
          onClick={() => handleButtonClick("border")}
        >
          Border Animation
        </button>

        <button
          className="bg-gray-800 hover:bg-gray-700 shadow-sm px-4 py-2 rounded-md text-white transition"
          onClick={() => handleButtonClick("bathroom")}
        >
          Bathroom Animation
        </button>
      </div>
    </div>
  );
};

export default House;
