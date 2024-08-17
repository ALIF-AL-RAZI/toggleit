"use client";
import { useState, useEffect, useRef } from "react";

const sections = ["What We Do", "About", "Team", "Projects", "Contact"];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("What We Do");
  const [underlineStyle, setUnderlineStyle] = useState<{
    width: string;
    left: string;
  }>({
    width: "0",
    left: "0",
  });

  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          return scrollPosition >= elementTop && scrollPosition < elementBottom;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
    return () => {
      window.removeEventListener("resize", updateUnderline);
    };
  }, [activeSection]);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
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
      <nav className="fixed top-2 w-auto bg-white bg-opacity-30 backdrop-blur-lg shadow-lg z-10 rounded-full mx-auto left-1/2 transform -translate-x-1/2 overflow-hidden">
        <div className="relative">
          <ul className="flex justify-center gap-6 px-6 py-2 relative">
            <div
              className="absolute bottom-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={underlineStyle}
            ></div>

            {sections.map((section) => (
              <li
                key={section}
                ref={(el) => {
                  tabRefs.current[section] = el;
                }}
                className="cursor-pointer p-2 text-sm text-black"
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
      <div
        id="what we do"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">Overview Section</h1>
      </div>
      <div id="about" className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">About Section</h1>
      </div>
      <div id="team" className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Team Section</h1>
      </div>
      <div id="projects" className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Projects Section</h1>
      </div>
      <div id="contact" className="h-screen flex items-center justify-center">
        <h1 className="text-4xl">Contact Section</h1>
      </div>
    </div>
  );
};

export default FloatingNav;

// "use client";
// import { useState, useEffect } from "react";

// const sections = ["Home", "About", "Services", "Contact"];

// const FloatingNav = () => {
//   const [activeSection, setActiveSection] = useState("Home");

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + window.innerHeight / 2;

//       const currentSection = sections.find((section) => {
//         const element = document.getElementById(section.toLowerCase());
//         if (element) {
//           const elementTop = element.offsetTop;
//           const elementBottom = elementTop + element.offsetHeight;
//           return scrollPosition >= elementTop && scrollPosition < elementBottom;
//         }
//         return false;
//       });

//       if (currentSection && currentSection !== activeSection) {
//         setActiveSection(currentSection);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [activeSection]);

//   const scrollToSection = (section: string) => {
//     const element = document.getElementById(section.toLowerCase());
//     if (element) {
//       window.scrollTo({
//         top: element.offsetTop,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="fixed top-2 w-auto bg-white bg-opacity-30 backdrop-blur-lg shadow-lg z-10 rounded-full mx-auto left-1/2 transform -translate-x-1/2">
//         <ul className="flex justify-center space-x-6 p-2">
//           {sections.map((section) => (
//             <li
//               key={section}
//               className={`cursor-pointer p-2 text-sm rounded-full transition-transform duration-500 ease-in-out transform ${
//                 activeSection === section
//                   ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-110"
//                   : "text-black"
//               }`}
//               onClick={() => scrollToSection(section)}
//             >
//               {section}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Sections */}
//       <div id="home" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">Home Section</h1>
//       </div>
//       <div id="about" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">About Section</h1>
//       </div>
//       <div id="services" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">Services Section</h1>
//       </div>
//       <div id="contact" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">Contact Section</h1>
//       </div>
//     </div>
//   );
// };

// export default FloatingNav;

// import { useState, useEffect } from "react";

// const sections = ["Home", "About", "Services", "Contact"];

// const FloatingNav = () => {
//   const [activeSection, setActiveSection] = useState("Home");

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + window.innerHeight / 2;

//       const currentSection = sections.find((section) => {
//         const element = document.getElementById(section.toLowerCase());
//         if (element) {
//           const elementTop = element.offsetTop;
//           const elementBottom = elementTop + element.offsetHeight;
//           return scrollPosition >= elementTop && scrollPosition < elementBottom;
//         }
//         return false;
//       });

//       if (currentSection && currentSection !== activeSection) {
//         setActiveSection(currentSection);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [activeSection]);

//   const scrollToSection = (section: string) => {
//     const element = document.getElementById(section.toLowerCase());
//     if (element) {
//       window.scrollTo({
//         top: element.offsetTop,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-3/4 bg-white shadow-lg rounded-lg z-10 p-2">
//         <ul className="flex justify-around space-x-4">
//           {sections.map((section) => (
//             <li
//               key={section}
//               className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${
//                 activeSection === section
//                   ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md transform scale-105"
//                   : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//               }`}
//               onClick={() => scrollToSection(section)}
//             >
//               {section}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Sections */}
//       <div id="home" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">Home Section</h1>
//       </div>
//       <div id="about" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">About Section</h1>
//       </div>
//       <div id="services" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">Services Section</h1>
//       </div>
//       <div id="contact" className="h-screen flex items-center justify-center">
//         <h1 className="text-4xl">Contact Section</h1>
//       </div>
//     </div>
//   );
// };

// export default FloatingNav;
