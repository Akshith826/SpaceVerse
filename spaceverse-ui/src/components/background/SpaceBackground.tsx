import { Canvas } from '@react-three/fiber';
import { Starfield } from './Starfield';

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-space-950">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Starfield />
      </Canvas>
    </div>
  );
}
