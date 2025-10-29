'use client';

import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Camera, Film, Palette, Users, ArrowRight, Check, Star, Zap, Target } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  icon: React.ComponentType<any>;
  price: string;
  duration: string;
  deliverables: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: 'DIRECTION ARTISTIQUE',
    subtitle: 'Création d\'univers visuels',
    description: 'Conception et développement d\'identités visuelles uniques pour des expériences narratives authentiques et mémorables.',
    features: [
      'Recherche conceptuelle approfondie',
      'Développement d\'identité visuelle',
      'Direction créative complète',
      'Supervision artistique'
    ],
    color: '#FFB454',
    icon: Palette,
    price: 'Sur devis',
    duration: '2-4 semaines',
    deliverables: ['Moodboard', 'Charte graphique', 'Guidelines', 'Assets visuels']
  },
  {
    id: 2,
    title: 'PRODUCTION CINÉMA',
    subtitle: 'Excellence technique',
    description: 'Réalisation de contenus audiovisuels avec une approche cinématographique et une maîtrise technique avancée.',
    features: [
      'Pré-production complète',
      'Tournage professionnel',
      'Post-production avancée',
      'Étalonnage cinématographique'
    ],
    color: '#8B5CF6',
    icon: Film,
    price: 'À partir de 3500€',
    duration: '3-6 semaines',
    deliverables: ['Rushes HD/4K', 'Montage final', 'Étalonnage', 'Mixage audio']
  },
  {
    id: 3,
    title: 'CAPTATION ÉVÉNEMENTIELLE',
    subtitle: 'Moments authentiques',
    description: 'Documentation cinématographique d\'événements avec discrétion professionnelle et regard artistique unique.',
    features: [
      'Captation multi-caméras',
      'Approche documentaire',
      'Montage narratif',
      'Livraison rapide'
    ],
    color: '#06B6D4',
    icon: Camera,
    price: 'À partir de 1800€',
    duration: '1-2 semaines',
    deliverables: ['Highlights', 'Version longue', 'Photos HD', 'Teaser réseaux']
  },
  {
    id: 4,
    title: 'PORTRAIT NARRATIF',
    subtitle: 'Essence humaine',
    description: 'Création de portraits avec approche narrative et éclairage cinématographique pour révéler l\'authenticité.',
    features: [
      'Séance personnalisée',
      'Éclairage cinématographique',
      'Retouche artistique',
      'Formats multiples'
    ],
    color: '#10B981',
    icon: Users,
    price: 'À partir de 800€',
    duration: '1 semaine',
    deliverables: ['Portraits HD', 'Retouches', 'Formats web', 'Tirages premium']
  }
];

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'DÉCOUVERTE',
    description: 'Analyse approfondie de vos besoins et définition des objectifs créatifs pour une vision partagée.',
    icon: Target,
    color: '#FFB454'
  },
  {
    id: 2,
    title: 'CONCEPTION',
    description: 'Développement créatif et technique avec recherches visuelles et planification détaillée.',
    icon: Zap,
    color: '#8B5CF6'
  },
  {
    id: 3,
    title: 'RÉALISATION',
    description: 'Exécution professionnelle avec attention aux détails et respect des standards de qualité.',
    icon: Star,
    color: '#06B6D4'
  },
  {
    id: 4,
    title: 'LIVRAISON',
    description: 'Finalisation et remise des livrables avec accompagnement et suivi personnalisé.',
    icon: Check,
    color: '#10B981'
  }
];

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('services');
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const servicesTop = servicesRef.current?.offsetTop || 0;
      const processTop = processRef.current?.offsetTop || 0;
      const scrollY = window.scrollY + window.innerHeight / 2;

      if (scrollY >= processTop) {
        setActiveSection('process');
      } else if (scrollY >= servicesTop) {
        setActiveSection('services');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        
        {/* Effet de lumière globale suivant la souris */}
        <div 
          className="fixed inset-0 opacity-[0.005] pointer-events-none z-10"
          style={{
            background: `radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 50%)`
          }}
        />

        {/* Hero Section ultra sophistiquée */}
        <section className="relative pt-32 pb-24 px-6 lg:px-8">
          <div className="max-w-[1600px] mx-auto">
            
            {/* Titre principal avec effet de révélation */}
            <div className="text-center space-y-10 mb-20">
              <div className="overflow-hidden">
                <h1 
                  className={`font-syne font-[100] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.9] tracking-[0.02em] transition-all duration-2000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: '0.2s' }}
                >
                  SERVICES
                </h1>
              </div>
              
              <div className="overflow-hidden">
                <p 
                  className={`font-inter font-[200] text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed transition-all duration-1800 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-15 opacity-0'
                  }`}
                  style={{ transitionDelay: '0.4s' }}
                >
                  Accompagnement créatif et technique pour donner vie à vos projets visuels 
                  avec une approche artistique et professionnelle
                </p>
              </div>

              {/* Ligne décorative animée */}
              <div className="flex justify-center">
                <div 
                  className={`h-[0.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-2000 ${
                    isLoaded ? 'w-40 opacity-100' : 'w-0 opacity-0'
                  }`}
                  style={{ transitionDelay: '0.6s' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section ultra sophistiquée */}
        <section ref={servicesRef} className="px-6 lg:px-8 pb-32">
          <div className="max-w-[1600px] mx-auto">
            
            {/* Titre de section */}
            <div className="text-center mb-20">
              <h2 
                className={`font-syne font-[100] text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.05em] transition-all duration-1800 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-15 opacity-0'
                }`}
                style={{ transitionDelay: '0.8s' }}
              >
                Expertise Créative
              </h2>
            </div>

            {/* Grille de services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative"
                  style={{
                    animationDelay: `${1 + index * 0.2}s`,
                    transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  
                  {/* Container principal avec effets sophistiqués */}
                  <div className="relative p-8 lg:p-10 bg-white/[0.008] backdrop-blur-sm border border-white/[0.015] rounded-sm transition-all duration-1000 group-hover:border-white/[0.08] group-hover:bg-white/[0.02] min-h-[600px] flex flex-col">
                    
                    {/* En-tête avec icône et prix */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-1000 group-hover:border-white/30"
                          style={{ 
                            backgroundColor: `${service.color}08`,
                            borderColor: hoveredService === service.id ? `${service.color}40` : 'rgba(255,255,255,0.1)'
                          }}
                        >
                          <service.icon 
                            className="h-5 w-5 transition-colors duration-1000" 
                            style={{ 
                              color: hoveredService === service.id ? service.color : 'rgba(255,255,255,0.4)'
                            }}
                            strokeWidth={0.5} 
                          />
                        </div>
                        
                        {/* Ligne décorative */}
                        <div 
                          className="w-8 h-[0.5px] transition-all duration-1000"
                          style={{ 
                            backgroundColor: service.color,
                            opacity: hoveredService === service.id ? 1 : 0.3,
                            transform: hoveredService === service.id ? 'scaleX(1)' : 'scaleX(0.6)'
                          }}
                        />
                      </div>
                      
                      {/* Prix */}
                      <div className="text-right">
                        <p className="text-[9px] font-[200] text-white/30 tracking-[0.1em] uppercase mb-1">
                          Tarif
                        </p>
                        <p className="font-inter font-[200] text-sm text-white/60">
                          {service.price}
                        </p>
                      </div>
                    </div>

                    {/* Titre et sous-titre */}
                    <div className="space-y-3 mb-6">
                      <h3 className="font-syne font-[100] text-xl md:text-2xl text-white leading-tight tracking-[0.02em] transition-all duration-700 group-hover:text-white/90">
                        {service.title}
                      </h3>
                      <p 
                        className="font-inter font-[200] text-base transition-colors duration-700"
                        style={{ 
                          color: hoveredService === service.id ? service.color : 'rgba(255,255,255,0.5)'
                        }}
                      >
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="font-inter font-[200] text-sm text-white/50 leading-relaxed mb-8 transition-all duration-700 group-hover:text-white/70 flex-grow">
                      {service.description}
                    </p>

                    {/* Informations détaillées */}
                    <div className="space-y-6">
                      
                      {/* Durée */}
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[10px] font-[200] text-white/30 tracking-[0.1em] uppercase">
                          Durée: {service.duration}
                        </span>
                      </div>

                      {/* Fonctionnalités */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-[200] text-white/40 tracking-[0.15em] uppercase">
                          Inclus
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <div 
                              key={featureIndex}
                              className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-1000"
                              style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                            >
                              <div 
                                className="w-1 h-1 rounded-full transition-colors duration-700"
                                style={{ backgroundColor: service.color, opacity: 0.6 }}
                              />
                              <span className="font-inter font-[200] text-xs text-white/50">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Livrables */}
                      <div className="space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-1000" style={{ transitionDelay: '0.4s' }}>
                        <h4 className="text-[10px] font-[200] text-white/40 tracking-[0.15em] uppercase">
                          Livrables
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((deliverable, delIndex) => (
                            <span
                              key={delIndex}
                              className="px-3 py-1 text-[9px] font-[200] tracking-[0.1em] uppercase bg-white/[0.03] text-white/60 rounded-full border border-white/[0.05] transition-all duration-700 hover:border-white/20"
                              style={{ 
                                borderColor: hoveredService === service.id ? `${service.color}30` : 'rgba(255,255,255,0.05)'
                              }}
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-2 group-hover:translate-y-0" style={{ transitionDelay: '0.6s' }}>
                        <button className="group/btn flex items-center space-x-3 text-white/40 hover:text-white/80 transition-colors duration-700">
                          <span className="text-[9px] font-[200] tracking-[0.2em] uppercase">
                            Discuter du projet
                          </span>
                          <ArrowRight className="h-3 w-3 ml-3 transition-transform duration-700 group-hover/btn:translate-x-1" strokeWidth={0.5} />
                        </button>
                      </div>
                    </div>

                    {/* Effet de shimmer au hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-sm">
                      <div className="shimmer" />
                    </div>

                    {/* Bordure animée */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none rounded-sm"
                      style={{
                        boxShadow: `inset 0 0 0 1px ${service.color}20`
                      }}
                    />
                  </div>

                  {/* Effet de glow externe */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-1000 pointer-events-none rounded-sm blur-2xl"
                    style={{ backgroundColor: service.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processus Section ultra sophistiquée */}
        <section ref={processRef} className="px-6 lg:px-8 pb-32">
          <div className="max-w-[1600px] mx-auto">
            
            {/* Titre de section */}
            <div className="text-center mb-20">
              <h2 className="font-syne font-[100] text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.05em] mb-6">
                Processus Créatif
              </h2>
              <p className="font-inter font-[200] text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
                Une approche méthodique et collaborative pour garantir l'excellence de chaque projet
              </p>
            </div>

            {/* Étapes du processus */}
            <div className="relative">
              
              {/* Ligne de connexion */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-y-1/2" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {processSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="group relative text-center"
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    
                    {/* Numéro et icône */}
                    <div className="relative mb-6 flex justify-center">
                      <div 
                        className="relative w-20 h-20 rounded-full border border-white/10 flex items-center justify-center transition-all duration-1000 group-hover:border-white/30 group-hover:scale-110"
                        style={{ 
                          backgroundColor: `${step.color}08`,
                          borderColor: hoveredStep === step.id ? `${step.color}40` : 'rgba(255,255,255,0.1)'
                        }}
                      >
                        <step.icon 
                          className="h-6 w-6 transition-colors duration-1000" 
                          style={{ 
                            color: hoveredStep === step.id ? step.color : 'rgba(255,255,255,0.4)'
                          }}
                          strokeWidth={0.5} 
                        />
                        
                        {/* Numéro */}
                        <div 
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-[200] transition-all duration-1000"
                          style={{ 
                            backgroundColor: step.color,
                            color: 'white',
                            opacity: hoveredStep === step.id ? 1 : 0.6
                          }}
                        >
                          {step.id}
                        </div>
                        
                        {/* Effet de glow pulsant */}
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-1000 animate-pulse-glow"
                          style={{ backgroundColor: step.color }}
                        />
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="space-y-4">
                      <h3 className="font-syne font-[100] text-lg text-white tracking-[0.05em] transition-all duration-700 group-hover:text-white/90">
                        {step.title}
                      </h3>
                      <p className="font-inter font-[200] text-sm text-white/50 leading-relaxed transition-all duration-700 group-hover:text-white/70">
                        {step.description}
                      </p>
                    </div>

                    {/* Ligne de connexion mobile */}
                    {index < processSteps.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-8">
                        <div className="w-[0.5px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section ultra sophistiquée */}
        <section className="px-6 lg:px-8 pb-32">
          <div className="max-w-[1600px] mx-auto">
            <div className="relative text-center p-12 lg:p-16 bg-white/[0.008] backdrop-blur-sm border border-white/[0.015] rounded-sm">
              
              {/* Contenu */}
              <div className="space-y-8">
                <h2 className="font-syne font-[100] text-2xl md:text-3xl text-white tracking-[0.05em]">
                  Prêt à donner vie à votre projet ?
                </h2>
                <p className="font-inter font-[200] text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
                  Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
                </p>
                
                {/* CTA Button */}
                <div className="pt-4">
                  <button className="btn-ultra group">
                    <span>Commencer un projet</span>
                    <ArrowRight className="h-3 w-3 ml-3 transition-transform duration-700 group-hover:translate-x-1" strokeWidth={0.5} />
                  </button>
                </div>
              </div>

              {/* Effet de shimmer */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-sm">
                <div className="shimmer" />
              </div>
            </div>
          </div>
        </section>

        {/* Particules décoratives ultra subtiles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/[0.03] rounded-full animate-float"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${12 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage; 