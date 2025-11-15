"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  highlightWords,
}: {
  words: string;
  className?: string;
  highlightWords?: string[];
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      {
        duration: 0.5,
        delay: stagger(0.05),
        ease: "easeOut",
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          const shouldHighlight = highlightWords
            ? highlightWords.includes(word)
            : idx > 3;
          return (
            <motion.span
              key={word + idx}
              className={` ${
                shouldHighlight ? "text-purple" : "dark:text-white text-black"
              } opacity-0`}
              style={{
                filter: "blur(8px)",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      {/* mt-4 to my-4 */}
      <div className="my-4">
        {/* remove  text-2xl from the original */}
        <div className="dark:text-white text-black leading-snug tracking-wide text-center">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
