'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { CTAButton, CTAVariant } from '@/types';

interface CTAProps {
  data: CTAVariant;
}

export default function CTA({ data: ctaData }: CTAProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#030303] text-white py-24 md:py-32 relative overflow-hidden">
      
      <div 
        className="absolute top-0 right-0 w-full lg:w-full h-full z-0 pointer-events-none" 
        style={{ 
          maskImage: 'linear-gradient(to left, black 40%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)' 
        }}
      >
        <Image 
          src={ctaData.image} 
          alt="CTA Background" 
          fill 
          sizes="100vw"
          className="object-cover opacity-30 lg:opacity-70 mix-blend-lighten" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col w-full lg:w-[60%] relative"
        >
          
          <div className="absolute top-10 left-0 -translate-y-1/2 -z-10 pointer-events-none select-none overflow-hidden">
            <span 
              className="text-[120px] md:text-[220px] font-black italic tracking-widest text-red-600 opacity-5 whitespace-nowrap" 
              style={{ fontFamily: 'Brush Script MT, cursive, serif' }}
            >
              {ctaData.watermark}
            </span>
          </div>

          <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-[2px] bg-red-600" />
            <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm md:text-base uppercase">
              {ctaData.subtitle}
            </h3>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-7xl font-bold font-sans uppercase leading-[1.05] tracking-wide mb-8">
            <div className="text-white mb-2">{ctaData.titleLine1}</div>
            <div className="text-red-600">{ctaData.titleLine2}</div>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300 text-base md:text-lg leading-relaxed mb-12 max-w-lg">
            {ctaData.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
            {ctaData.buttons.map((btn: CTAButton, idx: number) => {
              if (btn.style === 'solid') {
                return (
                  <a 
                    key={idx}
                    href="#contact"
                    onClick={scrollToContact}
                    className="relative group bg-red-600 text-white px-8 py-5 uppercase font-bold text-sm tracking-widest flex items-center justify-center overflow-hidden w-full sm:w-auto cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                    style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
                  >
                    <span className="relative z-10 flex items-center">
                      {btn.text || "CONTACT US"} <span className="ml-3 font-normal text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                    <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                  </a>
                );
              }

              return (
                <div key={idx} className="relative group p-[2px] w-full sm:w-auto">
                  <div 
                    className="absolute inset-0 bg-gray-600 group-hover:bg-red-600 transition-colors duration-300" 
                    style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }} 
                  />
                  <a 
                    href="#contact" 
                    onClick={scrollToContact}
                    className="relative bg-black text-white px-8 py-5 uppercase font-bold text-sm tracking-widest flex items-center justify-center transition-colors cursor-pointer" 
                    style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}
                  >
                    {btn.text || "CONTACT US"} <span className="ml-3 font-normal text-lg transition-transform group-hover:translate-x-1 duration-300">→</span>
                  </a>
                </div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="w-16 h-[2px] bg-red-600 mt-20" />
          
        </motion.div>
      </div>
    </section>
  );
}
