import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";



const heroSlides = [
  {
    image:"https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Glow Beyond Borders",
  },
  {
    image: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?q=80&w=798&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Power That Moves the World",
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Smart Tech, Global Reach",
  },
  {
    image:"https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Global Comfort, Local Care",
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(timer); 
  }, []);

  
  const getVisibleSlides = () => {
    const first = heroSlides[index];
    const second = heroSlides[(index + 1) % heroSlides.length]; 
    return [first, second];
  };

  return (
    <div className="w-full h-[300px] relative overflow-hidden px-4 bg-[#f7f7f7]">
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <AnimatePresence>
          {getVisibleSlides().map((slide, i) => (
            <motion.div
              key={index + i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full rounded overflow-hidden"
            >
              <img
                src={slide.image}
                alt={`Slide ${index + i}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black/50 p-2 rounded">
                {slide.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Banner;
