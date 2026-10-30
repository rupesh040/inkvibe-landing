"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { PenTool, Users, Trophy, Star } from "lucide-react";
import { motion, animate, useInView, type Variants } from "framer-motion";
import type { StatItem, StatsVariant } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  "pen-tool": PenTool,
  users: Users,
  trophy: Trophy,
  star: Star,
};

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const match = value.match(/\d+/);
    if (!match || match.index === undefined) return;

    const number = parseInt(match[0], 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);

    const controls = animate(0, number, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{value}</span>;
}

interface StatsProps {
  data: StatsVariant;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function Stats({ data }: StatsProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black py-12 text-white sm:py-14 md:py-16">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-3/4 md:w-1/3"
        style={{
          maskImage: "linear-gradient(to right, black 20%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 20%, transparent 100%)",
        }}
      >
        <Image
          src={data.imageLeft}
          alt={data.imageLeftAlt || "Tattoo machine"}
          fill
          sizes="(max-width: 768px) 75vw, 33vw"
          className="object-cover opacity-20 mix-blend-lighten md:opacity-60"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-3/4 md:w-1/3"
        style={{
          maskImage: "linear-gradient(to left, black 20%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 20%, transparent 100%)",
        }}
      >
        <Image
          src={data.imageRight}
          alt={data.imageRightAlt || "Tattoo artist"}
          fill
          sizes="(max-width: 768px) 75vw, 33vw"
          className="object-cover opacity-20 mix-blend-lighten md:opacity-60"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 grid grid-cols-2 items-center justify-center md:grid-cols-4"
        >
          {data.stats.map((stat: StatItem, index: number) => {
            const Icon = iconMap[stat.icon] || Star;

            const borderClasses =
              index === 0
                ? "border-r border-b md:border-b-0"
                : index === 1
                  ? "border-b md:border-b-0 md:border-r"
                  : index === 2
                    ? "border-r"
                    : "";

            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className={`flex flex-col items-center border-red-600/30 px-2 py-6 text-center sm:py-7 md:py-0 ${borderClasses}`}
              >
                <Icon
                  className="mb-2.5 h-7 w-7 text-red-600 md:mb-3 md:h-10 md:w-10"
                  strokeWidth={1.5}
                />

                <span className="mb-1 text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  <AnimatedCounter value={stat.value} />
                </span>

                <span className="text-xs tracking-wide text-gray-300 sm:text-sm md:text-base">
                  {stat.label}
                </span>

                <div className="mt-3 h-0.5 w-6 bg-red-600 md:mt-4 md:w-8" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
