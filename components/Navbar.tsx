'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sharedData } from '@/data';
import { HeaderVariant, TopbarVariant } from '@/types';

const DynamicIcon = ({ svgStr, className }: { svgStr?: string; className?: string }) => {
  if (!svgStr) return null;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgStr }}
      className={`[&>svg]:w-full [&>svg]:h-full ${className || ''}`}
    />
  );
};

interface NavbarProps {
  topBarData?: TopbarVariant;
  headerData?: HeaderVariant;
}

export default function Navbar({ topBarData, headerData }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const topBar = topBarData || sharedData.Topbar;
  const mainNav = headerData || sharedData.Header;

  const navLinks = mainNav.links
    .filter((link) => link.href !== '/contact' && link.href !== '#contact')
    .map((link) => {
      const id = link.href.replace(/^(\/|#)/, '') || 'home';
      return {
        name: link.name,
        id,
        href: `#${id}`,
      };
    });

  const sections = Array.from(new Set(navLinks.map((l) => l.id).concat(['home', 'contact'])));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sections]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }
    setActiveSection(targetId);
    setIsOpen(false);
  };

  const contactTarget = (mainNav.contactButtonHref || '#contact').replace(/^#/, '');

  return (
    <header className="w-full sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className={`hidden lg:flex items-center justify-between px-8 transition-all duration-300 border-b border-white/5 text-xs ${isScrolled ? 'py-1 opacity-80' : 'py-2 opacity-100'}`}>
        <div className="flex items-center space-x-6">
          {topBar.location && (
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>{topBar.location}</span>
              {(topBar.phone || topBar.email) && <div className="w-px h-4 bg-white/20 ml-6" />}
            </div>
          )}
          {topBar.phone && (
            <div className="flex items-center">
              <a
                href={`tel:${topBar.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors"
                aria-label={`${topBar.phoneAriaPrefix || 'Call '}${topBar.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>{topBar.phone}</span>
              </a>
              {topBar.email && <div className="w-px h-4 bg-white/20 ml-6" />}
            </div>
          )}
          {topBar.email && (
            <a
              href={`mailto:${topBar.email}`}
              className="flex items-center space-x-2 text-gray-300 hover:text-red-500 transition-colors"
              aria-label={`${topBar.emailAriaPrefix || 'Email '}${topBar.email}`}
            >
              <Mail className="w-3.5 h-3.5 text-red-600" />
              <span>{topBar.email}</span>
            </a>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-300 font-medium">{topBar.followUsLabel || 'Follow Us :'}</span>
          <div className="flex items-center space-x-2">
            {topBar.social.map((social) => (
              <motion.div key={social.name} whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <a
                  href={social.href}
                  className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 text-white"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DynamicIcon svgStr={social.svg} className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <nav className={`flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')}
          className="flex-shrink-0 flex flex-col items-center"
          aria-label={mainNav.homeAriaLabel || 'InkVibe Home'}
        >
          <div className="relative w-[120px] h-[50px] md:w-[150px] md:h-[65px]">
            <Image 
              src={mainNav.logo} 
              alt={mainNav.logoAlt || 'InkVibe Logo'} 
              fill 
              sizes="(max-width: 768px) 120px, 150px"
              className="object-contain" 
              priority
            />
          </div>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`group relative text-sm font-semibold tracking-wider flex items-center transition-colors cursor-pointer ${
                  isActive ? 'text-red-600' : 'text-white hover:text-red-500'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)]" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-500 rounded-full transition-all duration-300 group-hover:w-full" />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="w-px h-8 bg-white/20" />
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <a
              href={`#${contactTarget}`}
              onClick={(e) => scrollToSection(e, contactTarget)}
              className={`relative overflow-hidden group text-white text-sm font-semibold tracking-wider px-6 py-3 flex items-center rounded-sm cursor-pointer transition-all duration-300 ${
                activeSection === contactTarget
                  ? 'bg-red-700 ring-2 ring-red-400 shadow-[0_0_25px_rgba(220,38,38,0.8)]'
                  : 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]'
              }`}
            >
              <span className="relative z-10 flex items-center">
                {mainNav.button}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </a>
          </motion.div>
        </div>

        <div className="md:hidden flex items-center">
          <motion.button 
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white focus:outline-none p-2"
            aria-label={mainNav.toggleNavAriaLabel || 'Toggle navigation'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-7 h-7 text-red-500" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#0a0a0a] border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`text-sm font-medium tracking-wider flex items-center justify-between py-1 transition-colors ${
                      isActive ? 'text-red-500 font-bold' : 'text-white hover:text-red-400'
                    }`}
                  >
                    {link.name}
                    {isActive && <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]" />}
                  </a>
                );
              })}
              <div className="pt-4 mt-2 border-t border-white/10">
                <a
                  href={`#${contactTarget}`}
                  onClick={(e) => scrollToSection(e, contactTarget)}
                  className={`text-white text-sm font-semibold tracking-wider px-6 py-3 flex items-center justify-center transition-all duration-300 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.4)] ${
                    activeSection === contactTarget
                      ? 'bg-red-700 ring-2 ring-red-400 shadow-[0_0_20px_rgba(220,38,38,0.8)]'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {mainNav.button}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
