'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { GalleryVariant } from '@/types';

export default function Gallery({ data }: { data: GalleryVariant }) {
  const images = React.useMemo(() => {
    const list = data?.images || [];
    return Array.from(new Set(list));
  }, [data?.images]);

  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <section className="w-full bg-[#050505] py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 mb-4"
            >
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {data?.subtitle || "PORTFOLIO"}
              </h3>
              <div className="w-16 h-[1px] bg-white/20" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide"
            >
              <span className="text-white mr-4">{data?.titleLine1 || "OUR INK"}</span>
              <span className="text-red-600">{data?.titleLine2 || "GALLERY"}</span>
            </motion.h2>
          </div>

          {data.description && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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
            const artworkTitle = [data?.titleLine1, data?.titleLine2].filter(Boolean).join(' ') || "Tattoo artwork";

            return (
              <motion.div
                key={`${src}-${globalIndex}`}
                variants={itemVariants}
                className="relative aspect-square w-full overflow-hidden rounded-sm border border-red-600/30 bg-[#0a0a0a]"
              >
                <Image
                  src={src}
                  alt={`${artworkTitle} ${globalIndex + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
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
              aria-label={data?.prevAriaLabel || "Previous page"}
              className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                suppressHydrationWarning
                onClick={() => setCurrentPage(page)}
                aria-label={`${data?.pageAriaPrefix || "Page"} ${page}`}
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
              aria-label={data?.nextAriaLabel || "Next page"}
              className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
