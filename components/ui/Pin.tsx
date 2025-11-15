"use client";
import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="relative p-6 rounded-2xl border border-white/[0.1] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(4,7,29,0.9) 0%, rgba(12,14,35,0.9) 100%)",
        }}
        whileHover={{
          borderColor: "rgba(203, 172, 249, 0.4)",
          boxShadow: "0 20px 40px rgba(203, 172, 249, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/pin:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(203, 172, 249, 0.1), transparent 70%)",
          }}
        />

        {/* View Project Badge */}
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-purple/20 border border-purple/30 backdrop-blur-sm opacity-0 group-hover/pin:opacity-100 transition-all duration-300"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(203, 172, 249, 0.3)",
          }}
        >
          <span className="text-xs font-medium text-purple">
            {title || "View Project"}
          </span>
        </motion.a>

        <div className={cn("relative z-10", className)}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return null; // Removed the complex 3D perspective effect
};
