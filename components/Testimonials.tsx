'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Testimonial, TestimonialVariant } from '@/types';

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 14.5L8.5 18.5H4.5L6.5 14.5V7.5H11.5V14.5H10.5Z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5 14.5L17.5 18.5H13.5L15.5 14.5V7.5H20.5V14.5H19.5Z" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col border border-red-600/30 p-8 md:p-10 bg-[#080808] h-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all hover:border-red-600/60">
      <div className="flex justify-between items-start mb-8">
        <QuoteIcon />
        <div className="flex space-x-1 mt-1">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
          ))}
        </div>
      </div>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 flex-grow">
        {testimonial.text}
      </p>
      <div className="mt-auto">
        <div className="w-8 h-[2px] bg-red-600 mb-4" />
        <h4 className="uppercase text-xs font-bold tracking-[0.15em] text-gray-400">
          {testimonial.author}
        </h4>
      </div>
    </div>
  );
}

interface TestimonialsProps {
  data: TestimonialVariant;
}

export default function Testimonials({ data: testimonialData }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const testimonials = testimonialData.testimonials || [];
  const total = testimonials.length;

  const goNext = () => {
    if (total <= 1) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    if (total <= 1) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const card1 = total > 0 ? testimonials[activeIndex % total] : null;
  const card2 = total > 1 ? testimonials[(activeIndex + 1) % total] : null;
  const card3 = total > 2 ? testimonials[(activeIndex + 2) % total] : null;

  return (
    <section className="w-full bg-[#050505] text-white py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative z-10">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
                {testimonialData.subtitle}
              </h3>
              <div className="w-16 h-[2px] bg-red-600" />
            </div>
            <h2 className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide">
              <span className="text-white mr-4">{testimonialData.titleLine1}</span>
              <span className="text-red-600">{testimonialData.titleLine2}</span>
            </h2>
          </div>

          <div className="flex space-x-4 pb-2">
            <button
              onClick={goPrev}
              type="button"
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={goNext}
              type="button"
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-[#dc2626] flex items-center justify-center text-white hover:bg-[#b91c1c] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {card1 && (
                <div className="flex flex-col h-full">
                  <TestimonialCard testimonial={card1} />
                </div>
              )}
              {card2 && (
                <div className="hidden md:flex flex-col h-full">
                  <TestimonialCard testimonial={card2} />
                </div>
              )}
              {card3 && (
                <div className="hidden lg:flex flex-col h-full">
                  <TestimonialCard testimonial={card3} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {total > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-8 bg-red-600' : 'w-3 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
