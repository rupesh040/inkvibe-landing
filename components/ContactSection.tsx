'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Send } from 'lucide-react';
import { ContactVariant } from '@/types';
import { sharedData } from '@/data';

const footer = sharedData.Footer;

const DynamicIcon = ({ svgStr, className }: { svgStr?: string; className?: string }) => {
  if (!svgStr) return null;
  return <div dangerouslySetInnerHTML={{ __html: svgStr }} className={`[&>svg]:w-full [&>svg]:h-full ${className}`} />;
};

interface ContactSectionProps { data: ContactVariant; }

export default function ContactSection({ data }: ContactSectionProps) {
  const emptyForm = { name: '', phone: '', email: '', service: '', message: '' };
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '');
    }
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData(emptyForm);
  };

  const contactIcons = [MapPin, Phone, Mail];

  return (
    <>
    <section className="w-full bg-[#050505] text-white py-12 md:py-12 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="relative w-full lg:w-[55%] flex flex-col justify-between overflow-hidden min-h-[600px]">
            <div className="absolute inset-0 z-0">
              <Image src={data.backgroundImage} alt="Contact Background" fill priority className="object-cover object-center opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between py-10 px-6 md:px-10 space-y-10">
              <div className="space-y-4">
                <motion.div custom={0} className="flex items-center space-x-3">
                  <span className="text-red-600 font-bold tracking-[0.2em] text-xs uppercase">{data.subtitle}</span>
                  <div className="w-12 h-px bg-red-600/50" />
                </motion.div>
                <motion.h2 custom={1} className="text-[clamp(2.35rem,5vw,5.2rem)] md:text-6xl font-bold font-sans uppercase leading-[1.05] tracking-wide">
                  <span className="text-white">{data.titleLine1}</span><br />
                  <span className="text-red-600">{data.titleLine2}</span>
                </motion.h2>
                <motion.p custom={2} className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                  {data.description}
                </motion.p>
              </div>

              <div className="space-y-6">
                {data.contactItems.map((item, idx) => {
                  const Icon = contactIcons[idx] || MapPin;
                  const isPhone = item.label.toLowerCase().includes('call') || item.label.toLowerCase().includes('phone');
                  const isEmail = item.label.toLowerCase().includes('email') || item.label.toLowerCase().includes('mail');
                  const href = isPhone 
                    ? `tel:${item.value.replace(/\s+/g, '')}` 
                    : isEmail 
                    ? `mailto:${item.value}` 
                    : undefined;

                  const ItemInner = (
                    <div className="flex items-start gap-4 w-full">
                      <div className="w-11 h-11 rounded-full border border-red-600/60 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                        <Icon className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-600 mb-0.5">{item.label}</span>
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug">{item.value}</span>
                      </div>
                    </div>
                  );

                  return (
                    <motion.div key={idx} custom={idx + 3} className="flex items-start gap-4 group">
                      {href ? (
                        <a href={href} className="w-full focus:outline-none" aria-label={`${item.label}: ${item.value}`}>
                          {ItemInner}
                        </a>
                      ) : (
                        ItemInner
                      )}
                    </motion.div>
                  );
                })}
                <motion.div custom={6} className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-600 mb-3">{data.followUsLabel}</span>
                  <div className="flex items-center gap-3">
                    {footer.social.map((s, i) => (
                      <motion.a key={i} href={s.href} whileHover={{ scale: 1.15, backgroundColor: '#dc2626', borderColor: '#dc2626' }} whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300" aria-label={s.name}>
                        <DynamicIcon svgStr={s.svg} className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="w-full lg:w-[45%]">
            <div className="relative border border-red-600/70 p-6 md:p-10 bg-[#080808]">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-600 -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-red-600 translate-x-px -translate-y-px" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-red-600 -translate-x-px translate-y-px" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-600 translate-x-px translate-y-px" />

              <div className="mb-6 space-y-2">
                <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-red-600">{data.formSubtitle}</p>
                <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase leading-tight">
                  <span className="text-white">{data.formTitleLine1} </span>
                  <span className="text-red-600">{data.formTitleLine2}</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pt-1">{data.formDescription}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-bold tracking-wider text-white uppercase">
                        {data.fields.name.label} <span className="text-red-600">*</span>
                      </label>
                      <input id="contact-name" name="name" type="text" required value={formData.name} onChange={handleChange}
                        placeholder={data.fields.name.placeholder}
                        className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-bold tracking-wider text-white uppercase">
                        {data.fields.phone.label} <span className="text-red-600">*</span>
                      </label>
                      <input id="contact-phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                        placeholder={data.fields.phone.placeholder}
                        className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold tracking-wider text-white uppercase">
                      {data.fields.email.label} <span className="text-red-600">*</span>
                    </label>
                    <input id="contact-email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      placeholder={data.fields.email.placeholder}
                      className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-service" className="text-xs font-bold tracking-wider text-white uppercase">
                      {data.fields.service.label}
                    </label>
                    <div className="relative">
                      <select id="contact-service" name="service" value={formData.service} onChange={handleChange}
                        className="w-full appearance-none bg-[#111] border border-white/10 text-sm px-4 py-3 text-gray-400 focus:outline-none focus:border-red-600 transition-colors">
                        <option value="">{data.fields.service.placeholder}</option>
                        {data.services.map((svc) => <option key={svc} value={svc}>{svc}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-bold tracking-wider text-white uppercase">
                      {data.fields.message.label} <span className="text-red-600">*</span>
                    </label>
                    <textarea id="contact-message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                      placeholder={data.fields.message.placeholder}
                      className="bg-[#111] border border-white/10 text-white text-sm px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors resize-none" />
                  </div>
                  <motion.button type="submit" id="contact-submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="relative w-full overflow-hidden group bg-red-600 text-white text-sm font-bold tracking-wider uppercase px-8 py-4 flex items-center justify-center gap-3 mt-2 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-3">
                      {data.submitButton}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

    {submitted && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setSubmitted(false)}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          className="relative z-10 bg-[#080808] border border-red-600 p-8 md:p-12 max-w-md w-full flex flex-col items-center text-center shadow-[0_0_40px_rgba(220,38,38,0.3)]"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600 -translate-x-px -translate-y-px" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600 translate-x-px -translate-y-px" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600 -translate-x-px translate-y-px" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600 translate-x-px translate-y-px" />

          <div className="w-16 h-16 rounded-full border border-red-600 flex items-center justify-center mb-6 bg-red-600/10">
            <Send className="w-6 h-6 text-red-600" />
          </div>
          <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wider mb-2">
            {data.successTitle}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {data.successMessage}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full relative overflow-hidden group bg-red-600 text-white text-sm font-bold tracking-wider uppercase px-8 py-3 cursor-pointer"
          >
            <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            <span className="relative z-10">{data.successCloseButton || "Close"}</span>
          </button>
        </motion.div>
      </div>
    )}
    </>
  );
}
