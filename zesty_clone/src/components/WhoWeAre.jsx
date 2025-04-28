import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const sectionRef = useRef(null);

  // Change the background color when this section is in view port
  useEffect(() => {
    const handleScroll = () => {
      if (ScrollTrigger.isInViewport(sectionRef.current, 0.3)) {
        gsap.to(".changing-bg", { backgroundColor: "#DFDFF2", duration: 0.4 });
      }
      // Remove the 'else' clause to not change background when scrolling away
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Don't kill all scroll triggers to avoid affecting other components
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="changing-bg WhoWeAre flex flex-col items-center justify-center py-16 sm:py-24 md:py-36 lg:py-52"
    >
      <p className="font-robert-regular text-xs sm:text-sm">WHO WE ARE</p>
      <AnimatedTitle
        title="We're b<b>u</b>ilding <br/> a new [pulse] realit<b>y</b> <br/> that rew<b>a</b>rds <br/> play<b>e</b>rs [pulse] and <br/> e<b>m</b>powersc<br/> hu<b>m</b>ans & AI <br/> to [pulse] thri<b>v</b>e"
        containerClass="mt-10 sm:mt-12 md:mt-16 lg:mt-20 !text-black !text-4xl sm:!text-5xl md:!text-7xl lg:!text-8xl xl:!text-9xl !font-weight-900 !leading-[0.82] tracking-[-0.01em]"
        squares={true}
        left
      />
    </div>
  );
};

export default WhoWeAre;
