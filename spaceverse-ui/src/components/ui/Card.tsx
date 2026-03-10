import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from './Button';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  asMotion?: boolean;
  glowColor?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, asMotion = false, glowColor = 'bg-accent-glow', children, ...props }, ref) => {
    const baseClasses = 'glass-panel p-6 rounded-2xl relative overflow-hidden group transition-all duration-300';

    if (asMotion) {
      return (
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          whileHover={{ y: -5 }}
          className={cn(baseClasses, 'hover:border-accent-glow/50', className)}
          {...(props as HTMLMotionProps<'div'>)}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 ${glowColor} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full -translate-y-1/2 translate-x-1/2`} />
          <div className="relative z-10">{children}</div>
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cn(baseClasses, className)} {...props}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';
