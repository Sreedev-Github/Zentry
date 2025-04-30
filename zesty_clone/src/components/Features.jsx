import React from "react";
import { useRef, useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BentoTilt = ({ children, className }) => {
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    // Increase these values for more pronounced tilt
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * 5;

    // Apply transform directly using GSAP
    gsap.to(itemRef.current, {
      transform: `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, {
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      className={`border-hsla rounded-lg ${className}`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute top-0 left-0 size-full object-cover object-center rounded-lg" // Removed border-hsla
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">
            {title}
            {description && (
              <p className="mt-3 max-w-64 text-xs md:text-base">
                {description}
              </p>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const featureCardsRef = useRef([]);
  const animatedCardsRef = useRef(new Set()); // Track which cards have been animated

  useEffect(() => {
    // Reset animations when component mounts
    const resetCards = () => {
      featureCardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          rotateX: -10,
          y: 50,
          opacity: 0,
          transformOrigin: "center top",
          transformPerspective: 1000,
        });
      });
      animatedCardsRef.current.clear();
    };

    resetCards();

    // Create ScrollTriggers for each card
    featureCardsRef.current.forEach((card, index) => {
      if (!card) return;

      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=150",
        onEnter: () => {
          // Only animate when scrolling down (card enters from bottom)
          gsap.to(card, {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power1.out",
          });
          animatedCardsRef.current.add(index);
        },
        onLeaveBack: () => {
          // Reset when scrolling up (card leaves from bottom)
          if (animatedCardsRef.current.has(index)) {
            gsap.set(card, {
              rotateX: -10,
              y: 50,
              opacity: 0,
            });
            animatedCardsRef.current.delete(index);
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in an IP-rich product universe where players,
            agentic AI and blockchain lead the new economic paradigm.
          </p>
        </div>

        <div
          ref={(el) => (featureCardsRef.current[0] = el)}
          className="relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
        >
          <BentoTilt className="h-full w-full">
            <BentoCard
              src="videos/feature-1.mp4"
              title={
                <>
                  radia<b>n</b>t
                </>
              }
              description="The game of games app transforming moments across Web2 & Web3 titles into rewards"
            />
          </BentoTilt>
        </div>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <div
            ref={(el) => (featureCardsRef.current[1] = el)}
            className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2"
          >
            <BentoTilt className="h-full w-full">
              <BentoCard
                src="videos/feature-2.mp4"
                title={
                  <>
                    zig<b>m</b>a
                  </>
                }
                description="The NFT collection merging Zentry's IP, AI, and gaming—pushing the boundaries of NFT innovation."
              />
            </BentoTilt>
          </div>

          <div
            ref={(el) => (featureCardsRef.current[2] = el)}
            className="bento-titl_1 row-span-1 ms-32 md:col-span-1 md:ms-0"
          >
            <BentoTilt className="h-full w-full">
              <BentoCard
                src="videos/feature-3.mp4"
                title={
                  <>
                    N<b>E</b>XUS
                  </>
                }
                description="The metagame portal uniting humans & AI to play, complete and earn."
              />
            </BentoTilt>
          </div>

          <div
            ref={(el) => (featureCardsRef.current[3] = el)}
            className="bento-titl_1 me-14 md:col-span-1 md:me-0"
          >
            <BentoTilt className="h-full w-full">
              <BentoCard
                src="videos/feature-4.mp4"
                title={
                  <>
                    AZ<b>U</b>L
                  </>
                }
                description="The agents of agents elevating agentic AI experience to be more fun and productive"
              />
            </BentoTilt>
          </div>

          <div
            ref={(el) => (featureCardsRef.current[4] = el)}
            className="bento-tilt_2"
          >
            <BentoTilt className="h-full w-full">
              <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                <h1 className="bento-title special-font text-black max-w-64">
                  M<b>o</b>re co<b>m</b>ing s<b>o</b>on
                </h1>
                <TiLocationArrow className="m-5 scale-[5] self-end" />
              </div>
            </BentoTilt>
          </div>

          <div
            ref={(el) => (featureCardsRef.current[5] = el)}
            className="bento-tilt_2"
          >
            <BentoTilt className="h-full w-full">
              <video
                src="videos/feature-5.mp4"
                loop
                muted
                autoPlay
                className="size-full object-cover object-center"
              />
            </BentoTilt>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
