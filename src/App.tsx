import "./App.css";
import LorenzAttractor from "./LorenzAttractor";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const containerVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const contentVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      <div className="z-50 pointer-events-none absolute top-0 left-0 flex flex-col justify-end items-start p-[2rem] w-full h-full">
        <motion.div
          className="relative pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="absolute -top-12 left-0 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg 
                     hover:bg-black/40 transition-colors flex items-center gap-2"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="whitespace-nowrap">
              {isOpen ? "Hide" : "Show"} Info
            </span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </motion.button>

          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                className="bg-black/30 backdrop-blur-sm text-white p-6 rounded-lg max-w-xl overflow-hidden"
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.div variants={contentVariants}>
                  <h1 className="text-2xl font-bold mb-4">
                    Lorenz Attractor Visualization
                  </h1>
                  <p className="mb-4">
                    The Lorenz attractor is a chaotic system discovered by
                    Edward Lorenz in 1963 while studying atmospheric convection.
                    The system is described by three coupled differential
                    equations:
                  </p>
                  <div className="bg-black/20 p-4 rounded-lg mb-4 font-mono">
                    dx/dt = σ(y - x)
                    <br />
                    dy/dt = x(ρ - z) - y
                    <br />
                    dz/dt = xy - βz
                  </div>
                  <p className="mb-4">
                    Where σ = 10, ρ = 28, and β = 8/3. These parameters create
                    the famous butterfly-shaped strange attractor, demonstrating
                    how small changes in initial conditions can lead to vastly
                    different outcomes - a cornerstone of chaos theory.
                  </p>
                  <div className="flex gap-4 text-sm">
                    <a
                      href="https://github.com/tomashobza/lorenz-attractor-visualization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-blue-300 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub
                    </a>
                    <span className="text-gray-400">|</span>
                    <p className="text-gray-300">
                      Use mouse to rotate • Scroll to zoom
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <LorenzAttractor className="w-full h-screen" />
    </div>
  );
}

export default App;
