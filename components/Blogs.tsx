'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { BlogItem, BlogsVariant, BlogDetailSection } from '@/types';
import { X, ArrowRight } from 'lucide-react';
import { blogDetailsMap } from '@/data';

interface BlogsProps {
  data: BlogsVariant;
  isBlogPage?: boolean;
}

const matchCategory = (blog: BlogItem, category: string) => {
  if (!category || category.toLowerCase() === 'all') return true;
  const cat = category.toLowerCase().trim();
  const tag = (blog.tag || '').toLowerCase().trim();
  return tag === cat;
};

export default function Blogs({ data: blogsData }: BlogsProps) {
  const categories = useMemo(() => {
    const tagsFromBlogs = Array.from(
      new Set(
        (blogsData.blogs || [])
          .map((b) => b.tag?.trim())
          .filter((t): t is string => Boolean(t))
      )
    );

    if (blogsData.categories && blogsData.categories.length > 0) {
      const valid = blogsData.categories.filter((cat) => {
        if (cat.toLowerCase() === 'all') return true;
        return tagsFromBlogs.some((t) => t.toLowerCase() === cat.toLowerCase());
      });
      for (const tag of tagsFromBlogs) {
        if (!valid.some((c) => c.toLowerCase() === tag.toLowerCase())) {
          valid.push(tag);
        }
      }
      if (valid.length > 0) return valid;
    }

    return ['All', ...tagsFromBlogs];
  }, [blogsData.categories, blogsData.blogs]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const currentCategory = categories.includes(selectedCategory) ? selectedCategory : (categories[0] || 'All');

  const [activeBlog, setActiveBlog] = useState<{
    title: string;
    tag: string;
    date: string;
    image: string;
    description: string;
    sections: BlogDetailSection[];
    author: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveBlog(null);
      }
    };
    if (activeBlog) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeBlog]);

  const displayedBlogs = useMemo(() => {
    const list = currentCategory.toLowerCase() === 'all'
      ? blogsData.blogs || []
      : (blogsData.blogs || []).filter((blog: BlogItem) => matchCategory(blog, currentCategory));

    const seen = new Set<string>();
    return list.filter((blog) => {
      const id = blog.link || blog.title;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [blogsData.blogs, currentCategory]);

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

  const handleOpenBlog = (blog: BlogItem) => {
    const slug = blog.link ? blog.link.replace(/^\/?blogs\//, '') : '';
    const detail = blogDetailsMap[slug];

    setActiveBlog({
      title: blog.title,
      tag: blog.tag,
      date: blog.date,
      image: detail?.image || blog.image,
      description: detail?.description || blog.description,
      sections: detail?.sections || [],
      author: detail?.author || blogsData.defaultAuthor || 'InkVibe Master Artist',
    });
  };

  return (
    <section className="bg-black py-6 px-6 md:px-12 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8"
        >
          <div className="flex flex-col">
            <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-4">
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {blogsData.subtitle || "OUR ARTICLES"}
              </h3>
              <div className="w-16 h-[2px] bg-red-600" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide">
              <span className="text-white mr-4">{blogsData.titleLine1 || "INK STORIES &"}</span>
              <span className="text-red-600">{blogsData.titleLine2 || "AFTERCARE"}</span>
            </motion.h2>
          </div>
          
          {blogsData.description && (
            <motion.p variants={itemVariants} className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
              {blogsData.description}
            </motion.p>
          )}
        </motion.div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all whitespace-nowrap cursor-pointer border focus:outline-none focus:ring-2 focus:ring-red-600/50 ${
                currentCategory === cat
                  ? 'bg-red-600 border-red-600 text-white shadow-[0_0_14px_rgba(220,38,38,0.6)]'
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedBlogs.length === 0 ? (
              <div className="col-span-full py-16 text-center flex flex-col items-center justify-center">
                <p className="text-gray-400 text-sm mb-4">No articles found in this category.</p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              displayedBlogs.map((blog: BlogItem, index: number) => (
                <motion.article 
                  key={blog.link || blog.title || index}
                  layout
                  initial={{ opacity: 0, y: 25, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.97 }}
                  transition={{ 
                    duration: 0.45, 
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenBlog(blog)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenBlog(blog);
                    }
                  }}
                  aria-label={`Read article: ${blog.title}`}
                  className="relative bg-[#090909] border border-white/10 hover:border-red-600/70 transition-all duration-500 flex flex-col group cursor-pointer rounded-sm overflow-hidden shadow-lg hover:shadow-[0_16px_40px_-8px_rgba(220,38,38,0.32)]"
                >
                  {/* Top glowing line accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-20 pointer-events-none" />

                  {/* Corner accent marks */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-red-600 transition-colors duration-300 z-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-red-600 transition-colors duration-300 z-20 pointer-events-none" />

                  {/* Ambient background glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

                  {/* Media wrapper */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />

                    {/* Image bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* Light sheen sweep reflection */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />

                    {/* Tag badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 shadow-[0_2px_10px_rgba(220,38,38,0.4)] group-hover:bg-red-500 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all duration-300">
                        {blog.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                    {/* Date metadata badge */}
                    {blog.date && (
                      <div className="flex items-center space-x-2 text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:scale-125 transition-transform duration-300 shrink-0" />
                        <span className="uppercase tracking-widest font-mono text-[11px]">{blog.date}</span>
                      </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold font-inter text-white mb-3 leading-snug group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-neutral-400 group-hover:text-neutral-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 transition-colors duration-300">
                      {blog.description}
                    </p>

                    <div className="inline-flex flex-col items-start mt-auto">
                      <span className="flex items-center text-white font-bold text-[13px] tracking-widest uppercase mb-1.5 group-hover:text-red-400 transition-colors duration-300">
                        {blogsData.readArticleText || "Read Article"}
                        <ArrowRight className="w-4 h-4 text-red-600 ml-2 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                      </span>
                      <span className="h-[2px] w-8 bg-red-600 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-red-500 group-hover:shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveBlog(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0c0c] border border-red-600/40 rounded-sm overflow-y-auto p-6 md:p-10 shadow-[0_0_40px_rgba(220,38,38,0.3)] text-white my-auto"
            >
              <button
                onClick={() => setActiveBlog(null)}
                aria-label={blogsData.closeButton ? `${blogsData.closeButton} article` : "Close article"}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/20 hover:border-red-600 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-red-600 text-white text-xs font-bold tracking-widest uppercase px-3 py-1">
                  {activeBlog.tag}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-sans uppercase tracking-wide text-white mb-6">
                {activeBlog.title}
              </h2>

              <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-sm border border-white/10">
                <Image
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-gray-300 text-base leading-relaxed mb-6 font-inter">
                {activeBlog.description}
              </p>

              {activeBlog.sections && activeBlog.sections.length > 0 && (
                <div className="space-y-6 mt-6 pt-6 border-t border-white/10">
                  {activeBlog.sections.map((section: BlogDetailSection, idx: number) => {
                    const heading = section.heading || (section.number && section.title ? `${section.number}. ${section.title}` : section.title);
                    const content = section.content || section.text;
                    return (
                      <div key={idx} className="space-y-2">
                        {heading && (
                          <h4 className="text-lg font-bold uppercase tracking-wide text-red-500">
                            {heading}
                          </h4>
                        )}
                        {content && (
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {content}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {blogsData.writtenByLabel || "Written by"} <strong className="text-white">{activeBlog.author}</strong>
                </span>
                <button
                  onClick={() => setActiveBlog(null)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
                >
                  {blogsData.closeButton || "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
