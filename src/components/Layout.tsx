'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Twitter, Play, Mail, MapPin, Phone, Menu, X, ArrowUpRight } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Fermer le menu mobile avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Accueil', href: '/', description: 'Découvrir l\'univers NHCAM' },
    { name: 'Portfolio', href: '/portfolio', description: 'Créations & projets récents' },
    { name: 'Services', href: '/services', description: 'Expertise & accompagnement' },
    { name: 'Contact', href: '/contact', description: 'Démarrer un projet ensemble' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/nhcam', label: 'Instagram', color: '#E4405F' },
    { icon: Twitter, href: 'https://twitter.com/nhcam', label: 'Twitter', color: '#1DA1F2' },
    { icon: Play, href: 'https://tiktok.com/@nhcam', label: 'TikTok', color: '#FF0050' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      
      {/* Effet de lumière globale suivant la souris */}
      <div 
        className="fixed inset-0 opacity-[0.005] pointer-events-none z-10"
        style={{
          background: `radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 60%)`
        }}
      />

      {/* Navigation ultra sophistiquée */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-2xl border-b border-white/[0.03] shadow-2xl shadow-black/20' 
          : 'bg-black/40 backdrop-blur-md'
      }`}>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo ultra épuré avec animations */}
            <Link 
              href="/" 
              className="group relative z-10"
              onMouseEnter={() => setHoveredItem('logo')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                <img 
                  src="/images/LOGONHCAMV2- 300DPI.png" 
                  alt="NHCAM"
                  style={{ width: '120px', height: 'auto' }}
                  className="transition-all duration-700 group-hover:opacity-90 group-hover:scale-105 mix-blend-difference"
                />
                
                {/* Ligne décorative animée */}
                <div className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-gradient-to-r from-white/40 to-transparent transition-all duration-700 group-hover:w-full" />
                
                {/* Particule flottante */}
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
                
                {/* Effet de glow ultra subtil */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-3 transition-opacity duration-1000 bg-white rounded-sm blur-lg" />
              </div>
            </Link>

            {/* Navigation principale desktop */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative py-3 px-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className={`
                    font-inter font-[300] text-sm tracking-[0.2em] uppercase transition-all duration-700 relative z-10
                    ${pathname === item.href 
                      ? 'text-white mix-blend-difference' 
                      : 'text-white/70 group-hover:text-white mix-blend-difference'
                    }
                  `}>
                    {item.name}
                  </span>
                  
                  {/* Indicateur actif */}
                  <div className={`
                    absolute -bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-white mix-blend-difference transition-all duration-700
                    ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-3/4'}
                  `} />
                </Link>
              ))}
            </div>

            {/* Bouton menu mobile ultra design */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden group relative p-4 z-50 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 hover:bg-black/80 hover:border-white/40 transition-all duration-300 shadow-lg"
              aria-label="Menu"
              style={{ minWidth: '48px', minHeight: '48px' }}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Lignes du hamburger avec animation sophistiquée */}
                <div className="absolute inset-0 flex flex-col justify-center space-y-2">
                  <div className={`w-6 h-[2px] bg-white rounded-full transition-all duration-500 origin-center ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : 'group-hover:bg-white/90'
                  }`} />
                  <div className={`w-5 h-[2px] bg-white rounded-full transition-all duration-500 ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : 'group-hover:bg-white/90 group-hover:w-6'
                  }`} />
                  <div className={`w-6 h-[2px] bg-white rounded-full transition-all duration-500 origin-center ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : 'group-hover:bg-white/90'
                  }`} />
                </div>
                
                {/* Cercle de background au hover */}
                <div className="absolute inset-0 rounded-xl bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                
                {/* Indicateur visuel supplémentaire */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile ultra sophistiqué */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ${
        isMobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop avec blur */}
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Contenu du menu */}
        <div className={`relative h-full flex flex-col justify-center px-6 transition-all duration-700 ${
          isMobileMenuOpen ? 'translate-y-0' : 'translate-y-8'
        }`}>
          
          {/* Navigation mobile */}
          <div className="space-y-8 mb-16">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group block"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`
                }}
              >
                <div className="flex items-center justify-between py-4 border-b border-white/5">
                  <div>
                    <h3 className={`font-syne font-[200] text-2xl sm:text-3xl tracking-[0.05em] transition-colors duration-500 ${
                      pathname === item.href ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}>
                      {item.name}
                    </h3>
                    <p className="font-inter font-[200] text-xs text-white/40 mt-1 tracking-[0.1em]">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Flèche avec animation */}
                  <ArrowUpRight className={`w-5 h-5 text-white/20 transition-all duration-500 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    pathname === item.href ? 'text-white/60' : ''
                  }`} strokeWidth={1} />
                </div>
                
                {/* Indicateur actif mobile */}
                {pathname === item.href && (
                  <div className="w-8 h-[0.5px] bg-white/40 mt-2" />
                )}
              </Link>
            ))}
          </div>

          {/* Informations de contact mobile */}
          <div className="space-y-6 border-t border-white/5 pt-8">
            <div className="flex items-center space-x-4">
              <Mail className="h-4 w-4 text-white/20" strokeWidth={1} />
              <a 
                href="mailto:hello@nhcam.com" 
                className="font-inter font-[200] text-sm text-white/50 hover:text-white/80 transition-colors duration-500"
              >
                hello@nhcam.com
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <MapPin className="h-4 w-4 text-white/20" strokeWidth={1} />
              <span className="font-inter font-[200] text-sm text-white/50">
                Paris, France
              </span>
            </div>
          </div>

          {/* Réseaux sociaux mobile */}
          <div className="flex space-x-6 mt-8 pt-6 border-t border-white/5">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 hover:bg-white/[0.02] transition-all duration-700 rounded-full"
                aria-label={social.label}
                style={{ 
                  animationDelay: `${0.4 + index * 0.1}s`,
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.4 + index * 0.1}s`
                }}
              >
                <social.icon className="h-5 w-5 text-white/30 group-hover:text-white/70 transition-colors duration-700" strokeWidth={1} />
                
                {/* Effet de couleur thématique au hover */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                  style={{ backgroundColor: social.color }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer ultra sophistiqué */}
      <footer className="relative border-t border-white/[0.02] bg-black/50 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Informations principales */}
            <div className="md:col-span-1 lg:col-span-5 space-y-8">
              <div>
                <img 
                  src="/images/LOGONHCAMV2- 300DPI.png" 
                  alt="NHCAM"
                  style={{ width: '120px', height: 'auto' }}
                  className="mb-4 lg:mb-6 opacity-90"
                />
                <p className="font-inter font-[200] text-sm text-white/50 leading-relaxed max-w-md">
                  Direction artistique et production vidéo. Création d&apos;univers visuels 
                  authentiques et narratifs contemporains.
                </p>
              </div>

              {/* Informations de contact */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-4 group">
                  <MapPin className="h-3.5 w-3.5 text-white/20 group-hover:text-white/40 transition-colors duration-500" strokeWidth={0.5} />
                  <span className="font-inter font-[200] text-xs text-white/40 group-hover:text-white/60 transition-colors duration-500">
                    Paris, France
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <Mail className="h-3.5 w-3.5 text-white/20 group-hover:text-white/40 transition-colors duration-500" strokeWidth={0.5} />
                  <a 
                    href="mailto:hello@nhcam.com" 
                    className="font-inter font-[200] text-xs text-white/40 hover:text-white/70 transition-colors duration-500"
                  >
                    hello@nhcam.com
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation footer */}
            <div className="md:col-span-1 lg:col-span-3 space-y-4 lg:space-y-6">
              <h4 className="font-inter font-[200] text-xs tracking-[0.2em] uppercase text-white/30">
                Navigation
              </h4>
              <div className="space-y-2 lg:space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block font-inter font-[200] text-xs text-white/40 hover:text-white/70 transition-colors duration-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="md:col-span-2 lg:col-span-4 space-y-4 lg:space-y-6">
              <h4 className="font-inter font-[200] text-xs tracking-[0.2em] uppercase text-white/30">
                Suivez-nous
              </h4>
              <div className="flex space-x-4 lg:space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 hover:bg-white/[0.02] transition-all duration-700 rounded-full"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-white/20 group-hover:text-white/50 transition-colors duration-700" strokeWidth={0.5} />
                    
                    {/* Effet de couleur thématique */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-700"
                      style={{ backgroundColor: social.color }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright ultra minimaliste */}
          <div className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-white/[0.02]">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="font-inter font-[200] text-[10px] text-white/20 tracking-[0.2em] uppercase">
                © 2024 NHCAM. Tous droits réservés.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="font-inter font-[200] text-[10px] text-white/20 hover:text-white/40 transition-colors duration-500 tracking-[0.2em] uppercase">
                  Mentions légales
                </a>
                <a href="#" className="font-inter font-[200] text-[10px] text-white/20 hover:text-white/40 transition-colors duration-500 tracking-[0.2em] uppercase">
                  Confidentialité
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 