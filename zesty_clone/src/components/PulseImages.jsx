import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const PulseImages = ({
  index,
  imageSrc,
  isMobile,
  activeImage,
  setActiveImage,
  handleSquareInteraction,
}) => {
  const imageRef = useRef(null);
  const imgElementRef = useRef(null);

  // Check if this image is the active one
  const isActive = activeImage === index;

  useEffect(() => {
    // Initial setup
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        display: "none",
      });
    }

    if (imgElementRef.current) {
      gsap.set(imgElementRef.current, {
        scale: 1.5,
        transformOrigin: "center center",
      });
    }
  }, []);

  // Effect to handle showing/hiding based on active state
  useEffect(() => {
    if (isMobile) {
      if (isActive && imageRef.current) {
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          display: "block",
        });
      } else if (!isActive && imageRef.current) {
        gsap.to(imageRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (imageRef.current) {
              gsap.set(imageRef.current, { display: "none" });
            }
          },
        });
      }
    }
  }, [isMobile, isActive]);

  // Handle mouse enter animation
  const handleMouseEnter = () => {
    if (!isMobile && imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
    }
  };

  // Handle mouse leave animation
  const handleMouseLeave = () => {
    if (!isMobile && imageRef.current) {
      // Reset container rotation
      gsap.to(imageRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Reset image position when leaving
      if (imgElementRef.current) {
        gsap.to(imgElementRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (imageRef.current) {
            gsap.set(imageRef.current, { display: "none" });
          }
        },
      });
    }
  };

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    if (!isMobile && imageRef.current && imgElementRef.current) {
      const container = imageRef.current;
      const img = imgElementRef.current;

      // Get container dimensions and position
      const rect = container.getBoundingClientRect();

      // Calculate mouse position as percentage (-0.5 to 0.5)
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

      const maxMove = 100; // Maximum movement amount

      // Calculate rotation values
      const maxRotation = 20;
      const rotationX = -yPercent * maxRotation; // Inverse Y for natural feel
      const rotationY = xPercent * maxRotation;

      // Apply movement and rotation with GSAP
      gsap.to(container, {
        rotationX: rotationX,
        rotationY: rotationY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Apply movement to the inner image
      gsap.to(img, {
        x: -xPercent * maxMove,
        y: -yPercent * maxMove,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  // Direct click handler for mobile
  const handlePulseClick = () => {
    if (isMobile) {
      // Simply toggle active state for this index
      setActiveImage(isActive ? null : index);
    }
  };

  return (
    <>
      <span
        className="animated-title-square pulse-square inline-flex items-center justify-center w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-sm md:rounded-lg cursor-pointer"
        onClick={handlePulseClick}
        onMouseEnter={() => !isMobile && handleMouseEnter()}
        onMouseLeave={() => !isMobile && handleMouseLeave()}
      />

      <div
        ref={imageRef}
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
          transformStyle: "preserve-3d",
          perspective: "1000px",
          transformOrigin: "center center",
          borderRadius: "0.5rem",
          willChange: "transform",
        }}
        onMouseEnter={() => !isMobile && handleMouseEnter()}
        onMouseLeave={() => !isMobile && handleMouseLeave()}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgElementRef}
          className="w-full h-full object-cover rounded-lg border-2 border-black"
          src={imageSrc}
          alt={`Pulse image ${index + 1}`}
          style={{
            transformOrigin: "center center",
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
};

export default PulseImages;
