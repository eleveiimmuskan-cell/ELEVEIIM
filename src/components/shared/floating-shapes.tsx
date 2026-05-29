"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 80, x: "10%", y: "20%", delay: 0, duration: 8 },
  { size: 120, x: "75%", y: "15%", delay: 1, duration: 10 },
  { size: 60, x: "85%", y: "60%", delay: 0.5, duration: 7 },
  { size: 100, x: "20%", y: "70%", delay: 1.5, duration: 9 },
  { size: 40, x: "50%", y: "40%", delay: 2, duration: 6 },
  { size: 70, x: "60%", y: "80%", delay: 0.8, duration: 11 },
];

export function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -5, 8, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/30"
          style={{
            left: `${8 + i * 8}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
