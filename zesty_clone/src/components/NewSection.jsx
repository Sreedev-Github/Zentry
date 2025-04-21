import React, { useRef, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./Button";

// Make sure to register the plugin
gsap.registerPlugin(ScrollTrigger);

const NewSection = () => {
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Color change effect based on scroll position
    const handleScroll = () => {
      if (textRef.current) {
        // Check if 50% of the element is in viewport
        if (ScrollTrigger.isInViewport(textRef.current, 0.5)) {
          // Target all elements with changing-bg class
          gsap.to(".changing-bg", {
            backgroundColor: "#EDFF66",
            duration: 0.4,
          });

          // Change story text
          gsap.to(".changing-text-story", {
            color: "black",
            duration: 0.4,
          });

          gsap.to(".changing-btn-story", {
            color: "white",
            backgroundColor: "black",
            duration: 0.4,
          });
        } else {
          // Return all changing-bg elements back to their color
          gsap.to(".changing-bg", {
            backgroundColor: "black",
            duration: 0.4,
          });
          gsap.to(".changing-text-story", {
            color: "white", // Changed from "text-violet-50" to actual CSS color
            duration: 0.4,
          });
          gsap.to(".changing-btn-story", {
            color: "black",
            backgroundColor: "white", // Changed from "text-violet-50" to actual CSS color
            duration: 0.4,
          });
        }
      }
    };

    // Create pin effect for scroll hijacking
    if (sectionRef.current) {
      // Create the pin effect using ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", // Start pinning when top of section hits top of viewport
        end: "+=300%", // Pin for 300% of the section's height
        pin: true, // Enable pinning
        pinSpacing: true, // Maintain the original height
        scrub: 1, // Smooth scrubbing effect with 1 second lag
        onEnter: () => {
          // When entering the section
          gsap.to(".changing-bg", {
            backgroundColor: "#EDFF66",
            duration: 0.4,
          });
        },
        onLeaveBack: () => {
          // When scrolling back up out of the section
          gsap.to(".changing-bg", {
            backgroundColor: "black",
            duration: 0.4,
          });
        },
      });

      // Create a scroll indicator animation that fills based on scroll progress
      gsap.to(".scroll-indicator-fill", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
        },
        height: "100%",
        ease: "power2.out",
      });
    }

    // Add the scroll event listener for color changes
    window.addEventListener("scroll", handleScroll);

    // Initial check in case element is already in view when page loads
    handleScroll();

    // Clean up the event listener and ScrollTrigger instances
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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

        <div className="flex flex-col items-start justify-center mb-40 gap-4">
          <div className="flex flex-row gap-20 md:ml-[4.5rem] items-center">
            <p className="font-general">01</p>
            <p className="font-circular-web text-3xl">
              Shaping Zentry Collectively
            </p>
          </div>
          <div className="flex flex-row gap-20 md:ml-[4.5rem] items-center">
            <div className="h-20 w-2 bg-gray-300 rounded-full overflow-hidden relative">
              <div
                className="absolute bottom-0 w-full bg-slate-900 rounded-full transition-all duration-100 ease-out scroll-indicator-fill"
                style={{ height: "0%" }}
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
