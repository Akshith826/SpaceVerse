import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Menu, X } from 'lucide-react';
import LoginPortal from '../auth/LoginPortal';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Explore', href: '#explore' },
  { name: 'Missions', href: '#missions' },
  { name: 'Events', href: '#events' },
  { name: 'Quiz', href: '#quiz' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
              className="text-accent-glow"
            >
              <Rocket size={24} className="group-hover:text-accent-glow-bright transition-colors" />
            </motion.div>
            <span className="font-heading font-bold text-xl tracking-wider text-glow">
              SPACE<span className="text-accent-glow font-light">VERSE</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-star-dim hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-glow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => setLoginOpen(true)}
              className="futuristic-btn ml-4 text-sm py-1.5 px-5"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-star-white hover:text-accent-glow transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden glass-panel absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4 border-t border-white/5"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-star-white font-medium py-2 border-b border-white/10 hover:text-accent-glow transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => { setLoginOpen(true); setMobileMenuOpen(false); }}
                className="futuristic-btn w-full mt-2"
              >
                Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Auth Portal — rendered outside nav to avoid z-index issues */}
      <LoginPortal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
