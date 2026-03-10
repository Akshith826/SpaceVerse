import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asMotion?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asMotion = false, children, ...props }, ref) => {

    const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed z-10';

    const variants: Record<string, string> = {
      primary: 'cosmic-gradient text-white neon-border shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)]',
      secondary: 'bg-space-800 text-white border border-space-700 hover:bg-space-700 hover:border-accent-glow/50',
      outline: 'bg-transparent text-accent-glow border border-accent-glow hover:bg-accent-glow/10',
      ghost: 'bg-transparent text-star-dim hover:text-white hover:bg-white/5 border border-transparent',
    };

    const sizes: Record<string, string> = {
      sm: 'h-9 px-4 text-xs rounded-md',
      md: 'h-11 px-8 text-sm rounded-md',
      lg: 'h-14 px-10 text-base rounded-lg',
    };

    const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

    if (asMotion) {
      return (
        <motion.button
          ref={ref as React.RefObject<HTMLButtonElement>}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={combinedClasses}
          {...(props as HTMLMotionProps<'button'>)}
        >
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
