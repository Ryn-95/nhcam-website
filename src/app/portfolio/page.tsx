'use client';

import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';

const projects = [
  {
    id: 1,
    title: 'LUXE PARISIEN',
    category: 'Commercial',
    year: '2024',
    image: '/images/poster1.jpg',
    color: '#FFB454',
    description: 'Direction artistique pour campagne luxe',
    fullDescription: 'Projet de direction artistique complet pour une marque de luxe parisienne. Création d\'un univers visuel sophistiqué alliant tradition française et modernité contemporaine.',
    gallery: ['/images/poster1.jpg', '/images/poster2.jpg', '/images/poster3.jpg'],
    client: 'Maison de Luxe Paris',
    duration: '3 mois',
    services: ['Direction Artistique', 'Photographie', 'Post-Production'],
    awards: ['Prix de la Créativité 2024'],
    tags: ['Luxe', 'Élégance', 'Sophistication'],
    location: 'Paris, France',
    featured: true
  },
  {
    id: 2,
    title: 'PORTRAIT INTIME',
    category: 'Portrait',
    year: '2024',
    image: '/images/poster2.jpg',
    color: '#8B5CF6',
    description: 'Série photographique narrative',
    fullDescription: 'Exploration photographique de l\'intimité contemporaine à travers une série de portraits authentiques et émotionnels.',
    gallery: ['/images/poster2.jpg', '/images/poster1.jpg', '/images/poster4.jpg'],
    client: 'Projet Personnel',
    duration: '6 mois',
    services: ['Photographie', 'Direction Artistique', 'Édition'],
    awards: ['Sélection Festival Photo 2024'],
    tags: ['Intimité', 'Émotion', 'Authenticité'],
    location: 'Studio NHCAM',
    featured: false
  },
  {
    id: 3,
    title: 'ÉVÉNEMENT PRIVÉ',
    category: 'Événementiel',
    year: '2023',
    image: '/images/poster3.jpg',
    color: '#06B6D4',
    description: 'Captation cinématographique',
    fullDescription: 'Captation complète d\'un événement privé d\'exception avec une approche cinématographique et documentaire.',
    gallery: ['/images/poster3.jpg', '/images/poster4.jpg', '/images/poster1.jpg'],
    client: 'Événement Privé',
    duration: '1 semaine',
    services: ['Vidéographie', 'Montage', 'Étalonnage'],
    awards: [],
    tags: ['Événement', 'Cinéma', 'Documentaire'],
    location: 'Château de Versailles',
    featured: true
  },
  {
    id: 4,
    title: 'CINÉMA DOCUMENTAIRE',
    category: 'Cinéma',
    year: '2023',
    image: '/images/poster4.jpg',
    color: '#10B981',
    description: 'Production documentaire artistique',
    fullDescription: 'Documentaire artistique explorant les thématiques contemporaines à travers un regard cinématographique unique.',
    gallery: ['/images/poster4.jpg', '/images/poster3.jpg', '/images/poster2.jpg'],
    client: 'Production Indépendante',
    duration: '8 mois',
    services: ['Réalisation', 'Production', 'Post-Production'],
    awards: ['Mention Spéciale Festival 2023'],
    tags: ['Documentaire', 'Art', 'Société'],
    location: 'Multi-locations',
    featured: false
  },
  {
    id: 5,
    title: 'MARQUE PREMIUM',
    category: 'Commercial',
    year: '2024',
    image: '/images/poster1.jpg',
    color: '#FFB454',
    description: 'Identité visuelle complète',
    fullDescription: 'Création d\'une identité visuelle complète pour une marque premium, incluant photographie, vidéo et direction artistique.',
    gallery: ['/images/poster1.jpg', '/images/poster3.jpg', '/images/poster4.jpg'],
    client: 'Marque Premium',
    duration: '4 mois',
    services: ['Branding', 'Photographie', 'Vidéo'],
    awards: [],
    tags: ['Branding', 'Premium', 'Innovation'],
    location: 'Milan, Italie',
    featured: true
  },
  {
    id: 6,
    title: 'SÉRIE ARTISTIQUE',
    category: 'Portrait',
    year: '2023',
    image: '/images/poster2.jpg',
    color: '#8B5CF6',
    description: 'Exploration visuelle contemporaine',
    fullDescription: 'Série artistique explorant les codes visuels contemporains à travers une approche photographique expérimentale.',
    gallery: ['/images/poster2.jpg', '/images/poster4.jpg', '/images/poster1.jpg'],
    client: 'Galerie d\'Art',
    duration: '5 mois',
    services: ['Photographie Artistique', 'Conception', 'Exposition'],
    awards: ['Prix Artistique 2023'],
    tags: ['Art', 'Expérimentation', 'Contemporain'],
    location: 'Galerie Moderne',
    featured: false
  }
];

const categories = ['Tous', 'Commercial', 'Portrait', 'Événementiel', 'Cinéma'];
const sortOptions = ['Plus récent', 'Plus ancien', 'Alphabétique', 'Projets vedettes'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('Plus récent');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'list'>('grid');
  const modalRef = useRef<HTMLDivElement>(null);

  // Gestion du scroll pour parallaxe
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fermer le modal avec Escape et gestion des touches
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      switch (e.key) {
        case 'Escape':
          setSelectedProject(null);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Tri et filtrage des projets
  const filteredAndSortedProjects = (() => {
    let filtered = activeCategory === 'Tous' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);

    switch (sortBy) {
      case 'Plus ancien':
        return filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      case 'Alphabétique':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'Projets vedettes':
        return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      default:
        return filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }
  })();

  const openProject = (project: typeof projects[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProject(project);
      setCurrentImageIndex(0);
      setIsLoading(false);
    }, 300);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setIsFullscreen(false);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Gestion du swipe pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    modalRef.current?.setAttribute('data-start-x', touch.clientX.toString());
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat(modalRef.current?.getAttribute('data-start-x') || '0');
    const diffX = touch.clientX - startX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Particules animées ultra sophistiquées */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/5 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`
              }}
            />
          ))}
        </div>

        {/* Effet de lumière globale avec parallaxe */}
        <div 
          className="fixed inset-0 opacity-[0.005] pointer-events-none z-1"
          style={{
            background: `radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y + scrollY * 0.5}px, rgba(255,255,255,0.15), transparent 60%)`
          }}
        />

        {/* Hero Section ultra raffinée avec parallaxe */}
        <section className="pt-32 pb-20 px-8 lg:px-12 relative z-10">
          <div 
            className="max-w-[1400px] mx-auto"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="text-center mb-20">
              <div className="relative inline-block">
                <h1 className="font-syne font-[100] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-[0.1em] leading-[0.9] mb-8 relative">
                  PORTFOLIO
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent blur-xl opacity-0 hover:opacity-100 transition-opacity duration-1500" />
                </h1>
              </div>
              <div className="w-16 h-[0.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6 animate-pulse-glow" />
              <p className="text-white/30 text-sm font-[200] max-w-xl mx-auto tracking-[0.2em] animate-fade-in-up">
                Sélection de créations récentes • {filteredAndSortedProjects.length} projets
              </p>
            </div>

            {/* Contrôles avancés */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-16 space-y-8 lg:space-y-0">
              {/* Filtres */}
              <div className="flex space-x-12 lg:space-x-16">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`group relative transition-all duration-700 ${
                      activeCategory === category
                        ? 'text-white'
                        : 'text-white/20 hover:text-white/60'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-[10px] tracking-[0.4em] font-[200] uppercase">
                      {category}
                    </span>
                    <div className={`absolute -bottom-3 left-0 h-[0.5px] transition-all duration-700 ${
                      activeCategory === category 
                        ? 'w-full bg-white opacity-100' 
                        : 'w-0 bg-white/40 group-hover:w-full opacity-60'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Options de vue et tri */}
              <div className="flex items-center space-x-8">
                {/* Mode d'affichage */}
                <div className="flex items-center space-x-2">
                  {(['grid', 'masonry', 'list'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-2 transition-all duration-300 ${
                        viewMode === mode 
                          ? 'text-white bg-white/5' 
                          : 'text-white/30 hover:text-white/60'
                      }`}
                    >
                      <div className="w-4 h-4">
                        {mode === 'grid' && (
                          <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="bg-current rounded-[1px]" />
                            ))}
                          </div>
                        )}
                        {mode === 'masonry' && (
                          <div className="flex space-x-0.5 w-full h-full">
                            <div className="flex-1 bg-current rounded-[1px]" />
                            <div className="flex-1 bg-current rounded-[1px] mt-1" />
                            <div className="flex-1 bg-current rounded-[1px] mt-0.5" />
                          </div>
                        )}
                        {mode === 'list' && (
                          <div className="space-y-1 w-full h-full">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="bg-current h-0.5 rounded-[1px]" />
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Tri */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white/60 text-[10px] tracking-[0.2em] uppercase font-[200] border border-white/10 px-3 py-2 rounded focus:outline-none focus:border-white/30 transition-colors duration-300"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option} className="bg-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Grille de projets ultra sophistiquée */}
        <section className="pb-32 px-8 lg:px-12 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className={`
              ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12' : ''}
              ${viewMode === 'masonry' ? 'columns-1 md:columns-2 xl:columns-3 gap-8 lg:gap-12' : ''}
              ${viewMode === 'list' ? 'space-y-8' : ''}
            `}>
              {filteredAndSortedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group cursor-pointer relative animate-fade-in-up ${
                    viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''
                  } ${viewMode === 'list' ? 'flex items-center space-x-8' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateY(${scrollY * (0.02 + index * 0.005)}px)`
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => openProject(project)}
                >
                  {/* Badge projet vedette */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full">
                      <span className="text-yellow-400 text-[8px] tracking-[0.3em] uppercase font-[200]">
                        Vedette
                      </span>
                    </div>
                  )}

                  {/* Container principal */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    {/* Image container */}
                    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/80 mb-6 ${
                      viewMode === 'list' ? 'aspect-[4/3]' : 'aspect-[3/4]'
                    }`}>
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      
                      {/* Overlay sophistiqué avec dégradé dynamique */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                      
                      {/* Effet de couleur thématique avec animation */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-700 mix-blend-mode-overlay"
                        style={{ 
                          background: `radial-gradient(circle at center, ${project.color}40, transparent 70%)`
                        }}
                      />
                      
                      {/* Overlay info sophistiqué */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span 
                              className="text-[9px] tracking-[0.3em] font-[200] uppercase"
                              style={{ color: project.color }}
                            >
                              {project.category}
                            </span>
                            <div className="w-6 h-[0.5px] bg-white/30" />
                            <span className="text-white/60 text-[9px] font-[200] tracking-[0.2em]">
                              {project.year}
                            </span>
                          </div>
                          <h3 className="text-white text-base font-[200] tracking-[0.05em] leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-white/60 text-xs font-[200] leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-2">
                            {project.tags.slice(0, 2).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 text-[8px] tracking-[0.2em] uppercase font-[200] text-white/50 bg-white/5 rounded-full border border-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="pt-2">
                            <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase flex items-center">
                              Cliquer pour explorer
                              <svg className="w-3 h-3 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Indicateur hover animé */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: project.color }}
                        />
                      </div>

                      {/* Effet de scan line */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </div>
                    </div>

                    {/* Info projet externe */}
                    <div className="space-y-3">
                      <h3 className="text-white text-sm font-[200] tracking-[0.05em] group-hover:text-white/80 transition-colors duration-500">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span 
                          className="text-[9px] tracking-[0.3em] font-[200] uppercase transition-colors duration-500"
                          style={{ color: hoveredProject === project.id ? project.color : 'rgba(255,255,255,0.4)' }}
                        >
                          {project.category}
                        </span>
                        <div className="w-3 h-[0.5px] bg-white/20" />
                        <span className="text-white/30 text-[9px] font-[200] tracking-[0.2em]">
                          {project.year}
                        </span>
                        <div className="w-3 h-[0.5px] bg-white/20" />
                        <span className="text-white/20 text-[8px] font-[200] tracking-[0.2em]">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Informations supplémentaires pour le mode liste */}
                  {viewMode === 'list' && (
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-white text-xl font-[200] tracking-[0.05em] mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm font-[200] leading-relaxed">
                          {project.fullDescription}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-[200] text-white/60 bg-white/5 border border-white/10 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Effet de glow au hover ultra sophistiqué */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-1000 pointer-events-none rounded-2xl blur-xl"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal de détail du projet ultra sophistiqué */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <div 
              ref={modalRef}
              className={`relative w-full max-h-[95vh] overflow-hidden bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl transition-all duration-700 ${
                isFullscreen 
                  ? 'max-w-none h-screen rounded-none' 
                  : 'max-w-7xl'
              }`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Contrôles du modal */}
              <div className="absolute top-6 right-6 z-20 flex items-center space-x-3">
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 bg-black/50 rounded-full backdrop-blur-sm"
                  title="Mode plein écran (F)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <button
                  onClick={closeProject}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className={`grid gap-0 ${isFullscreen ? 'grid-cols-1 h-full' : 'grid-cols-1 lg:grid-cols-2'}`}>
                {/* Galerie d'images ultra sophistiquée */}
                <div className={`relative ${isFullscreen ? 'h-full' : 'aspect-[4/5] lg:aspect-auto lg:min-h-[700px]'}`}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105 hover:scale-110"
                    style={{ backgroundImage: `url(${selectedProject.gallery[currentImageIndex]})` }}
                  />
                  
                  {/* Overlay avec effet de couleur thématique */}
                  <div 
                    className="absolute inset-0 opacity-10 mix-blend-mode-overlay"
                    style={{ backgroundColor: selectedProject.color }}
                  />
                  
                  {/* Navigation galerie ultra sophistiquée */}
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* Indicateurs ultra sophistiqués */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                        {selectedProject.gallery.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`relative transition-all duration-500 ${
                              index === currentImageIndex 
                                ? 'w-8 h-2' 
                                : 'w-2 h-2 hover:w-4'
                            }`}
                          >
                            <div 
                              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                                index === currentImageIndex 
                                  ? 'bg-white' 
                                  : 'bg-white/30 hover:bg-white/60'
                              }`}
                              style={{
                                backgroundColor: index === currentImageIndex ? selectedProject.color : undefined
                              }}
                            />
                          </button>
                        ))}
                      </div>

                      {/* Compteur d'images */}
                      <div className="absolute top-6 left-6 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                        <span className="text-white/80 text-xs font-[200]">
                          {currentImageIndex + 1} / {selectedProject.gallery.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Informations détaillées ultra sophistiquées */}
                {!isFullscreen && (
                  <div className="p-8 lg:p-12 space-y-8 overflow-y-auto max-h-[700px]">
                    {/* En-tête avec animations */}
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="flex items-center space-x-4">
                        <span 
                          className="text-[10px] tracking-[0.3em] font-[200] uppercase px-3 py-1 rounded-full border"
                          style={{ 
                            color: selectedProject.color,
                            borderColor: selectedProject.color + '40'
                          }}
                        >
                          {selectedProject.category}
                        </span>
                        <div className="w-8 h-[0.5px] bg-white/30" />
                        <span className="text-white/60 text-[10px] font-[200] tracking-[0.2em]">
                          {selectedProject.year}
                        </span>
                        {selectedProject.featured && (
                          <>
                            <div className="w-8 h-[0.5px] bg-white/30" />
                            <span className="text-yellow-400 text-[8px] tracking-[0.3em] uppercase font-[200]">
                              ★ Vedette
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="font-syne font-[200] text-3xl lg:text-5xl text-white tracking-[0.05em] leading-tight">
                        {selectedProject.title}
                      </h2>
                      <p className="text-white/40 text-sm font-[200] tracking-[0.1em]">
                        {selectedProject.location}
                      </p>
                    </div>

                    {/* Description avec effet de révélation */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <p className="text-white/80 text-base font-[200] leading-relaxed">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-[200]">
                        Mots-clés
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-[200] text-white/70 bg-white/5 border border-white/10 rounded-full hover:border-white/20 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Détails du projet avec grille sophistiquée */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      <div className="space-y-3">
                        <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-[200]">
                          Client
                        </h4>
                        <p className="text-white text-sm font-[200]">
                          {selectedProject.client}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-[200]">
                          Durée
                        </h4>
                        <p className="text-white text-sm font-[200]">
                          {selectedProject.duration}
                        </p>
                      </div>
                    </div>

                    {/* Services avec icônes */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                      <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-[200]">
                        Services
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.services.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-white/3 border border-white/8 rounded-lg hover:bg-white/5 transition-colors duration-300"
                          >
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: selectedProject.color }}
                            />
                            <span className="text-[11px] tracking-[0.2em] uppercase font-[200] text-white/80">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Récompenses avec animations */}
                    {selectedProject.awards.length > 0 && (
                      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-[200]">
                          Récompenses
                        </h4>
                        <div className="space-y-3">
                          {selectedProject.awards.map((award, index) => (
                            <div key={index} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-400/5 to-transparent border border-yellow-400/20 rounded-lg">
                              <div className="w-6 h-6 flex items-center justify-center">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              </div>
                              <span className="text-white/80 text-sm font-[200]">
                                {award}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Instructions de navigation */}
                    <div className="pt-8 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                      <div className="flex flex-wrap gap-4 text-white/40 text-[9px] tracking-[0.2em] uppercase font-[200]">
                        <span>← → Navigation</span>
                        <span>F Plein écran</span>
                        <span>ESC Fermer</span>
                        <span className="lg:hidden">Swipe pour naviguer</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loader sophistiqué */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-white/20 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full animate-pulse" />
              </div>
              <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-[200] mt-4 text-center">
                Chargement...
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 