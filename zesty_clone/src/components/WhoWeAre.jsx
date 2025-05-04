import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const sectionRef = useRef(null);

  // Change the background color when this section is in view port
  useEffect(() => {
    const handleScroll = () => {
      // Check if NewSection is in viewport
      const newSection = document.querySelector("#NewSection");

      if (newSection && ScrollTrigger.isInViewport(newSection, 0.1)) {
        // Let NewSection handle its own background
        return;
      }

      if (ScrollTrigger.isInViewport(sectionRef.current, 0.3)) {
        gsap.to(".changing-bg", { backgroundColor: "#DFDFF2", duration: 0.4 });

        // Reset text color to black when in WhoWeAre section
        gsap.to(
          ".animated-title .animated-word, .who-we-are-title .animated-word",
          {
            color: "black",
            duration: 0.3,
            overwrite: "auto",
          }
        );

        // Add a separate animation specifically for the paragraph text
        gsap.to(".who-we-are-text", {
          color: "black",
          duration: 0.3,
          overwrite: "auto",
        });

        // Simply remove the white class from squares - easier and more reliable
        document.querySelectorAll(".animated-title-square").forEach((el) => {
          el.classList.remove("white");
        });

        // Reset button styles
        gsap.to(".who-we-are-button", {
          backgroundColor: "black",
          color: "#DFDFF0", // violet-50
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Don't kill all scroll triggers to avoid affecting other components
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="WhoWeAre"
      className="changing-bg WhoWeAre flex flex-col items-center justify-center sm:py-24 md:py-36 lg:py-40 border-none"
    >
      <p className="font-robert-regular text-xs sm:text-sm">WHO WE ARE</p>
      <AnimatedTitle
        title="We're b<b>u</b>ilding <br/> a new [pulse] realit<b>y</b> <br/> that rew<b>a</b>rds <br/> play<b>e</b>rs [pulse] and <br/> e<b>m</b>powersc<br/> hu<b>m</b>ans & AI <br/> to [pulse] thri<b>v</b>e"
        containerClass="who-we-are-title mt-10 sm:mt-12 md:mt-16 lg:mt-20 !text-black !text-4xl sm:!text-5xl md:!text-7xl lg:!text-8xl xl:!text-9xl !font-weight-900 !leading-[0.82] tracking-[-0.01em]"
        squares={true}
        left
      />
      <p className="font-circular-web who-we-are-text max-w-screen-sm text-sm md:text-xl mt-10 mb-20 text-center">
        Zentry envisions a future where players, emerging tech, and a new
        economy unite at the convergence of gaming and AI.
      </p>
      <Button title="DISCOVER WHO WE ARE" containerClass="who-we-are-button" />
    </div>
  );
};

export default WhoWeAre;
