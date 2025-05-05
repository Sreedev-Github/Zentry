import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    // Set initial border radius using px units for consistency
    gsap.set(button, { borderRadius: "9999px" });

    const handleMouseEnter = () => {
      gsap.to(button, {
        borderRadius: "4px", // Use px units for smooth interpolation
        transform:
          "perspective(1000px) rotateX(0deg) rotateY(20deg) translateZ(0)",
        duration: 0.3,
        ease: "sine.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        borderRadius: "9999px", // Use px units for smooth interpolation
        transform:
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)",
        duration: 0.3,
        ease: "sine.out",
      });
    };

    // Add event listeners
    if (button) {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    // Clean up event listeners
    return () => {
      if (button) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      style={{
        // Remove borderRadius here, GSAP will handle it
        willChange: "transform, border-radius",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
