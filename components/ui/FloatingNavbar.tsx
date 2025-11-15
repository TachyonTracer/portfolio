"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-4 inset-x-0 mx-auto px-6 py-3 rounded-2xl border shadow-2xl items-center justify-center gap-4",
          className
        )}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: "rgba(4, 7, 29, 0.85)",
          borderRadius: "16px",
          border: "1px solid rgba(203, 172, 249, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(203, 172, 249, 0.15)",
        }}
      >
        <a
          href="#home"
          onClick={handleScrollToTop}
          className="mr-2 flex items-center gap-2 group cursor-pointer no-underline"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple to-blue-500 flex items-center justify-center font-bold text-white text-xs group-hover:scale-110 transition-transform duration-300">
            PP
          </div>
          <span className="hidden md:block font-bold text-white font-hero text-xs">
            Portfolio
          </span>
        </a>

        <div className="h-5 w-px bg-white/20 hidden md:block" />

        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            onClick={(e) => {
              e.preventDefault();
              // Special handling for home link
              if (navItem.link === "#home") {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                const target = document.querySelector(navItem.link);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }
            }}
            className={cn(
              "relative group px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-purple/10 cursor-pointer"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors duration-300">
              {navItem.name}
            </span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-purple to-transparent group-hover:w-full transition-all duration-300" />
          </a>
        ))}
        {/* remove this login btn */}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};
