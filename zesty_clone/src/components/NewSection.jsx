import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brandNames = [
  "YZiLabs",
  "Coinbase Ventures",
  "Pantera Capital",
  "DeFiance Capital",
  "Animoca Brands",
  "SkyVision Capital",
  "Play Venture",
  "Vessel Capital",
  "Arche Fund",
  "Marblex",
  "Fnatic",
  "XSET",
  "Jambo",
  "AWS",
];

const NewSection = () => {
  const sectionRef = useRef(null);

  // Change the background color when this section is in view port
  useEffect(() => {
    const handleScroll = () => {
      if (ScrollTrigger.isInViewport(sectionRef.current, 0.3)) {
        // Set background to black
        gsap.to(".changing-bg", {
          backgroundColor: "black",
          duration: 0.4,
        });

        gsap.to(".who-we-are-text", {
          color: "white",
          duration: 0.4,
        });

        // Force all who-we-are-title text to be white
        const whoWeAreWords = document.querySelectorAll(
          ".who-we-are-title .animated-word"
        );
        whoWeAreWords.forEach((el) => {
          // Apply the white color directly to override any inline styles
          gsap.to(el, {
            color: "white",
            delay: 0.01,
            overwrite: true,
            immediateRender: true,
          });
        });

        // Add a separate animation specifically for the paragraph text
        gsap.to(".who-we-are-text", {
          color: "white",
          delay: 0.01,
          overwrite: true,
          immediateRender: true,
        });

        // Animate the button
        gsap.to(".who-we-are-button", {
          backgroundColor: "#DFDFF0", // violet-50
          color: "black",
          delay: 0.01,
          overwrite: true,
          immediateRender: true,
        });

        // Simply add the white class to squares - cleaner approach
        document.querySelectorAll(".animated-title-square").forEach((el) => {
          el.classList.add("white");
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
    <section
      ref={sectionRef}
      id="NewSection"
      className="relative grid grid-cols-5 grid-rows-5 gap-10 text-violet-50 w-full changing-bg text-center min-h-screen"
    >
      <div className="col-span-2 row-span-5">
        <p className="text-lg font-light block w-[80%] ml-80">
          Our backers include top-tier VCs, funds, and companies, providing
          expertise, network and resources to fuel our project's success.
        </p>
      </div>
      <div className="col-span-2 row-span-5 col-start-3">
        <div className="flex flex-col items-start ml-40">
          <p>OUR BRAND</p>
          {brandNames.map((name, index) => (
            <div
              key={index}
              className="text-5xl text-left font-black text-violet-50 opacity-100 my-2"
            >
              {name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      <div className="row-span-5 col-start-5">Logos here</div>
    </section>
  );
};

export default NewSection;
