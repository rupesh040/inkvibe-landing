'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamMember, TeamSocialLink, TeamVariant } from '@/types';
import { homePageData } from '@/data';

const DynamicIcon = ({ svgStr, className }: { svgStr?: string; className?: string }) => {
  if (!svgStr) return null;
  return (
    <span 
      dangerouslySetInnerHTML={{ __html: svgStr }} 
      className={`inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${className || ''}`} 
    />
  );
};

interface TeamProps {
  data?: TeamVariant;
}

export default function Team({ data }: TeamProps = {}) {
  const teamData = data || homePageData.Team;
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const members = React.useMemo(() => {
    const list = teamData?.members || [];
    const seen = new Set<string>();
    return list.filter((member) => {
      const key = member.id || member.image || member.name;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [teamData?.members]);

  const itemsPerPage = teamData?.itemsPerPage;
  const shouldPaginate = Boolean(itemsPerPage && itemsPerPage > 0 && itemsPerPage < members.length);
  const totalPages = shouldPaginate && itemsPerPage ? Math.ceil(members.length / itemsPerPage) : 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  const currentMembers = shouldPaginate && itemsPerPage
    ? members.slice((safeCurrentPage - 1) * itemsPerPage, safeCurrentPage * itemsPerPage)
    : members;

  const prevIconSvg = teamData.pagination?.prevSvg || teamData.prevSvg;
  const nextIconSvg = teamData.pagination?.nextSvg || teamData.nextSvg;
  const prevAriaLabel = teamData.pagination?.prevAriaLabel || teamData.prevAriaLabel || 'Previous page';
  const nextAriaLabel = teamData.pagination?.nextAriaLabel || teamData.nextAriaLabel || 'Next page';
  const pageAriaPrefix = teamData.pagination?.pageAriaPrefix || teamData.pageAriaPrefix || 'Page';

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
      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="flex flex-col w-full lg:w-1/2">
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center space-x-4 mb-4">
              {teamData.subtitleSvg && (
                <DynamicIcon svgStr={teamData.subtitleSvg} className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {teamData.subtitle}
              </h3>
              <div className="w-16 h-[2px] bg-red-600" />
            </motion.div>
            <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide">
              <span className="text-white mr-4">{teamData.titleLine1}</span>
              <span className="text-red-600">{teamData.titleLine2}</span>
            </motion.h2>
          </div>
          
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full lg:w-1/2 lg:pl-16">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {teamData.description}
            </p>
          </motion.div>
        </div>

        <motion.div 
          key={safeCurrentPage}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {currentMembers.map((member: TeamMember, idx: number) => (
            <motion.div
              key={member.id || idx}
              variants={itemVariants}
              className="relative flex flex-col group p-[1px] overflow-hidden rounded-sm"
            >
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#dc2626_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col bg-[#080808] border border-red-600/30 group-hover:border-transparent transition-colors duration-500 h-full z-10">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.imageAlt || `${member.name} - ${member.role}`} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                
                <div className="flex flex-col p-6 flex-grow relative z-10">
                  <h4 className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-red-500 transition-colors">
                    {member.name}
                  </h4>
                  <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                    {member.role}
                  </span>
                  
                  <div className="w-8 h-[2px] bg-red-600 my-5" />
                  
                  <div className="flex items-center space-x-3 mt-auto relative z-30">
                    {member.socials?.map((social: TeamSocialLink, sIdx: number) => {
                      const platformKey = social.platform?.toLowerCase() || '';
                      const iconSvg = social.svg || teamData.socialIcons?.[platformKey];

                      return (
                        <a 
                          href={social.url} 
                          key={sIdx}
                          target="_blank"
                          rel="noreferrer"
                          className="w-9 h-9 rounded-full border border-white/20 text-gray-300 flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:scale-105 cursor-pointer"
                          aria-label={social.ariaLabel || `${member.name} on ${social.platform || 'Social'}`}
                        >
                          {iconSvg ? (
                            <DynamicIcon svgStr={iconSvg} className="w-4 h-4" />
                          ) : (
                            <span className="text-[10px] font-bold uppercase">{social.platform?.slice(0, 2)}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12" suppressHydrationWarning>
            <button
              suppressHydrationWarning
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={mounted ? safeCurrentPage === 1 : false}
              aria-label={prevAriaLabel}
              className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              {prevIconSvg ? (
                <DynamicIcon svgStr={prevIconSvg} className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                suppressHydrationWarning
                onClick={() => setCurrentPage(page)}
                aria-label={`${pageAriaPrefix} ${page}`}
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
              aria-label={nextAriaLabel}
              className="w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              {nextIconSvg ? (
                <DynamicIcon svgStr={nextIconSvg} className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
