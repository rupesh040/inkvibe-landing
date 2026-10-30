'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, ZoomIn } from 'lucide-react';
import { GalleryVariant } from '@/types';

export default function Gallery({ data }: { data: GalleryVariant }) {
  const images = data?.images || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const defaultItems = data?.itemsPerPage || 8;
  const [itemsPerPage, setItemsPerPage] = useState(defaultItems);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(Math.min(4, defaultItems));
      } else {
        setItemsPerPage(defaultItems);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultItems]);

  const totalPages = Math.ceil(images.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const currentImages = images.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="w-full bg-[#050505] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="flex flex-col w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 mb-4"
            >
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {data.subtitle || "PORTFOLIO"}
              </h3>
              <div className="w-16 h-[2px] bg-red-600" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide"
            >
              <span className="text-white mr-4">{data.titleLine1 || "OUR INK"}</span>
              <span className="text-red-600">{data.titleLine2 || "GALLERY"}</span>
            </motion.h2>
          </div>
          
          {data.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 lg:pl-16"
            >
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {data.description}
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          key={safeCurrentPage}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
        >
          {currentImages.map((src: string, index: number) => {
            const globalIndex = (safeCurrentPage - 1) * itemsPerPage + index;
            return (
              <motion.div
                key={`${src}-${globalIndex}`}
                variants={itemVariants}
                onClick={() => setSelectedIndex(globalIndex)}
                className="relative aspect-square w-full group overflow-hidden rounded-sm border border-red-600/30 bg-[#0a0a0a] cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Tattoo artwork ${globalIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-xs font-semibold tracking-wider text-white uppercase">
                    {data.viewArtworkLabel || "View Artwork"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2" suppressHydrationWarning>
            <button
              suppressHydrationWarning
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={mounted ? safeCurrentPage === 1 : false}
              aria-label="Previous page"
              className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                suppressHydrationWarning
                onClick={() => setCurrentPage(page)}
                aria-label={`Page ${page}`}
                className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border cursor-pointer ${
                  safeCurrentPage === page
                    ? 'bg-red-600 border-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                    : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              suppressHydrationWarning
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={mounted ? safeCurrentPage === totalPages : false}
              aria-label="Next page"
              className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full border border-white/20 hover:border-white/50 transition-colors z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous artwork"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all z-10 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next artwork"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-red-600 flex items-center justify-center text-red-500 hover:text-white hover:bg-red-600 transition-all z-10 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full h-[80vh] flex items-center justify-center"
            >
              <Image
                src={images[selectedIndex]}
                alt={`Expanded Artwork ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 80vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
