import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


    loadSVG();
  }, []);

  useGSAP(
    () => {
      if (!svgLoaded) return;

      const svg = containerRef.current.querySelector("svg");

      if (svg) {
        gsap.set(["#bathroom", "#bedroom", "#border"], { opacity: 0 });

        gsap.set(["#border"], {
          opacity: 0,
          x: -200,
        });

        gsap.set(["#bathroom"], {
          opacity: 0,
          y: -200,
        });
      }

      //   Animation
      const runAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "+=3000",
          scrub: 1.5,
          pin: true,
        },
      });

      runAnimation
        .addLabel("start")
        .add([
          gsap.to("#border", {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power1.out",
          }),
        ])
        .addLabel("border")
        .add([
          gsap.to("#bathroom", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power1.out",
          }),
        ])
        .addLabel("bathroom");

      animationRef.current = runAnimation;

      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [svgLoaded] },
  );

  const handleButtonClick = (label) => {
    if (animationRef.current) {
      animationRef.current.tweenTo(label);
    }
  };

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

export default HouseScroll;
