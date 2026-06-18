import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HouseScroll = () => {
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

  