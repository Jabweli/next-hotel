import React from "react";
import * as motion from "framer-motion/client";

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

interface AnimatedTextProps {
  title: string;
  classname: string;
}

export default function AnimatedText({ title, classname }: AnimatedTextProps) {
  return (
    <div>
      <motion.h1
        className={classname}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {title.split(" ").map((word, index) => (
          <motion.span
            key={word + "-" + index}
            className="inline-block"
            variants={singleWord}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
