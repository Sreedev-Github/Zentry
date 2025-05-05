import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brandNames = [
  {
    name: "YZiLabs",
    logo: "img/YZiLabs.webp",
  },
  {
    name: "Coinbase Ventures",
    logo: "img/Coinbase_Ventures.webp",
  },
  {
    name: "Pantera Capital",
    logo: "img/Pantera_Capital.webp",
  },
  {
    name: "DeFiance Capital",
    logo: "img/DeFiance_Capital.webp",
  },
  {
    name: "Animoca Brands",
    logo: "img/Animoca_Brands.webp",
  },
  {
    name: "SkyVision Capital",
    logo: "img/SkyVision_Capital.webp",
  },
  {
    name: "Play Venture",
    logo: "img/Play_Venture.webp",
  },
  {
    name: "Vessel Capital",
    logo: "img/Vessel_Capital.webp",
  },
  {
    name: "Arche Fund",
    logo: "img/Arche_Fund.webp",
  },
  {
    name: "Marblex",
    logo: "img/Marblex.webp",
  },
  {
    name: "Fnatic",
    logo: "img/Fnatic.webp",
  },
  {
    name: "XSET",
    logo: "img/XSET.webp",
  },
  {
    name: "Jambo",
    logo: "img/Jambo.webp",
  },
  {
    name: "AWS",
    logo: "img/AWS.webp",
  },
];

const brands = [];

const NewSection = () => {
  const sectionRef = useRef(null);
  const leftTextCol = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Background color change
    gsap.to(".changing-bg", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      backgroundColor: "black",
      duration: 0.4,
    });

    // Only apply pinning on larger screens
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Function to create/destroy pins based on screen size
    const handleScreenSizeChange = () => {
      if (mediaQuery.matches) {
        // Calculate appropriate end position based on content height
        const centerColHeight = centerColRef.current.offsetHeight;

        // Pinning the left text column (only on lg screens)
        ScrollTrigger.create({
          id: "leftPin",
          trigger: sectionRef.current,
          start: "top 35%",
          end: `+=${centerColHeight - 300}`,
          pin: leftTextCol.current,
          pinSpacing: false,
        });

        // Pinning the right logos column
        ScrollTrigger.create({
          id: "rightPin",
          trigger: sectionRef.current,
          start: "top 35%",
          end: `+=${centerColHeight - 300}`,
          pin: rightColRef.current,
          pinSpacing: false,
        });
      } else {
        // Kill pin ScrollTriggers on small screens
        ScrollTrigger.getById("leftPin")?.kill();
        ScrollTrigger.getById("rightPin")?.kill();
      }
    };

    // Initial call and add listener
    handleScreenSizeChange();
    mediaQuery.addEventListener("change", handleScreenSizeChange);

    // Highlight center text as it becomes centered in the viewport
    const brandItems = gsap.utils.toArray(".brand-item");
    brandItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // Existing scroll logic for background and text color changes
    const handleScroll = () => {
      if (ScrollTrigger.isInViewport(sectionRef.current, 0.1)) {
        gsap.to(".changing-bg", {
          backgroundColor: "black",
          duration: 0.4,
        });

        const whoWeAreWords = document.querySelectorAll(
          ".who-we-are-title .animated-word"
        );
        whoWeAreWords.forEach((el) => {
          gsap.to(el, {
            color: "white",
            delay: 0.01,
            overwrite: true,
            immediateRender: true,
          });
        });

        gsap.to(".who-we-are-text", {
          color: "white",
          delay: 0.01,
          overwrite: true,
          immediateRender: true,
        });

        gsap.to(".who-we-are-button", {
          backgroundColor: "white",
          color: "black",
          delay: 0.01,
          overwrite: true,
          immediateRender: true,
        });

        document.querySelectorAll(".animated-title-square").forEach((el) => {
          el.classList.add("white");
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleScreenSizeChange);
      ScrollTrigger.getById("leftPin")?.kill();
      ScrollTrigger.getById("rightPin")?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="NewSection"
      className="relative w-full text-violet-50 changing-bg px-6 md:px-12 lg:px-20 py-16 border-none"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Left column with intro text - pinned */}
        <div
          ref={leftTextCol}
          className="lg:col-span-4 lg:col-start-1 flex items-center h-fit"
        >
          <p className="text-lg font-light max-w-md">
            Our backers include top-tier VCs, funds, and companies, providing
            expertise, network and resources to fuel our project's success.
          </p>
        </div>

        {/* Middle column with brands list - scrollable */}
        <div
          ref={centerColRef}
          className="lg:col-span-6 lg:col-start-5 relative"
        >
          <p className="text-4xl md:text-5xl text-left font-black text-violet-50 opacity-100 mb-6 special-font font-zentry">
            O<b>U</b>R BRAND
          </p>
          <ul className="flex flex-col items-start list-none p-0 m-0 space-y-6">
            {brandNames.map((item, index) => (
              <li
                key={index}
                className={`brand-item text-3xl md:text-4xl lg:text-5xl text-left font-black font-zentry transition-colors duration-300 ${
                  index === activeIndex ? "text-yellow-400" : "text-violet-50"
                }`}
              >
                {item.name.toUpperCase()}
              </li>
            ))}
          </ul>
          {/* Smaller padding instead of full screen height */}
          <div className="h-40"></div>
        </div>

        {/* Right column for logos - pinned and hidden on sm/md screens */}
        <div
          ref={rightColRef}
          className="hidden lg:block lg:col-span-2 lg:col-start-11 h-fit"
        >
          <div className="flex items-center justify-center p-4">
            {brandNames.map((item, index) => (
              <img
                src={item.logo}
                alt={item.name}
                key={index}
                className={`w-full h-auto max-w-[150px] max-h-[120px] object-contain transition-opacity duration-300 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 hidden"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSection;
