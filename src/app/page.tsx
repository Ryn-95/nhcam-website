'use client';

import { useEffect, useState } from 'react';
import HeaderSlider from '@/components/HeaderSlider'
import Layout from '@/components/Layout'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100, 
        y: (e.clientY / window.innerHeight) * 100 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">
        {/* HeaderSlider ultra sophistiqué */}
        <HeaderSlider />
        
        {/* Effet de lumière dynamique suivant la souris */}
        <div 
          className="fixed inset-0 pointer-events-none z-[5] opacity-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.03), transparent 70%)`
          }}
        />

        {/* Grille animée en arrière-plan */}
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
        </div>

        {/* Particules flottantes améliorées */}
        <div className="fixed inset-0 pointer-events-none z-[2]">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 backdrop-blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animation: `float ${10 + Math.random() * 20}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Lignes diagonales décoratives */}
        <div className="fixed inset-0 pointer-events-none z-[3] opacity-[0.02]">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>

        {/* Effet de vignette cinématographique */}
        <div className="fixed inset-0 pointer-events-none z-[4]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>

        {/* Film grain texture */}
        <div className="fixed inset-0 pointer-events-none z-[6] opacity-[0.015] mix-blend-overlay">
          <div className="w-full h-full animate-grain"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px'
            }}
          />
        </div>

        {/* Coins décoratifs */}
        <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[7] opacity-10">
          <div className="absolute top-8 left-8 w-full h-[1px] bg-gradient-to-r from-white to-transparent" />
          <div className="absolute top-8 left-8 w-[1px] h-full bg-gradient-to-b from-white to-transparent" />
        </div>
        <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-[7] opacity-10">
          <div className="absolute top-8 right-8 w-full h-[1px] bg-gradient-to-l from-white to-transparent" />
          <div className="absolute top-8 right-8 w-[1px] h-full bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-15px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </Layout>
  )
} 