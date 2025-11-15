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
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    return () => {
      // cleanup body overflow on unmount
      document.body.style.overflow = "";
    };
  }, []);

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
      const prev = scrollYProgress.getPrevious() ?? 0;
      let direction = current - prev;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <>
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

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((navItem: any) => (
            <a
              key={`desktop-${navItem.link}`}
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
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
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
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() =>
              setMenuOpen((prev) => {
                const next = !prev;
                document.body.style.overflow = next ? "hidden" : "";
                return next;
              })
            }
            className="p-2 rounded-md bg-white/[0.04] hover:bg-white/[0.06]"
          >
            {menuOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        {/* remove this login btn */}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-4 top-20 z-[6000] rounded-xl bg-black/80 border border-white/[.05] p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((navItem: any) => (
                <a
                  key={`mobile-${navItem.link}`}
                  href={navItem.link}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.body.style.overflow = "";
                    const target = document.querySelector(navItem.link);
                    if (target)
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-purple/10"
                >
                  {navItem.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
