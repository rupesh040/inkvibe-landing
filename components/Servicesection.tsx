'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ServiceItem, ServicesVariant } from '@/types';

interface ServicesProps {
  data: ServicesVariant;
}

export default function Services({ data: servicesData }: ServicesProps) {
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

  const handleRedirectToContact = (serviceTitle: string) => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
    const serviceSelect = document.getElementById('contact-service') as HTMLSelectElement | null;
    if (serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase() === serviceTitle.toLowerCase()) {
          serviceSelect.selectedIndex = i;
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    }
  };

  return (
    <section className="w-full bg-[#030303] text-white py-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[800px] bg-[url('/bg-texture.webp')] opacity-10 bg-cover bg-center mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10"
        >
          <div className="flex flex-col">
            <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-4">
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {servicesData.subtitle}
              </h3>
              <div className="w-16 h-[1px] bg-white/20" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide">
              <span className="text-white mr-4">{servicesData.titleLine1}</span>
              <span className="text-red-600">{servicesData.titleLine2}</span>
            </motion.h2>
          </div>
          
          <motion.p variants={itemVariants} className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl lg:text-right">
            {servicesData.description}
          </motion.p>
        </motion.div>

        <div className="flex flex-col space-y-20 md:space-y-32">
          {servicesData.services.map((service: ServiceItem, idx: number) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                
                <div 
                  onClick={() => handleRedirectToContact(service.title)}
                  className="w-full lg:w-1/2 relative group p-4 md:p-6 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRedirectToContact(service.title);
                    }
                  }}
                  aria-label={`${service.buttonText || 'Book'} ${service.title}`}
                >
                  <div className={`absolute inset-0 z-0 transition-opacity duration-500 opacity-70 group-hover:opacity-100 ${isEven ? 'border-y border-l border-red-600' : 'border-y border-r border-red-600'}`}>
                    {isEven ? (
                      <>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-600" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600" />
                      </>
                    ) : (
                      <>
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-600" />
                      </>
                    )}
                  </div>
                  
                  <div className="relative w-full aspect-[2/1] bg-[#0a0a0a] z-10 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs uppercase tracking-widest font-bold text-red-500 bg-black/80 px-3 py-1 border border-red-600/50 flex items-center">
                        {service.buttonText || servicesData.buttonText || 'Book Service'}
                        <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col items-start relative z-10">
                  <div className="flex items-center mb-6 space-x-4 md:space-x-6">
                    <span 
                      className="text-5xl md:text-7xl font-bold font-sans leading-none tracking-tighter"
                      style={{
                        WebkitTextStroke: '1px #dc2626',
                        color: 'transparent'
                      }}
                    >
                      {service.number}
                    </span>
                    <div className="w-8 md:w-12 h-[2px] bg-red-600" />
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                    {service.description}
                  </p>

                  <motion.button
                    type="button"
                    onClick={() => handleRedirectToContact(service.title)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 text-xs font-bold tracking-wider uppercase overflow-hidden w-fit cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  >
                    <span className="relative z-10 flex items-center">
                      {service.buttonText || servicesData.buttonText || 'Book Service'}
                      <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                  </motion.button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
