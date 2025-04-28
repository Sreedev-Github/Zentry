import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  const imageRefs = useRef({});
  const imgElementRefs = useRef({});
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
        const imageElement = imageRefs.current[activeImage];
        if (
          imageElement &&
          !imageElement.contains(e.target) &&
          !e.target.classList.contains("pulse-square")
        ) {
          handleMouseLeave(activeImage);
          setActiveImage(null);
        }
      }
    };

    // Add scroll listener to hide images when scrolling
    const handleScroll = () => {
      if (isMobile && activeImage !== null) {
        handleMouseLeave(activeImage);
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
      // GSAP animations for text (unchanged)
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

      // Hide all image containers initially
      for (let i = 0; i < pulseCount; i++) {
        if (imageRefs.current[i]) {
          gsap.set(imageRefs.current[i], {
            opacity: 0,
            scale: 0.9,
            display: "none",
          });

          // Set images to be larger than their containers
          if (imgElementRefs.current[i]) {
            gsap.set(imgElementRefs.current[i], {
              scale: 1.5, // Scale the image larger than container
              transformOrigin: "center center",
            });
          }
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [left, squares, pulseCount, imagesLoaded]);

  // Handle square interaction based on device type
  const handleSquareInteraction = (index) => {
    if (isMobile) {
      // On mobile, toggle the active image
      if (activeImage === index) {
        handleMouseLeave(index);
        setActiveImage(null);
      } else {
        // If there's an active image already, hide it
        if (activeImage !== null) {
          handleMouseLeave(activeImage);
        }
        handleMouseEnter(index);
        setActiveImage(index);
      }
    } else {
      // On desktop, just show the image (hover will handle this)
      handleMouseEnter(index);
    }
  };

  // GSAP animation for hover effects
  const handleMouseEnter = (index) => {
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
    }
  };

  // Add the handleMouseLeave function

  const handleMouseLeave = (index) => {
    if (imageRefs.current[index]) {
      // Reset container rotation
      gsap.to(imageRefs.current[index], {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset image position when leaving
      if (imgElementRefs.current[index]) {
        gsap.to(imgElementRefs.current[index], {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      gsap.to(imageRefs.current[index], {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(imageRefs.current[index], { display: "none" });
        },
      });
    }
  };

  // Handle mouse movement to pan and tilt the image
  const handleMouseMove = (e, index) => {
    if (!isMobile && imageRefs.current[index]) {
      const container = imageRefs.current[index];
      const img = imgElementRefs.current[index];

      if (!container || !img) return;

      // Get container dimensions and position
      const rect = container.getBoundingClientRect();

      // Calculate mouse position as percentage (-0.5 to 0.5)
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

      const maxMove = 100; // Increase this to cover more area and increase the effect

      // Calculate rotation values
      const maxRotation = 20; // Increased from 10 to 20 degrees for more tilt
      const rotationX = -yPercent * maxRotation; // Inverse Y for natural feel
      const rotationY = xPercent * maxRotation;

      // Apply movement and rotation with GSAP
      gsap.to(container, {
        rotationX: rotationX,
        rotationY: rotationY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        duration: 0.3, // Faster response time (0.5 → 0.3)
        ease: "power2.out",
        overwrite: "auto",
      });

      // Apply movement to the inner image
      gsap.to(img, {
        x: -xPercent * maxMove,
        y: -yPercent * maxMove,
        duration: 0.3, // Faster response time
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

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
                      <span
                        className="animated-word pulse-square inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black rounded-md cursor-pointer"
                        onClick={() => handleSquareInteraction(currentCounter)}
                        onMouseEnter={() =>
                          !isMobile && handleMouseEnter(currentCounter)
                        }
                        onMouseLeave={() =>
                          !isMobile && handleMouseLeave(currentCounter)
                        }
                      />

                      <div
                        ref={(el) => (imageRefs.current[currentCounter] = el)}
                        className="pulse-image-container absolute overflow-hidden border-2 border-black"
                        style={{
                          width: "calc(12rem + 10vw)",
                          maxWidth: "20rem",
                          height: "calc(12rem + 10vw)",
                          maxHeight: "20rem",
                          zIndex: 999,
                          opacity: 0,
                          display: "none",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          transformStyle: "preserve-3d", // Enable 3D transformations
                          perspective: "1000px", // Add perspective
                          transformOrigin: "center center",
                          borderRadius: "0.5rem", // Add rounded corners
                          willChange: "transform", // Performance optimization
                        }}
                        onMouseEnter={() =>
                          !isMobile && handleMouseEnter(currentCounter)
                        }
                        onMouseLeave={() =>
                          !isMobile && handleMouseLeave(currentCounter)
                        }
                        onMouseMove={(e) => handleMouseMove(e, currentCounter)}
                      >
                        <img
                          ref={(el) =>
                            (imgElementRefs.current[currentCounter] = el)
                          }
                          className="w-full h-full object-cover rounded-lg border-2 border-black"
                          src={imageSrc[currentCounter % imageSrc.length]}
                          alt={`Pulse image ${currentCounter + 1}`}
                          style={{
                            transformOrigin: "center center",
                            willChange: "transform", // Performance optimization
                          }}
                        />
                      </div>
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
