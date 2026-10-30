'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ProcessStep, ProcessVariant } from '@/types';

interface ProcessProps {
  data: ProcessVariant;
}

export default function Process({ data: processData }: ProcessProps) {

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

  return (
    <section className="w-full bg-[#050505] text-white py-6 relative overflow-hidden">
      
      <div 
        className="absolute bottom-0 left-0 w-4/5 md:w-1/2 lg:w-[40%] h-[60%] lg:h-[75%] z-0 pointer-events-none" 
        style={{ 
          maskImage: 'radial-gradient(ellipse at bottom left, black 20%, transparent 70%)', 
          WebkitMaskImage: 'radial-gradient(ellipse at bottom left, black 20%, transparent 70%)' 
        }}
      >
        <Image 
          src={processData.backgroundImage} 
          alt={processData.backgroundImageAlt || "Process Background"} 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-20 md:opacity-30 mix-blend-lighten" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row gap-16 lg:gap-12"
        >
          
          <div className="flex flex-col w-full lg:w-[35%] pt-4 z-10">
            <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-4">
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {processData.subtitle}
              </h3>
              <div className="w-16 h-[2px] bg-red-600" />
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide mb-6">
              <span className="text-white mr-4">{processData.titleLine1}</span>
              <span className="text-red-600">{processData.titleLine2}</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 pr-0 lg:pr-8">
              {processData.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
              {processData.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full border border-red-600 flex items-center justify-center flex-shrink-0 bg-red-600/10">
                    <Check className="w-3.5 h-3.5 text-red-600" strokeWidth={3} />
                  </div>
                  <span className="text-gray-300 text-sm md:text-base font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col w-full lg:w-[65%] z-10 space-y-8 md:space-y-10">
            {processData.steps.map((step: ProcessStep, idx: number) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col sm:flex-row w-full items-stretch"
              >
                <div className="flex flex-row w-full sm:w-[55%] lg:w-[50%] border border-red-600/40 bg-black/40">
                  
                  <div className="w-[30%] lg:w-[25%] flex items-center justify-center p-4 border-r border-red-600/40">
                    <span 
                      className="text-5xl md:text-6xl font-bold font-sans tracking-tighter"
                      style={{ WebkitTextStroke: '1.5px #dc2626', color: 'transparent' }}
                    >
                      {step.number}
                    </span>
                  </div>
                  
                  <div className="w-[70%] lg:w-[75%] relative min-h-[140px] md:min-h-[160px] p-1 overflow-hidden group">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                  </div>

                </div>
                
                <div className="flex flex-col justify-center w-full sm:w-[45%] lg:w-[50%] p-6 sm:pl-8 lg:pl-10">
                  <h4 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                    {step.title}
                  </h4>
                  <div className="w-8 h-[2px] bg-red-600 my-3 md:my-4" />
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
