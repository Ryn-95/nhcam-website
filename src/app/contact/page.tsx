'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'hello@nhcam.com',
      description: 'Réponse sous 24h'
    },
    {
      label: 'Téléphone',
      value: '+33 6 00 00 00 00',
      description: 'Lun-Ven 9h-18h'
    },
    {
      label: 'Localisation',
      value: 'Paris, France',
      description: 'Disponible en Europe'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Effet de lumière globale */}
        <div 
          className="fixed inset-0 opacity-[0.008] pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 50%)`
          }}
        />

        {/* Hero Section ultra raffinée */}
        <section className="pt-32 pb-20 px-8 lg:px-12 relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-24">
              <div className="relative inline-block">
                <h1 className="font-syne font-[100] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-[0.1em] leading-[0.9] mb-8 relative">
                  CONTACT
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000" />
                </h1>
              </div>
              <div className="w-16 h-[0.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6" />
              <p className="text-white/30 text-sm font-[200] max-w-xl mx-auto tracking-[0.2em]">
                Discutons de votre vision créative
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form ultra sophistiqué */}
        <section className="pb-32 px-8 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
              
              {/* Informations de contact */}
              <div className="lg:col-span-2 space-y-16">
                <div>
                  <h2 className="font-syne font-[100] text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.05em] mb-12">
                    INFORMATIONS
                  </h2>
                  <div className="space-y-10">
                    {contactInfo.map((info, index) => (
                      <div 
                        key={index}
                        className="group space-y-3"
                        style={{ animationDelay: `${index * 0.15}s` }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase font-[200]">
                            {info.label}
                          </span>
                          <div className="w-6 h-[0.5px] bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
                        </div>
                        <p className="text-white/60 text-base font-[200] group-hover:text-white/80 transition-colors duration-500">
                          {info.value}
                        </p>
                        <p className="text-white/30 text-xs font-[200]">
                          {info.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-syne font-[100] text-xl text-white tracking-[0.05em]">
                    DISPONIBILITÉ
                  </h3>
                  <div className="space-y-3">
                    <p className="text-white/40 text-sm font-[200] leading-relaxed">
                      Réponse garantie sous 24h pour tous les projets.
                    </p>
                    <p className="text-white/30 text-xs font-[200]">
                      Disponible pour projets en France et Europe
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulaire ultra sophistiqué */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Champs du formulaire */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent border-b border-white/[0.05] text-white placeholder-white/20 py-5 text-base font-[200] focus:border-white/20 focus:outline-none transition-all duration-700"
                      />
                      <div className={`absolute bottom-0 left-0 h-[0.5px] bg-white transition-all duration-700 ${
                        focusedField === 'name' || formData.name ? 'w-full opacity-40' : 'w-0 opacity-0'
                      }`} />
                    </div>

                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent border-b border-white/[0.05] text-white placeholder-white/20 py-5 text-base font-[200] focus:border-white/20 focus:outline-none transition-all duration-700"
                      />
                      <div className={`absolute bottom-0 left-0 h-[0.5px] bg-white transition-all duration-700 ${
                        focusedField === 'email' || formData.email ? 'w-full opacity-40' : 'w-0 opacity-0'
                      }`} />
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Sujet"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-transparent border-b border-white/[0.05] text-white placeholder-white/20 py-5 text-base font-[200] focus:border-white/20 focus:outline-none transition-all duration-700"
                    />
                    <div className={`absolute bottom-0 left-0 h-[0.5px] bg-white transition-all duration-700 ${
                      focusedField === 'subject' || formData.subject ? 'w-full opacity-40' : 'w-0 opacity-0'
                    }`} />
                  </div>

                  <div className="relative group">
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full bg-transparent border-b border-white/[0.05] text-white placeholder-white/20 py-5 text-base font-[200] focus:border-white/20 focus:outline-none transition-all duration-700 resize-none"
                    />
                    <div className={`absolute bottom-0 left-0 h-[0.5px] bg-white transition-all duration-700 ${
                      focusedField === 'message' || formData.message ? 'w-full opacity-40' : 'w-0 opacity-0'
                    }`} />
                  </div>

                  {/* Bouton d'envoi sophistiqué */}
                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitted}
                      className="group relative overflow-hidden"
                    >
                      <div className="flex items-center space-x-4">
                        <span className={`text-[10px] tracking-[0.4em] uppercase font-[200] transition-all duration-700 ${
                          isSubmitted
                            ? 'text-green-400/80'
                            : 'text-white/30 group-hover:text-white/70'
                        }`}>
                          {isSubmitted ? 'Message envoyé' : 'Envoyer le message'}
                        </span>
                        
                        {/* Indicateur visuel */}
                        <div className={`w-8 h-[0.5px] transition-all duration-700 ${
                          isSubmitted 
                            ? 'bg-green-400/60' 
                            : 'bg-white/20 group-hover:bg-white/50 group-hover:w-12'
                        }`} />
                      </div>

                      {/* Effet de glow au hover */}
                      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-sm" />
                    </button>
                  </div>
                </form>

                {/* Message de confirmation */}
                {isSubmitted && (
                  <div className="mt-10 p-6 bg-gradient-to-r from-green-400/5 to-transparent rounded-lg border border-green-400/10">
                    <p className="text-green-400/80 text-sm font-[200]">
                      Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 