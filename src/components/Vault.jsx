import React, { useRef, useEffect, useState } from "react";
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

const Vault = () => {
  const containerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const textRef = useRef(null);
  const contentRefs = useRef([]);
  const indicatorRefs = useRef([]);
  const videoRef = useRef(null);
  const [activeText, setActiveText] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    texts.forEach((_, index) => {
      const content = contentRefs.current[index];
      const indicator = indicatorRefs.current[index];
      gsap.set(content, { height: 0, opacity: 0, display: "none" });
      gsap.set(indicator, { height: "0%" });

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
      tl.to({}, { duration: 0.2 });
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
      const whoWeAreSection = document.querySelector("#WhoWeAre");
      const newSection = document.querySelector("#NewSection");
      const vaultSection = containerRef.current;

      // Get the current scroll position and viewport dimensions
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate the vault section's position
      const vaultRect = vaultSection.getBoundingClientRect();
      const vaultTop = scrollY + vaultRect.top;
      const vaultBottom = scrollY + vaultRect.bottom;

      // Only apply color changes if we're within a certain range of the Vault section
      // (within 1 viewport height above or below)
      const nearVault =
        scrollY >= vaultTop - viewportHeight &&
        scrollY <= vaultBottom + viewportHeight;

      if (!nearVault) {
        // If we're not near the Vault section, don't affect background colors
        return;
      }

      // Additional check for WhoWeAre and NewSection sections
      if (
        (whoWeAreSection && ScrollTrigger.isInViewport(whoWeAreSection, 0.1)) ||
        (newSection && ScrollTrigger.isInViewport(newSection, 0.1))
      ) {
        // Let other sections handle their own background color
        return;
      }

      // Check if Vault title is in viewport
      if (textRef.current && ScrollTrigger.isInViewport(textRef.current, 0.5)) {
        // When Vault title is in view - yellow background
        gsap.to(".changing-bg", { backgroundColor: "#EDFF66", duration: 0.4 });
        gsap.to(".changing-text-story", { color: "black", duration: 0.4 });
        gsap.to(".changing-btn-story", {
          color: "white",
          backgroundColor: "black",
          duration: 0.4,
        });
        gsap.to(".section-title .animated-word", {
          color: "black",
          duration: 0.4,
          overwrite: "auto",
        });
      } else if (vaultRect.bottom < 0 && vaultRect.bottom > -viewportHeight) {
        // Only maintain yellow when we're just past Vault but not too far
        gsap.to(".changing-bg", { backgroundColor: "#EDFF66", duration: 0.3 });
      } else if (vaultRect.top > 0) {
        // Only when approaching Vault from above - black background
        gsap.to(".changing-bg", { backgroundColor: "black", duration: 0.3 });
        gsap.to(".changing-text-story", { color: "white", duration: 0.3 });
        gsap.to(".changing-btn-story", {
          color: "black",
          backgroundColor: "white",
          duration: 0.4,
        });
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

  // Detect which content is visible and update activeText accordingly
  useEffect(() => {
    const handleActiveText = () => {
      const section = containerRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // If section is below the viewport (user hasn't reached it yet)
      if (rect.top > vh - 50) {
        setActiveText(0);
        return;
      }

      // If section is above the viewport (user has scrolled past)
      if (rect.bottom < 50) {
        setActiveText(texts.length - 1);
        return;
      }

      // Otherwise, find the last visible content
      let lastVisible = -1;
      for (let i = 0; i < contentRefs.current.length; i++) {
        const el = contentRefs.current[i];
        if (!el) continue;
        const style = window.getComputedStyle(el);
        if (style.display !== "none" && parseFloat(style.opacity) > 0.5) {
          lastVisible = i;
        }
      }
      if (lastVisible !== -1) {
        setActiveText(lastVisible);
      } else {
        setActiveText(0);
      }
    };

    window.addEventListener("scroll", handleActiveText);
    handleActiveText();

    return () => window.removeEventListener("scroll", handleActiveText);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = `videos/symbol_${activeText + 1}@lg.webm`;
      videoRef.current.play();
    }
  }, [activeText]);

  useEffect(() => {
    console.log(contentRefs.current);
  }, [contentRefs, indicatorRefs]);

  useEffect(() => {
    // Force initial state based on current background
    setTimeout(() => {
      const initialState = window.getComputedStyle(
        containerRef.current
      ).backgroundColor;

      if (initialState.includes("0, 0, 0") || initialState === "black") {
        // If background is black, make text white
        gsap.set(".section-title .animated-word", { color: "white" });
      }
    }, 100);
  }, []);

  //Change video source based on which text is expanded

  return (
    <div
      ref={containerRef}
      className="changing-bg flex flex-col justify-between w-full min-h-screen overflow-hidden px-6 md:px-[4.5rem]"
    >
      {/* Top Section: Title and Button */}
      <div
        ref={titleContainerRef}
        className="flex flex-col text-left w-full justify-start py-10 z-10"
      >
        <div ref={textRef}>
          <AnimatedTitle
            title="THE UNIVERSE <br/>POWERED BY ZENT"
            containerClass=" !text-3xl md:!text-7xl section-title items-start !pl-0"
            left={true}
          />
          <Button
            id="realm-button"
            title="ENTER VAULT"
            containerClass="mt-10 mx-auto sm:mx-0 changing-btn-story"
          />
        </div>
      </div>

      {/* Bottom Section: Text Blocks and Video */}
      <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-end gap-10 my-10 md:my-20">
        {/* Left Side: Text Blocks */}
        <div className="flex flex-col gap-10 flex-1">
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

        {/* Right Side: Video (Only on lg and above) */}
        <div className="hidden lg:flex items-center justify-center w-full lg:w-1/3 lg:self-center">
          <video
            ref={videoRef}
            src={`videos/symbol_${activeText + 1}@lg.webm`}
            autoPlay
            loop
            muted
            className="w-full max-w-[500px] object-contain"
            playsInline
            onError={(e) => console.error("Video loading error:", e)}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Vault;
