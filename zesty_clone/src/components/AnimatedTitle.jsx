import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({
  title,
  containerClass,
  left = false,
  squares = false,
}) => {
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

      // Add pulse animation if enabled
      if (squares) {
        gsap.to(".pulse-square", {
          scale: 1.2,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    }; // Cleanup function to revert the context
  }, [left, squares]);

  // Process the title to handle both <br/> tags and [pulse] markers
  const processTitle = (title) => {
    // First split by <br/> to get the lines
    return title.split("<br/>").map((line, lineIndex) => {
      // Check if the line contains [pulse] marker
      const parts = line.split("[pulse]");

      if (parts.length === 1) {
        // No [pulse] in this line, render normally
        return (
          <div
            key={lineIndex}
            className={`flex-center max-w-full flex-wrap gap-2 md:gap-3 ${
              left ? "" : "px-10"
            }`}
          >
            {parts[0].split(" ").map((word, i) => (
              <span
                key={i}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </div>
        );
      } else {
        // Line contains [pulse], handle it with a simple pulsing square
        return (
          <div
            key={lineIndex}
            className={`flex-center max-w-full flex-wrap gap-2 md:gap-3 ${
              left ? "" : "px-10"
            }`}
            style={{ position: "relative" }}
          >
            {parts.map((part, partIndex) => (
              <React.Fragment key={partIndex}>
                {part
                  .split(" ")
                  .map(
                    (word, wordIndex) =>
                      word.trim() && (
                        <span
                          key={`${partIndex}-${wordIndex}`}
                          className="animated-word"
                          dangerouslySetInnerHTML={{ __html: word }}
                        />
                      )
                  )}
                {partIndex < parts.length - 1 && (
                  <span className="animated-word inline-flex items-center">
                    <span className="pulse-square inline-block w-12 h-12 bg-black rounded-md mx-10" />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        );
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className={`animated-title ${containerClass} relative`}
    >
      {processTitle(title)}
    </div>
  );
};

export default AnimatedTitle;
