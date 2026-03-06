import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  innerClassName?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 40,
  reverse = false,
  className = "",
  innerClassName = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      // We assume children are duplicated for the infinite effect
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, [children]);

  useEffect(() => {
    if (contentWidth > 0 && !isHovered) {
      const startX = reverse ? -contentWidth : 0;
      const endX = reverse ? 0 : -contentWidth;
      
      // Calculate current progress to resume smoothly
      const currentX = x.get();
      const progress = reverse 
        ? (currentX + contentWidth) / contentWidth 
        : Math.abs(currentX) / contentWidth;
      
      const remainingDuration = (1 - progress) * speed;

      controls.start({
        x: [currentX, endX],
        transition: {
          duration: remainingDuration,
          ease: "linear",
          onComplete: () => {
            controls.start({
              x: [startX, endX],
              transition: {
                duration: speed,
                ease: "linear",
                repeat: Infinity,
              }
            });
          }
        }
      });
    } else if (isHovered) {
      controls.stop();
    }
  }, [contentWidth, speed, reverse, controls, isHovered]);

  return (
    <div 
      className={`overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: -contentWidth, right: 0 }}
        style={{ x }}
        animate={controls}
        onDragStart={() => {
          setIsHovered(true);
          controls.stop();
        }}
        onDragEnd={() => {
          // The useEffect will handle resuming the animation
          setIsHovered(false);
        }}
        className={`flex whitespace-nowrap ${innerClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
