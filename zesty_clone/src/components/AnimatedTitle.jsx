import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PulseImages from "./PulseImages";

gsap.registerPlugin(ScrollTrigger);

// Define image sources directly so they're available to the component
const imageSrc = [
  "/img/about-entry-1@md.webp",
  "/img/about-entry-2@md.webp",
  "/img/about-entry-3@md.webp",
];

const AnimatedTitle = ({
  title,
  containerClass,
  left = false,
  squares = false,
}) => {
  const containerRef = useRef(null);
  const [pulseCount, setPulseCount] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the 'md' breakpoint in Tailwind
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add document click listener to close images when clicked outside
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (isMobile && activeImage !== null) {
        // Check if click was outside the active image
        if (
          !e.target.closest(".pulse-image-container") &&
          !e.target.classList.contains("pulse-square")
        ) {
          setActiveImage(null);
        }
      }
    };

    // Add scroll listener to hide images when scrolling
    const handleScroll = () => {
      if (isMobile && activeImage !== null) {
        setActiveImage(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, activeImage]);

  // Count pulse markers on mount and track when component is ready
  useEffect(() => {
    const matches = title.match(/\[pulse\]/g);
    const count = matches ? matches.length : 0;
    setPulseCount(count);

    // Set images as loaded after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [title]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const ctx = gsap.context(() => {
      // GSAP animations for text
      if (left) {
        gsap.set(".animated-word", {
          opacity: 0,
          transform:
            "translate3d(-100px, 51px, -60px) rotateY(-60deg) rotateX(-40deg)",
        });
      } else {
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

      // Pulsing animation for squares
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

    return () => ctx.revert();
  }, [left, squares, pulseCount, imagesLoaded]);

  const processTitle = (title) => {
    let imageCounter = 0;

    return title.split("<br/>").map((line, lineIndex) => {
      const parts = line.split("[pulse]");

      if (parts.length === 1) {
        // No pulse in this line
        return (
          <div
            key={lineIndex}
            className={`flex-center max-w-full flex-wrap gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 relative ${
              left ? "" : "px-4 sm:px-6 md:px-10"
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
        return (
          <div
            key={lineIndex}
            className={`flex-center max-w-full flex-wrap gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 ${
              left ? "" : "px-4 sm:px-6 md:px-10"
            }`}
          >
            {parts.map((part, partIndex) => {
              // Get current counter value before increment
              const currentCounter = imageCounter;

              return (
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
                    <div className="relative inline-flex items-center justify-center mx-2 xs:mx-3 sm:mx-6 md:mx-10">
                      <PulseImages
                        index={currentCounter}
                        imageSrc={imageSrc[currentCounter % imageSrc.length]}
                        isMobile={isMobile}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        handleSquareInteraction={() => {}} // Not needed anymore as PulseImages handles this directly
                      />
                    </div>
                  )}
                  {partIndex < parts.length - 1 && (imageCounter++, null)}
                </React.Fragment>
              );
            })}
          </div>
        );
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className={`animated-title ${containerClass} relative overflow-visible`}
    >
      {processTitle(title)}
    </div>
  );
};

export default AnimatedTitle;
