"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <div className="py-20 scroll-mt-20" id="projects">
      <motion.h1
        className="heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </motion.h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item, index) => (
          <motion.div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <PinContainer title="View Project" href={item.link}>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-6 rounded-xl group-hover/pin:shadow-lg transition-shadow duration-300">
                <div
                  className="relative w-full h-full overflow-hidden rounded-xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img
                    src="/bg.png"
                    alt="bgimg"
                    className="w-full h-full object-cover"
                  />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0 transition-transform duration-300 group-hover/pin:scale-105"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 mb-3 text-white group-hover/pin:text-purple transition-colors duration-300">
                {item.title}
              </h1>

              <p
                className="lg:text-base md:text-sm text-xs line-clamp-2 mb-6"
                style={{
                  color: "#BEC1DD",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  {item.iconLists.map((icon, index) => (
                    <motion.div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black/50 backdrop-blur-sm lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      whileHover={{
                        scale: 1.2,
                        borderColor: "rgba(203, 172, 249, 0.5)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={icon} alt={`tech-${index}`} className="p-2" />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="flex justify-center items-center gap-2 opacity-70 group-hover/pin:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs lg:text-sm text-purple font-medium">
                    View Project
                  </p>
                  <FaLocationArrow className="text-purple" size={12} />
                </motion.div>
              </div>
            </PinContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
