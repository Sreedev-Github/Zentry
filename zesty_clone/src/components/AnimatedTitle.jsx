import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedTitle = ({ title, containerClass, left = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // ctx is short for context
    const ctx = gsap.context(() => {
      // Set initial position based on the left prop
      if (left) {
        gsap.set(".animated-word", {
          opacity: 0,
          transform:
            "translate3d(-100px, 51px, -60px) rotateY(-60deg) rotateX(-40deg)",
        });
      } else {
        // Default right-to-left animation setup
        gsap.set(".animated-word", {
          opacity: 0,
          transform:
            "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
        });
      }

      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => {
      ctx.revert();
    }; // Cleanup function to revert the context
  }, [left]);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br/>").map((line, index) => (
        <div
          key={index}
          className={`flex-center max-w-full flex-wrap gap-2 md:gap-3 ${
            left ? "" : "px-10"
          }`}
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
