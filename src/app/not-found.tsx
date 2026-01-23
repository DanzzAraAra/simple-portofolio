"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-200 font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-orange-950/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-amber-950/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl w-full text-center">
          
          {/* Animated 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="text-[200px] md:text-[280px] font-black text-stone-800/40 leading-none">
                404
              </div>
              <motion.div 
                className="absolute top-0 left-0 text-[200px] md:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 leading-none"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ 
                  backgroundSize: "200% 100%",
                }}
              >
                404
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-stone-100">
              Oops! Page not found
            </h1>
            
            <p className="text-stone-400 text-lg max-w-xl mx-auto">
              The page you're looking for seems to have wandered off into the digital void.
            </p>

            {/* Animated Illustration */}
            <motion.div 
              className="my-10 mx-auto max-w-md h-64 bg-gradient-to-br from-stone-900/40 to-stone-950/60 rounded-2xl border border-orange-900/20 overflow-hidden relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Floating server icons */}
                  <motion.div
                    animate={{ 
                      x: [-20, 20, -20],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-8 -left-8"
                  >
                    <div className="p-3 bg-stone-800/50 rounded-lg border border-orange-900/30 backdrop-blur-sm">
                      <div className="w-6 h-6 rounded bg-gradient-to-r from-orange-500 to-amber-500" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      x: [20, -20, 20],
                      y: [10, -5, 10]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                    className="absolute -top-4 -right-8"
                  >
                    <div className="p-3 bg-stone-800/50 rounded-lg border border-orange-900/30 backdrop-blur-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-amber-500" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      x: [10, -10, 10],
                      y: [20, 0, 20]
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-8 left-4"
                  >
                    <div className="p-3 bg-stone-800/50 rounded-lg border border-orange-900/30 backdrop-blur-sm">
                      <div className="w-5 h-5 rounded bg-gradient-to-r from-yellow-500 to-orange-500" />
                    </div>
                  </motion.div>
                  
                  {/* Central 404 text */}
                  <div className="text-6xl font-black text-stone-700/30">
                    ?
                  </div>
                </div>
              </div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M100,100 Q250,50 400,100"
                  stroke="rgba(249, 115, 22, 0.2)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.path
                  d="M100,150 Q250,200 400,150"
                  stroke="rgba(251, 191, 36, 0.2)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [10, 30, 10] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            {/* Back to Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-orange-700/80 to-amber-700/80 hover:from-orange-600 hover:to-amber-600 rounded-xl border border-orange-900/40 text-stone-100 font-semibold text-lg flex items-center gap-3 mx-auto transition-all duration-300 shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  Return to Homepage
                  <Home size={20} className="group-hover:scale-110 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-8 border-t border-stone-800/50 mt-10"
            >
              <p className="text-stone-500 text-sm">
                If you believe this is an error, please check the URL or contact support
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-orange-600/50"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="w-1 h-1 rounded-full bg-amber-600/50"
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="w-1 h-1 rounded-full bg-yellow-600/50"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}