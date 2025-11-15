import React from "react";
import { motion } from "framer-motion";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <div className="py-20 w-full scroll-mt-20" id="experience">
      <motion.h1
        className="heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My <span className="text-purple">work experience</span>
      </motion.h1>

      <div className="w-full mt-16 max-w-6xl mx-auto px-4">
        {/* Timeline container */}
        <div className="relative">
          {/* Timeline line - positioned to go through the dots */}
          <div className="absolute left-[2rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple via-purple/50 to-transparent md:transform md:-translate-x-1/2" />

          {/* Timeline items */}
          {workExperience.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className={`relative flex items-start mb-16 md:mb-20 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot - centered on the line and card */}
              <div className="absolute left-[2rem] md:left-1/2 top-1/2 -translate-y-1/2 z-10 transform -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-purple border-4 border-black-100 shadow-lg shadow-purple/50" />
              </div>

              {/* Skills on opposite side */}
              <motion.div
                className={`hidden lg:block absolute top-8 ${
                  index % 2 === 0
                    ? "left-[calc(50%+3rem)]"
                    : "right-[calc(50%+3rem)]"
                } w-56`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              >
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-purple/5 to-transparent border border-purple/10 backdrop-blur-sm">
                  {/* Decorative corner glow */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple/10 rounded-full blur-2xl" />

                  <div className="relative space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-4 bg-gradient-to-b from-purple to-purple/50 rounded-full" />
                      <p className="text-xs font-bold text-purple uppercase tracking-wider">
                        Tech Stack
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {card.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.2 + 0.5 + idx * 0.1,
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple/20 to-purple/10 border border-purple/30 rounded-lg backdrop-blur-sm shadow-lg shadow-purple/5 cursor-default transition-all"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0
                    ? "md:mr-auto md:pr-12"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                <Button
                  duration={Math.floor(Math.random() * 10000) + 10000}
                  borderRadius="1.75rem"
                  style={{
                    background: "rgb(4,7,29)",
                    backgroundColor:
                      "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                    borderRadius: `calc(1.75rem * 0.96)`,
                  }}
                  className="text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full"
                  containerClassName="relative"
                >
                  {/* Year badge - floating on top right of the card */}
                  <div className="hidden md:block absolute top-4 right-6 z-30">
                    <div className="px-4 py-1.5 rounded-full bg-purple/20 border border-purple/40 backdrop-blur-md shadow-lg">
                      <span className="text-xs font-mono font-bold text-purple whitespace-nowrap">
                        {card.year}
                      </span>
                    </div>
                  </div>

                  <div className="relative p-6 pt-12 rounded-2xl overflow-hidden group">
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at top right, rgba(203, 172, 249, 0.1), transparent 70%)",
                      }}
                    />

                    {/* Icon and Title */}
                    <div className="relative flex items-center mb-4">
                      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-purple/10 border border-purple/20 group-hover:bg-purple/20 transition-colors">
                        <img
                          src={card.thumbnail}
                          alt={card.title}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs font-mono text-purple/70 mt-1 md:hidden">
                          {card.year}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="relative text-white-100 text-sm leading-relaxed">
                      {card.desc}
                    </p>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
