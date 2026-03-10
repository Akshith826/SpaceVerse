import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, Satellite, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const missions = [
  {
    title: 'Artemis Program',
    description: 'Returning humans to the Moon and establishing the first long-term presence on the lunar surface.',
    icon: <Globe className="text-accent-glow" size={32} />,
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'James Webb Telescope',
    description: 'Looking back over 13.5 billion years to see the first stars and galaxies forming out of the darkness.',
    icon: <Satellite className="text-accent-glow" size={32} />,
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Mars Sample Return',
    description: 'A proposed mission to collect rock and dust samples from Mars and return them to Earth for analysis.',
    icon: <Compass className="text-accent-glow" size={32} />,
    color: 'from-red-500/20 to-orange-500/20',
  },
];

export default function Missions() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section id="missions" ref={sectionRef} className="py-32 relative z-10">
      <div className="container mx-auto px-6">

        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Active <span className="text-accent-glow">Missions</span>
            </h2>
            <p className="text-star-dim max-w-2xl mx-auto">
              Track humanity's current endeavors across the solar system and beyond.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((mission, idx) => (
            <div
              key={idx}
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-accent-glow/50 transition-colors duration-500 cursor-pointer min-h-[280px]"
            >
              <div className={`absolute -inset-2 bg-gradient-to-br ${mission.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`} />
              <div className="mb-6 p-4 rounded-xl bg-space-800/50 inline-block border border-white/5">
                {mission.icon}
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3">{mission.title}</h3>
              <p className="text-star-dim mb-8 line-clamp-3">{mission.description}</p>
              <div className="absolute bottom-8 left-8">
                <Button variant="ghost" size="sm" className="p-0 border-none group-hover:text-accent-glow">
                  Explore Mission <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline">View Complete Database</Button>
        </div>
      </div>
    </section>
  );
}
