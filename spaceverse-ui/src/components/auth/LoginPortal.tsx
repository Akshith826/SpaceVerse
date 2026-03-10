import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';

export default function LoginPortal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-space-950/80 backdrop-blur-md"
        >
          {/* Animated background elements for the portal */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_50%)]"
            />
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
          >
            {/* Glassmorphism Panel */}
            <div className="glass-panel p-8 rounded-2xl neon-border relative overflow-hidden">
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-star-dim hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8 relative z-10">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full border border-accent-glow flex items-center justify-center bg-space-800/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  <Lock className="text-accent-glow" size={24} />
                </motion.div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2">
                  {isLogin ? 'Control Station' : 'Join Fleet'}
                </h2>
                <p className="text-star-dim text-sm">
                  {isLogin ? 'Authenticate to access the Spaceverse simulator' : 'Register your credentials for space exploration'}
                </p>
              </div>

              <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative"
                    >
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dim" size={18} />
                      <input 
                        type="text" 
                        placeholder="Commander Name" 
                        className="w-full bg-space-950/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent-glow focus:ring-1 focus:ring-accent-glow transition-all"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dim group-focus-within:text-accent-glow transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="Transmission Frequency (Email)" 
                    className="w-full bg-space-950/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent-glow focus:ring-1 focus:ring-accent-glow transition-all"
                  />
                  {/* Focus animate trail */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-accent-glow group-focus-within:w-full group-focus-within:left-0 transition-all duration-300"></span>
                </div>

                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dim group-focus-within:text-accent-glow transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="Access Code" 
                    className="w-full bg-space-950/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent-glow focus:ring-1 focus:ring-accent-glow transition-all"
                  />
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-accent-glow group-focus-within:w-full group-focus-within:left-0 transition-all duration-300"></span>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" asMotion={true}>
                    {isLogin ? 'Initiate sequence' : 'Establish connection'}
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center relative z-10">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-star-dim hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                >
                  {isLogin ? "Don't have clearance? Request access." : "Already have clearance? Login."}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
