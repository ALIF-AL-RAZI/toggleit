"use client";
import { useState, useEffect, useRef } from "react";
import Overview from "./Overview";
import About from "./About";
import Team from "./Team";
import Projects from "./Projects";
import ContactUs from "./ContactUs";

const sections = ["What We Do", "About", "Team", "Projects", "Contact Us"];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("What We Do");
  const [underlineStyle, setUnderlineStyle] = useState({
    width: "0",
    left: "0",
  });

  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const currentSection = sections.find((section) => {
        const element = document.getElementById(
          section.toLowerCase().replace(/\s/g, "")
        );
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          );
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  useEffect(() => {
    const updateUnderline = () => {
      const activeTab = tabRefs.current[activeSection];
      if (activeTab) {
        const navElement = activeTab.closest("nav");
        const navRect = navElement?.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();

        if (navRect) {
          setUnderlineStyle({
            width: `${tabRect.width}px`,
            left: `${tabRect.left - navRect.left}px`,
          });
        }
      }
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeSection]);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(
      section.toLowerCase().replace(/\s/g, "")
    );
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-2 w-full max-w-2xl bg-white bg-opacity-30 backdrop-blur-lg shadow-lg z-10 rounded-full mx-auto left-1/2 transform -translate-x-1/2 overflow-hidden">
        <div className="relative">
          <ul className="flex justify-between sm:justify-around md:justify-center gap-2 sm:gap-4 md:gap-10 px-4 py-2 relative text-xs sm:text-sm md:text-base">
            <li
              className="absolute bottom-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={underlineStyle}
            ></li>

            {sections.map((section) => (
              <li
                key={section}
                ref={(el) => {
                  tabRefs.current[section] = el;
                }}
                className="cursor-pointer p-2 text-black whitespace-nowrap"
                onClick={() => {
                  setActiveSection(section);
                  scrollToSection(section);
                }}
              >
                {section}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Sections */}
      <div id="whatwedo" className="h-screen flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          <Overview />
        </h1>
      </div>
      <div id="about" className="h-screen flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          <About />
        </h1>
      </div>
      <div id="team" className="h-screen flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          <Team />
        </h1>
      </div>
      <div id="projects" className="h-screen flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          <Projects />
        </h1>
      </div>
      <div id="contactus" className="h-screen flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">
          <ContactUs />
        </h1>
      </div>
    </div>
  );
};

export default FloatingNav;
