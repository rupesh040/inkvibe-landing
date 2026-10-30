'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { BlogItem, BlogsVariant, BlogDetailSection } from '@/types';
import { X, ArrowRight } from 'lucide-react';
import { blogDetailsMap } from '@/data';

interface BlogsProps {
  data: BlogsVariant;
  isBlogPage?: boolean;
}

const DEFAULT_CATEGORIES = [
  'All',
  'Tattoo Tips',
  'Design Inspiration',
  'Aftercare Guide',
  'Tattoo Styles',
  'Studio Updates',
];

const matchCategory = (blog: BlogItem, category: string) => {
  if (!category || category.toLowerCase() === 'all') return true;
  const cat = category.toLowerCase().trim();
  const tag = (blog.tag || '').toLowerCase().trim();
  const title = (blog.title || '').toLowerCase().trim();

  if (tag === cat) return true;
  if (cat.includes(tag) || tag.includes(cat)) return true;
  if (cat.includes('inspiration') && (tag.includes('inspiration') || title.includes('styles'))) return true;
  if (cat.includes('aftercare') && (tag.includes('aftercare') || title.includes('aftercare') || tag.includes('tips'))) return true;
  if (cat.includes('style') && (tag.includes('style') || title.includes('style') || tag.includes('inspiration'))) return true;
  if (cat.includes('studio') && (tag.includes('studio') || tag.includes('life') || title.includes('session'))) return true;
  if (cat.includes('tip') && (tag.includes('tip') || title.includes('tip'))) return true;

  return false;
};

export default function Blogs({ data: blogsData }: BlogsProps) {
  const categories = blogsData.categories && blogsData.categories.length > 0
    ? blogsData.categories
    : DEFAULT_CATEGORIES;

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || 'All');
  const [activeBlog, setActiveBlog] = useState<{
    title: string;
    tag: string;
    date: string;
    image: string;
    description: string;
    sections: BlogDetailSection[];
    author: string;
  } | null>(null);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') return blogsData.blogs;
    const matched = blogsData.blogs.filter((blog: BlogItem) => matchCategory(blog, selectedCategory));
    return matched.length > 0 ? matched : blogsData.blogs;
  }, [blogsData.blogs, selectedCategory]);

  const displayedBlogs = filteredBlogs.slice(0, 3);

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
    const slug = blog.link ? blog.link.replace('/blogs/', '') : '';
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
    <section className="bg-black py-16 md:py-24 px-6 md:px-12 lg:px-16 relative overflow-hidden">
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
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all whitespace-nowrap cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-red-600 border-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedBlogs.map((blog: BlogItem, index: number) => (
            <motion.article 
              key={blog.link || index}
              variants={itemVariants}
              onClick={() => handleOpenBlog(blog)}
              className="bg-[#080808] border border-white/10 hover:border-red-600/60 transition-all duration-500 flex flex-col group cursor-pointer rounded-sm overflow-hidden"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-600 text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1">
                    {blog.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold font-inter text-white mb-4 leading-snug group-hover:text-red-500 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                  {blog.description}
                </p>

                <div className="inline-flex flex-col items-start mt-auto group/link">
                  <span className="flex items-center text-white font-bold text-[13px] tracking-widest uppercase mb-1">
                    {blogsData.readArticleText || "Read Article"}
                    <ArrowRight className="w-3.5 h-3.5 text-red-600 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </span>
                  <span className="h-[2px] w-8 bg-red-600 transition-all duration-300 group-hover/link:w-full" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlog(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0c0c] border border-red-600/40 rounded-sm overflow-y-auto p-6 md:p-10 shadow-[0_0_30px_rgba(220,38,38,0.25)] text-white my-auto"
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
