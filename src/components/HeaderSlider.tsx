'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Instagram, Twitter, Play } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundGradient: string;
  color: string;
  category: string;
  video: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'DIRECTION ARTISTIQUE',
    subtitle: 'Création d\'univers visuels',
    description: 'Conception et développement d\'identités visuelles uniques pour des expériences narratives authentiques et mémorables.',
    backgroundGradient: 'from-orange-900/20 via-black to-black',
    color: '#FFB454',
    category: 'Créatif',
    video: '/videos/BIGJIVF.mp4'
  },
  {
    id: 2,
    title: 'PRODUCTION CINÉMA',
    subtitle: 'Excellence technique',
    description: 'Réalisation de contenus audiovisuels avec une approche cinématographique et une maîtrise technique avancée.',
    backgroundGradient: 'from-purple-900/20 via-black to-black',
    color: '#8B5CF6',
    category: 'Production',
    video: '/videos/Couchersoleil.mp4'
  },
  {
    id: 3,
    title: 'CAPTATION ÉVÉNEMENTIELLE',
    subtitle: 'Moments authentiques',
    description: 'Documentation cinématographique d\'événements avec discrétion professionnelle et regard artistique unique.',
    backgroundGradient: 'from-cyan-900/20 via-black to-black',
    color: '#06B6D4',
    category: 'Événement',
    video: '/videos/Gradur.mp4'
  },
  {
    id: 4,
    title: 'PORTRAIT NARRATIF',
    subtitle: 'Essence humaine',
    description: 'Création de portraits avec approche narrative et éclairage cinématographique pour révéler l\'authenticité.',
    backgroundGradient: 'from-emerald-900/20 via-black to-black',
    color: '#10B981',
    category: 'Portrait',
    video: '/videos/impulstarvF.mp4'
  }
];

interface SlideContentProps {
  slide: Slide;
  isActive: boolean;
  activeIndex: number;
  currentIndex: number;
  isAutoplayEnabled: boolean;
  onSlideChange: (index: number) => void;
  onPlayPauseToggle: () => void;
}

const SlideContent: React.FC<SlideContentProps> = ({ 
  slide, 
  isActive, 
  activeIndex, 
  currentIndex,
  isAutoplayEnabled,
  onSlideChange,
  onPlayPauseToggle
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Vidéo en arrière-plan avec optimisation des performances */}
      <video
        src={slide.video}
        className="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-[2s]"
        autoPlay
        loop
        muted
        playsInline
        style={{ 
          objectFit: 'cover',
          transform: isActive ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 2s ease-out'
        }}
        preload="auto"
        quality="2160p"
      />
      
      {/* Overlay amélioré avec gradient plus subtil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70" />

      {/* Contenu textuel avec animations optimisées */}
      <div className="absolute inset-x-0 bottom-32 z-20">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-12">
          <div className="flex flex-col items-start space-y-8">
            <div 
              className="flex items-center space-x-4 transform transition-all duration-1000"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <span className="font-syne text-8xl text-white/10 leading-none">
                {String(slide.id).padStart(2, '0')}
              </span>
              <div className="w-[1px] h-16 bg-white/10" />
              <span className="text-sm tracking-[0.4em] uppercase text-white/60 font-light">
                {slide.category}
              </span>
            </div>

            <h1 
              className="font-syne font-[100] text-7xl lg:text-9xl text-white leading-[0.9] tracking-tight max-w-4xl"
              style={{
                transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                opacity: isActive ? 1 : 0,
                transition: 'all 1s ease-out 0.3s'
              }}
            >
              {slide.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation épurée */}
      <div className="fixed bottom-12 right-12 z-30">
        <div className="flex items-center space-x-8 bg-black/20 backdrop-blur-md rounded-full px-8 py-4">
          {/* Bouton précédent */}
          <button
            onClick={() => onSlideChange(activeIndex > 0 ? activeIndex - 1 : slides.length - 1)}
            className="group relative px-4 py-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-full" />
            <svg 
              className="w-6 h-6 text-white/70 group-hover:text-white transition-all duration-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Indicateurs de progression */}
          <div className="flex space-x-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => onSlideChange(index)}
                className="relative group"
              >
                <div className="w-12 h-[1px] bg-white/10 transition-all duration-700" />
                <div 
                  className="absolute top-0 left-0 h-[1px] bg-white/70 transition-all duration-700"
                  style={{
                    width: index === activeIndex ? '100%' : '0%',
                  }}
                />
                <div 
                  className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs text-white/60"
                >
                  {slides[index].category}
                </div>
              </button>
            ))}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={() => onSlideChange(activeIndex < slides.length - 1 ? activeIndex + 1 : 0)}
            className="group relative px-4 py-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-full" />
            <svg 
              className="w-6 h-6 text-white/70 group-hover:text-white transition-all duration-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={1}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bouton Play/Pause */}
          <button
            onClick={onPlayPauseToggle}
            className="group relative px-4 py-2 overflow-hidden border-l border-white/10 ml-4 pl-8"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-full" />
            {isAutoplayEnabled ? (
              <svg 
                className="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg 
                className="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const HeaderSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const swiperRef = useRef<SwiperType>();

  const handleSlideChange = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handlePlayPauseToggle = () => {
    if (swiperRef.current) {
      if (isAutoplayEnabled) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsAutoplayEnabled(!isAutoplayEnabled);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        swiperRef.current?.slideNext();
      } else if (e.key === 'ArrowLeft') {
        swiperRef.current?.slidePrev();
      } else if (e.key === ' ') {
        handlePlayPauseToggle();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAutoplayEnabled]);

  return (
    <div className="relative w-full h-screen overflow-hidden group">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        speed={1200}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <SlideContent 
              slide={slide} 
              isActive={index === activeIndex}
              activeIndex={activeIndex}
              currentIndex={index}
              isAutoplayEnabled={isAutoplayEnabled}
              onSlideChange={handleSlideChange}
              onPlayPauseToggle={handlePlayPauseToggle}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Grands boutons de navigation sur les côtés */}
      <button 
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="p-6 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300">
          <svg 
            className="w-8 h-8 text-white/70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <button 
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="p-6 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300">
          <svg 
            className="w-8 h-8 text-white/70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Social Links avec design épuré */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-50 mix-blend-difference">
        <div className="w-[0.5px] h-16 bg-white/10" />
        <div className="flex flex-col gap-6">
          {[
            { icon: Instagram, href: 'https://instagram.com/nhcam' },
            { icon: Twitter, href: 'https://twitter.com/nhcam' },
            { icon: Play, href: 'https://tiktok.com/@nhcam' },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white transition-all duration-500 transform hover:scale-110"
            >
              <social.icon className="h-4 w-4" strokeWidth={1} />
            </a>
          ))}
        </div>
        <div className="w-[0.5px] h-16 bg-white/10" />
      </div>
    </div>
  );
};

export default HeaderSlider; 