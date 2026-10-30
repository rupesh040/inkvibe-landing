'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroVariant } from '@/types';

interface HeroProps {
  data: HeroVariant;
}

export default function Hero({ data: heroData }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = heroData.slides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>, link?: string) => {
    e.preventDefault();
    if (!link) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const targetId = link.replace(/^(\/|#)/, '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[420px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${slides[currentSlide].image}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center pb-20 md:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="max-w-2xl mt-4 md:mt-8"
          >
            <div className="flex items-center space-x-2 text-xs md:text-sm tracking-[0.2em] font-medium mb-2 md:mb-4">
              <span className="text-red-600 uppercase">{slides[currentSlide].subtitlePart1}</span>
              <span className="text-gray-300 uppercase">{slides[currentSlide].subtitlePart2}</span>
            </div>

            <h1 className="text-[clamp(2.4rem,5vw,5rem)] md:text-6xl lg:text-7xl font-bold font-sans uppercase leading-[1.02] tracking-wide mb-4 md:mb-6">
              <span className="text-white block">{slides[currentSlide].titleLine1}</span>
              <span className="text-red-600 block">{slides[currentSlide].titleLine2}</span>
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group py-2 focus:outline-none cursor-pointer"
              >
                <div 
                  className={`h-1 transition-all duration-500 ease-out ${
                    idx === currentSlide 
                      ? 'w-10 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]' 
                      : 'w-6 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white/50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center text-red-500 hover:text-white hover:border-red-500 hover:bg-red-600/20 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

        </div>
      </div>
    </div>
  );
}
