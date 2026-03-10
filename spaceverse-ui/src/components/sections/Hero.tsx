import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import { ChevronDown, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Reveal animation
    gsap.fromTo(
      ".hero-element",
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        delay: 0.5 
      }
    );
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-space-950/40 z-0 radial-gradient-mask"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          style={{ y: yText, opacity }}
          className="max-w-4xl mx-auto"
        >
          <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-accent-glow/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest text-star-white uppercase">
              Interactive Space Traffic Simulator
            </span>
          </div>
          
          <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-6">
            Explore The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glow-bright via-nebula-400 to-cosmic-400 text-glow-accent">
              Unknown
            </span>
          </h1>
          
          <p className="hero-element text-lg md:text-xl text-star-dim mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the universe like never before. Navigate through real-time traffic, visualize orbital mechanics, and embark on epic space missions.
          </p>
          
          <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asMotion={true}>
              <Rocket size={18} />
              Launch Simulator
            </Button>
            <Button variant="outline" size="lg">
              View Missions
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-star-dim"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-accent-glow" />
        </motion.div>
      </motion.div>
    </section>
  );
}
