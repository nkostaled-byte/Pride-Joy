/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, FileDown, Shield, ArrowRight, Grid, Layout, Award, BookOpen } from 'lucide-react';
import { marketingBrandingServices, brandingProducts } from '../data/services';
import AbstractShapes from '../components/AbstractShapes';
import { PageId } from '../types';

interface MarketingBrandingProps {
  setCurrentPage: (page: PageId) => void;
  setBookingCategory: (category: 'Market Research' | 'Marketing & Branding' | 'Training & Consulting') => void;
}

export default function MarketingBranding({ setCurrentPage, setBookingCategory }: MarketingBrandingProps) {
  const handleBookingClick = () => {
    setBookingCategory('Marketing & Branding');
    setCurrentPage('book-online');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-hidden py-16 md:py-24">
      {/* Background shape vectors */}
      <AbstractShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-left max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span className="font-sans font-bold text-xs text-brand-orange uppercase tracking-wide">
              Strategic Service Pillar • Premium Corporate Positioning
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
            Strategic Marketing & Brand Identity
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            We build cohesive, data-driven brand architectures. We handle everything from high-level positioning and corporate stationery layouts to professional physical display collateral for events.
          </p>
        </div>

        {/* Core Marketing Capabilities List */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight text-left">
              Our Strategic Brand Frameworks
            </h2>
            <p className="font-sans text-xs text-gray-400 mt-1 text-left">
              Moving beyond basic logos to build durable market presence and C-suite alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {marketingBrandingServices.map((service, index) => (
              <div 
                key={service.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 hover:border-brand-orange/20 hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="font-mono font-bold text-xs text-brand-orange bg-brand-orange/5 px-2.5 py-0.5 rounded-sm">
                    PILLAR 0{index + 1}
                  </span>
                  
                  <h3 className="font-display font-bold text-base md:text-lg text-gray-900">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Display Products Gallery Section (Supporting Service) */}
        <div className="space-y-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-100 pb-4">
            <div className="text-left">
              <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
                Corporate Physical Displays & Exhibition Collateral
              </h2>
              <p className="font-sans text-xs text-gray-400 mt-1">
                Professional execution of physical event signage and display assets.
              </p>
            </div>
            
            <div className="inline-flex items-center space-x-1.5 bg-brand-maroon/5 text-brand-maroon px-4 py-2 rounded-xl text-xs font-bold border border-brand-maroon/10">
              <FileDown className="w-4 h-4 shrink-0" />
              <span>Full physical product e-Catalog available on request</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {brandingProducts.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="aspect-video w-full overflow-hidden relative bg-gray-100">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-gray-900/80 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm">
                    {prod.category}
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h4 className="font-display font-bold text-sm text-gray-900">{prod.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">High-impact dye sublimation printing</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Branding strategy session CTA */}
        <div className="bg-brand-maroon rounded-3xl p-8 md:p-12 text-white relative overflow-hidden text-center shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,114,12,0.15)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight relative z-10">
            Establish a Distinctive Brand Strategy
          </h2>
          <p className="font-sans text-white/80 max-w-xl mx-auto text-xs md:text-sm leading-relaxed relative z-10">
            Let's design a professional, cohesive identity and strategic roadmap that differentiates your company in competitive corporate and public sectors.
          </p>
          <div className="pt-2 relative z-10">
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Book a Branding Strategy Session
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
