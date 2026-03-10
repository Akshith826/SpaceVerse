import React from 'react';
import Navbar from './Navbar';
import SpaceBackground from '../background/SpaceBackground';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen font-sans selection:bg-accent-glow selection:text-space-950">
      <SpaceBackground />
      <Navbar />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
