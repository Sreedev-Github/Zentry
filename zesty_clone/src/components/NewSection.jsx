import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const texts = [
  {
    number: "01",
    title: "Shaping Zentry Collectively",
    text: "Participate in governance, influence key decisions in the ever-growing Zentry Universe that is limited only by people's imaginations",
  },
  {
    number: "02",
    title: "Unlocking Economic Opportunity",
    text: "ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops, quotas, and co-creation within and beyond Zentry ecosystem.",
  },
  {
    number: "03",
    title: "Sharing Value Accrued",
    text: "ZENT holders thrive as Zentry grows, benefiting from the expansive partnerships, treasury investment and economic activities.",
  },
];

const NewSection = () => {
  const containerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const textRef = useRef(null);
  const contentRefs = useRef([]);
  const indicatorRefs = useRef([]);

  useEffect(() => {
    // Clear previous animations

    // Create a timeline for the accordion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // Adjust based on content height
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    texts.forEach((_, index) => {
      const content = contentRefs.current[index];
      const indicator = indicatorRefs.current[index];

      // Set initial state
      gsap.set(content, { height: 0, opacity: 0, display: "none" });
      gsap.set(indicator, { height: "0%" });

      // Expand
      tl.to(content, {
        height: "auto",
        opacity: 1,
        display: "flex",
        duration: 0.5,
        ease: "power2.out",
      });
      tl.to(
        indicator,
        {
          height: "100%",
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Hold
      tl.to({}, { duration: 0.5 });

      // Collapse
      tl.to(content, {
        height: 0,
        opacity: 0,
        display: "none",
        duration: 0.5,
        ease: "power2.inOut",
      });
      tl.to(
        indicator,
        {
          height: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.5"
      );
    });

    // Background color change logic
    const handleScroll = () => {
      if (textRef.current && ScrollTrigger.isInViewport(textRef.current, 0.5)) {
        gsap.to(".changing-bg", { backgroundColor: "#EDFF66", duration: 0.4 });
        gsap.to(".changing-text-story", { color: "black", duration: 0.4 });
        gsap.to(".changing-btn-story", {
          color: "white",
          backgroundColor: "black",
          duration: 0.4,
        });
        // Target the specific animated words in this section
        gsap.to(".section-title .animated-word", {
          color: "black",
          duration: 0.4,
          overwrite: "auto",
        });
      } else {
        gsap.to(".changing-bg", { backgroundColor: "black", duration: 0.4 });
        gsap.to(".changing-text-story", { color: "white", duration: 0.4 });
        gsap.to(".changing-btn-story", {
          color: "black",
          backgroundColor: "white",
          duration: 0.4,
        });
        // Target the specific animated words in this section
        gsap.to(".section-title .animated-word", {
          color: "white",
          duration: 0.4,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    // Debug logging for animation targeting
    console.log(
      "Section title elements found:",
      document.querySelectorAll(".section-title .animated-word").length
    );

    // Force initial state based on current background
    setTimeout(() => {
      const initialState = window.getComputedStyle(
        containerRef.current
      ).backgroundColor;
      console.log("Initial background state:", initialState);

      if (initialState.includes("0, 0, 0") || initialState === "black") {
        // If background is black, make text white
        gsap.set(".section-title .animated-word", { color: "white" });
      }
    }, 100);
  }, []);

  return (
    <div
      ref={containerRef}
      className="changing-bg flex flex-col w-full relative min-h-screen overflow-hidden px-6 md:px-[4.5rem]"
    >
      {/* Title Section */}
      <div
        ref={titleContainerRef}
        className="flex flex-col text-left w-full justify-start py-10 z-10"
      >
        <div ref={textRef}>
          <AnimatedTitle
            title="THE UNIVERSE <br/>POWERED BY ZENT"
            containerClass="mt-5 section-title items-start !pl-0"
            left={true}
          />
          <Button
            id="realm-button"
            title="ENTER VAULT"
            containerClass="mt-10 mx-auto sm:mx-0 lg:ml-10 md:ml-0 changing-btn-story"
          />
        </div>
      </div>

      {/* Text Blocks */}
      <div className="mt-auto flex flex-col gap-10 mb-20">
        {texts.map((text, index) => (
          <div key={index}>
            {/* Header */}
            <div className="flex items-center gap-4">
              <p className="text-sm changing-text">{text.number}</p>
              <p className="text-lg font-semibold changing-text">
                {text.title}
              </p>
            </div>

            {/* Expandable Content */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden flex items-start gap-6 mt-2"
              style={{
                height: 0,
                opacity: 0,
                display: "none",
              }}
            >
              <div className="h-20 w-2 bg-gray-300 rounded-full overflow-hidden relative">
                <div
                  ref={(el) => (indicatorRefs.current[index] = el)}
                  className="absolute bottom-0 w-full bg-black rounded-full"
                  style={{ height: "0%" }}
                ></div>
              </div>
              <p className="changing-text text-sm w-96">{text.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewSection;
