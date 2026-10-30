'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, X, Gem, Users, Droplets, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ServiceItem, ServicesVariant, ServiceDetailData } from '@/types';
import { serviceDetailsMap } from '@/data';

const renderFeatureIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'diamond':
      return <Gem className="w-5 h-5 text-red-500 shrink-0" />;
    case 'users':
      return <Users className="w-5 h-5 text-red-500 shrink-0" />;
    case 'droplet':
    case 'droplets':
      return <Droplets className="w-5 h-5 text-red-500 shrink-0" />;
    case 'shieldcheck':
    case 'shield':
      return <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />;
    default:
      return <Sparkles className="w-5 h-5 text-red-500 shrink-0" />;
  }
};

const getServiceDetail = (service: ServiceItem): ServiceDetailData | undefined => {
  const slug = service.buttonLink
    ? service.buttonLink.replace(/^\/services\//, '').trim()
    : service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return serviceDetailsMap[slug] || serviceDetailsMap[service.title.toLowerCase().trim()];
};

interface ServicesProps {
  data: ServicesVariant;
}

export default function Services({ data: servicesData }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const labels = servicesData.modalLabels || {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

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

  const handleBookService = (serviceTitle: string) => {
    setSelectedService(null);
    setTimeout(() => {
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
    }, 150);
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
                  onClick={() => setSelectedService(service)}
                  className="w-full lg:w-1/2 relative group p-4 md:p-6 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedService(service);
                    }
                  }}
                  aria-label={`View details for ${service.title}`}
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
                      <span className="text-xs uppercase tracking-widest font-bold text-red-500 bg-black/80 px-3 py-1 border border-red-600/50">
                        {labels.clickToView || "Click to view details"}
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
                    onClick={() => setSelectedService(service)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center bg-red-600 text-white px-8 py-4 text-xs font-bold tracking-wider uppercase overflow-hidden w-fit cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  >
                    <span className="relative z-10 flex items-center">
                      {service.buttonText || "Read More"}
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

      <AnimatePresence>
        {selectedService && (() => {
          const detail = getServiceDetail(selectedService);
          const features = detail?.about?.features;
          const whyChoose = detail?.whyChoose;
          const ourWork = detail?.ourWork;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c0c] border border-red-600/40 rounded-sm overflow-hidden flex flex-col shadow-[0_0_40px_rgba(220,38,38,0.25)] my-auto text-white"
              >
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600 z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600 z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600 z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600 z-20 pointer-events-none" />

                <div className="sticky top-0 z-20 bg-[#0c0c0c]/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase">
                      {labels.serviceBadge || "SERVICE"} {selectedService.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-sans uppercase tracking-wide text-white">
                      {selectedService.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedService(null)}
                    aria-label={labels.closeButton ? `${labels.closeButton} service details` : "Close service details"}
                    className="w-9 h-9 rounded-full border border-white/20 hover:border-red-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="relative w-full aspect-[16/10] bg-[#141414] border border-red-600/40 overflow-hidden rounded-sm group">
                      <Image
                        src={detail?.about?.image || selectedService.image}
                        alt={selectedService.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-red-600 font-bold tracking-[0.2em] text-xs uppercase">
                          {detail?.about?.subtitle || "ABOUT THIS SERVICE"}
                        </span>
                        <div className="w-8 h-[1px] bg-red-600/50" />
                      </div>

                      <h4 className="text-2xl md:text-3xl font-bold font-sans uppercase leading-tight tracking-wide">
                        <span className="text-white mr-2">{detail?.about?.titleLine1 || selectedService.title}</span>
                        <span className="text-red-600">{detail?.about?.titleLine2 || ""}</span>
                      </h4>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        {detail?.about?.description1 || selectedService.description}
                      </p>

                      {detail?.about?.description2 && (
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {detail.about.description2}
                        </p>
                      )}
                    </div>
                  </div>

                  {features && features.length > 0 && (
                    <div className="pt-2">
                      <h5 className="text-xs font-bold tracking-widest uppercase text-red-500 mb-4 flex items-center gap-2">
                        <span>{labels.highlightsTitle || "SERVICE HIGHLIGHTS"}</span>
                        <div className="h-px bg-red-600/30 flex-grow" />
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {features.map((feat, fIdx) => (
                          <div 
                            key={fIdx}
                            className="bg-[#121212] border border-white/10 hover:border-red-600/50 p-4 rounded-sm flex flex-col items-center text-center gap-2.5 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full border border-red-600/40 bg-red-600/10 flex items-center justify-center shrink-0">
                              {renderFeatureIcon(feat.icon)}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-200 whitespace-pre-line leading-tight">
                              {feat.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {whyChoose && (
                    <div className="bg-[#121212] border border-white/10 p-5 md:p-6 rounded-sm space-y-4">
                      <div>
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-red-500">
                          {whyChoose.subtitle}
                        </span>
                        <h5 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white mt-1">
                          {whyChoose.titleLine1} <span className="text-red-600">{whyChoose.titleLine2}</span>
                        </h5>
                        {whyChoose.description && (
                          <p className="text-gray-400 text-sm leading-relaxed mt-2">
                            {whyChoose.description}
                          </p>
                        )}
                      </div>

                      {whyChoose.list && whyChoose.list.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          {whyChoose.list.map((item, lIdx) => (
                            <div key={lIdx} className="flex items-start gap-2.5 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {ourWork && ourWork.images && ourWork.images.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600 font-bold tracking-[0.2em] text-xs uppercase">
                            {ourWork.subtitle || "OUR WORK"}
                          </span>
                          <span className="text-white text-xs font-bold uppercase tracking-wider">
                            / {ourWork.title || selectedService.title}
                          </span>
                        </div>
                        <span className="text-gray-500 text-xs">{labels.portfolioSubtitle || "Sample Portfolio"}</span>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {ourWork.images.map((imgSrc, imgIdx) => (
                          <div 
                            key={imgIdx} 
                            className="relative aspect-square bg-neutral-900 border border-white/10 hover:border-red-600 rounded-sm overflow-hidden group transition-colors"
                          >
                            <Image
                              src={imgSrc}
                              alt={`${selectedService.title} work ${imgIdx + 1}`}
                              fill
                              sizes="(max-width: 640px) 33vw, 16vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                <div className="sticky bottom-0 z-20 bg-[#0c0c0c]/95 backdrop-blur-sm border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-gray-400 text-center sm:text-left">
                    {labels.consultationPrompt || "Ready to bring your vision to life? Consult with our master artists."}
                  </span>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="px-5 py-2.5 border border-white/20 hover:border-white/50 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      {labels.closeButton || "Close"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBookService(selectedService.title)}
                      className="group relative inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 text-xs font-bold tracking-wider uppercase rounded-sm cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.4)] w-full sm:w-auto transition-all"
                    >
                      <span>{labels.bookButton || "Book Consultation"}</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
