import React, { useRef, useEffect, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./Button";

// Make sure to register the plugin
gsap.registerPlugin(ScrollTrigger);

const NewSection = () => {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Control how much scrolling is needed to fill the indicator (0-1)
  // 0.5 means indicator fills halfway through the page scroll
  const scrollFillThreshold = 0.7;

  useEffect(() => {
    // Create a scroll event listener
    const handleScroll = () => {
      if (textRef.current) {
        // Check if 10% of the element is in viewport
        if (ScrollTrigger.isInViewport(textRef.current, 0.1)) {
          // Target all elements with changing-bg class
          gsap.to(".changing-bg", {
            backgroundColor: "#EDFF66",
            duration: 0.1,
          });

          // Change story text
          gsap.to(".changing-text-story", {
            color: "black",
            duration: 0.1,
          });

          gsap.to(".changing-btn-story", {
            color: "white",
            backgroundColor: "black",
            duration: 0.1,
          });
        } else {
          // Return all changing-bg elements back to their color
          gsap.to(".changing-bg", {
            backgroundColor: "black",
            duration: 0.1,
          });
          gsap.to(".changing-text-story", {
            color: "text-violet-50",
            duration: 0.1,
          });
          gsap.to(".changing-btn-story", {
            color: "black",
            backgroundColor: "text-violet-50",
            duration: 0.1,
          });
        }
      }

      // Calculate scroll progress for the indicator
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = Math.min(
        scrollTop / (scrollHeight * scrollFillThreshold),
        1
      );
      setScrollProgress(scrollPercentage * 100);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check in case element is already in view when page loads
    handleScroll();

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollFillThreshold]);

  return (
    <div
      ref={sectionRef}
      className="relative changing-bg flex flex-row w-full h-screen"
    >
      <div className="flex flex-col text-left w-full h-full justify-between">
        <div ref={textRef} className="space-y-8">
          <AnimatedTitle
            title="The Univ<b>e</b>rse <br/>Powered by Ze<b>n</b>t"
            containerClass="mt-5 !text-black items-start text-left md:!-ml-24"
            left={true}
          />
          <Button
            id="realm-button"
            title="ENTER VAULT"
            containerClass="ml-10 md:ml-[4.5rem] changing-btn-story"
          />
        </div>

        <div className="flex flex-col items-start justify-center mb-60 gap-4">
          <div className="flex flex-row gap-16 md:ml-[4.5rem] items-center">
            <p className="font-general">01</p>
            <p className="font-circular-web text-3xl">
              Shaping Zentry Collectively
            </p>
          </div>
          <div className="flex flex-row gap-20 md:ml-[4.5rem] items-center">
            <div className="h-20 w-2 bg-gray-300 rounded-full overflow-hidden relative">
              <div
                className="absolute bottom-0 w-full bg-slate-900 rounded-full transition-all duration-100 ease-out"
                style={{ height: `${scrollProgress}%` }}
              ></div>
            </div>
            <p className="text-slate-900 w-96">
              Participate in governance, influence key decisions in the
              ever-growing Zentry Universe that is limited only by people's
              imaginations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSection;
