/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Search, Sparkles, GraduationCap, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import Stats from '../components/Stats';
import AbstractShapes from '../components/AbstractShapes';
import { PageId } from '../types';

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const handleLearnMore = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clientsList = [
    { name: 'Umgeni Water', url: 'https://umngeni-uthukela.co.za/' },
    { name: 'Protea Engineering', url: 'https://www.protea.co.za' },
    { name: 'Hulamin', url: 'https://www.hulamin.co.za' },
    { name: 'Regional Tourism', url: 'https://www.zulu.org.za' },
    { name: 'Metropolitan Municipality', url: 'https://www.durban.gov.za' },
    { name: 'Sizakala Centres', url: 'https://www.durban.gov.za' },
    { name: 'SEDA', url: 'https://www.seda.org.za' },
    { name: 'Metro Film Commission', url: 'https://film.durban.gov.za/' },
    { name: 'Atlas Finance', url: 'https://www.atlasfinance.co.za' },
    { name: 'Assupol', url: 'https://www.assupol.co.za' }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-hidden">
      {/* Decorative background vectors */}
      <AbstractShapes />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden pt-20 pb-20 md:pt-28 md:pb-32 z-10 bg-[#250808]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          {/* Custom business/consulting-style background footage */}
          <source src="https://res.cloudinary.com/dvvugpu04/video/upload/v1784129907/hero_video_pride_and_joy_qgnxk1.mp4" type="video/mp4" />
        </video>

        {/* Semi-transparent dark overlay: Brand maroon #8B1E1E tinted dark (around 45% opacity) */}
        <div className="absolute inset-0 bg-[#250808]/45 mix-blend-multiply z-5 pointer-events-none" />
        <div className="absolute inset-0 bg-black/35 z-5 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-12 md:py-20">
          <div className="space-y-8">
            {/* Display Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] max-w-3xl mx-auto">
              Turning <span className="text-orange-200">Research</span> into <span className="text-brand-orange">Strategic Growth</span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-base md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto">
              Pride and Joy Consultants is a premier professional business advisory. We empower public sector agencies, multinational corporations, and local SMEs with scientifically sound market insights and practical commercial training.
            </p>

            {/* Interactive Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={() => handleLearnMore('book-online')}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-brand-maroon text-white font-sans font-bold text-base shadow-lg hover:bg-brand-maroon-hover hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              
              <button
                onClick={() => handleLearnMore('about')}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-sans font-bold text-base hover:bg-gray-50 hover:text-brand-maroon transition-all duration-200 w-full sm:w-auto"
              >
                Discover Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <Stats />

      {/* Service Pillars Section */}
      <section className="py-24 bg-white relative z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight leading-tight">
              Three Core Pillars of Our Advisory
            </h2>
            <p className="font-sans text-base text-gray-500 leading-relaxed">
              We have restructured our competencies around three core divisions, prioritizing objective academic research and SME capacity creation over basic commercial branding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Market Research */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-maroon/20 hover:bg-white p-8 space-y-6 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="inline-flex p-3 bg-brand-maroon/5 text-brand-maroon rounded-xl group-hover:bg-brand-maroon group-hover:text-white transition-colors duration-300">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900">
                  Market Research & Fieldwork
                </h3>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">
                  Quantitative questionnaires, multi-lingual focus group moderation, intercept interviews, and commercial effectiveness tracking. Accredited under SAMRA specifications.
                </p>
              </div>
              <button
                onClick={() => handleLearnMore('market-research')}
                className="inline-flex items-center text-brand-maroon font-sans font-bold text-sm hover:text-brand-maroon-hover pt-4 mt-4 border-t border-gray-100 group-hover:border-brand-maroon/10"
              >
                Learn more capabilities
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Pillar 2: Marketing & Branding */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-maroon/20 hover:bg-white p-8 space-y-6 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="inline-flex p-3 bg-brand-orange/5 text-brand-orange rounded-xl group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900">
                  Strategic Marketing & Brand Identity
                </h3>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">
                  Comprehensive market strategy, visual corporate identity design, logo creations, and annual reports, supported by select, professional event displays.
                </p>
              </div>
              <button
                onClick={() => handleLearnMore('marketing-branding')}
                className="inline-flex items-center text-brand-orange font-sans font-bold text-sm hover:text-brand-orange-hover pt-4 mt-4 border-t border-gray-100 group-hover:border-brand-orange/10"
              >
                Learn more capabilities
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Pillar 3: Training & Consulting */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-maroon/20 hover:bg-white p-8 space-y-6 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-5">
                <div className="inline-flex p-3 bg-brand-maroon/5 text-brand-maroon rounded-xl group-hover:bg-brand-maroon group-hover:text-white transition-colors duration-300">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900">
                  Business Training & SME Workshops
                </h3>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">
                  L&D / capacity-building services addressing digital marketing, corporate social responsibility, and strategic planning for small businesses and startups.
                </p>
              </div>
              <button
                onClick={() => handleLearnMore('training-consulting')}
                className="inline-flex items-center text-brand-maroon font-sans font-bold text-sm hover:text-brand-maroon-hover pt-4 mt-4 border-t border-gray-100 group-hover:border-brand-maroon/10"
              >
                Learn more capabilities
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Strip */}
      <section className="py-16 bg-gray-50 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-brand-maroon">
              Trusted By South Africa's Leading Brands & Public Agencies
            </h3>
            <p className="font-sans text-xs text-gray-400 mt-1">
              Delivering scientific research and corporate workshops across municipal and commercial sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {clientsList.map((client, idx) => (
              <a 
                key={idx}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-4 px-6 bg-white border border-gray-100 rounded-xl hover:border-brand-maroon/30 hover:shadow-md transition-all duration-200 group"
              >
                <span className="font-display font-bold text-xs md:text-sm text-gray-500 group-hover:text-brand-maroon tracking-tight text-center truncate duration-200">
                  {client.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Repeating Call to Action Banner before Footer */}
      <section className="py-20 relative z-10 overflow-hidden bg-brand-maroon text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,114,12,0.25)_0%,transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to Translate Market Data into Practical Enterprise Profitability?
          </h2>
          <p className="font-sans text-white/80 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Let's structure a custom methodology for your business. Book a session to consult directly with our senior consultants.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleLearnMore('book-online')}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-sans font-extrabold text-base rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Secure Your Consult Slot Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
