"use client";
import { motion } from "framer-motion";
import { FC } from "react";

interface OverviewProps {
  onContactUsClick: () => void; // New prop for handling button click
}

const Overview: FC<OverviewProps> = ({ onContactUsClick }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", stiffness: 70 }}
            className="text-6xl font-extrabold mb-4 text-[#FF006E]"
          >
            Welcome to ToggleIT
          </motion.h1>
          <Slogan />
        </header>
        <main className="w-full max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl mb-8 text-[#FF006E]"
          >
            We specialize in delivering cutting-edge web solutions with a focus
            on quality and innovation. Our services include custom design,
            full-stack development, responsive design, and more.
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#FF006E",
              color: "#222B50",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#222B50] text-[#FF006E] rounded-lg border border-[#FF006E] shadow-lg transition duration-300"
            onClick={onContactUsClick} // Handle button click
          >
            Contact Us
          </motion.button>
        </main>
      </div>
    </div>
  );
};

const Slogan: FC = () => {
  const words = ["Innovating", "Transforming", "Empowering"];
  const colors = [
    "from-[#00FF94] via-[#00F9F7] to-[#1AFF9C]",
    "from-[#FF006E] via-[#FF33A8] to-[#FF66D1]",
    "from-[#F7B500] via-[#F7C800] to-[#FFD500]",
  ];

  return (
    <div className="text-5xl font-semibold italic">
      {words.map((word, index) => (
        <motion.div
          key={word}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.7,
            duration: 1.2,
            type: "spring",
            stiffness: 100,
          }}
          className={`bg-gradient-to-r ${colors[index]} bg-clip-text text-transparent`}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
};

export default Overview;
