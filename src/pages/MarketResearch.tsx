/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Compass, CheckCircle, ArrowRight, ClipboardList, Eye, Languages, Users2 } from 'lucide-react';
import { marketResearchServices } from '../data/services';
import AbstractShapes from '../components/AbstractShapes';
import { PageId } from '../types';

interface MarketResearchProps {
  setCurrentPage: (page: PageId) => void;
  setBookingCategory: (category: 'Market Research' | 'Marketing & Branding' | 'Training & Consulting') => void;
}

export default function MarketResearch({ setCurrentPage, setBookingCategory }: MarketResearchProps) {
  const handleBookingClick = () => {
    setBookingCategory('Market Research');
    setCurrentPage('book-online');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Associate helper icons to enhance visual variety
  const getIconForIndex = (index: number) => {
    const size = "w-5 h-5 text-brand-maroon";
    switch (index % 4) {
      case 0: return <ClipboardList className={size} />;
      case 1: return <Compass className={size} />;
      case 2: return <Languages className={size} />;
      default: return <Users2 className={size} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-hidden py-16 md:py-24">
      {/* Background shape vectors */}
      <AbstractShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-left max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-maroon/5 border border-brand-maroon/10 px-3.5 py-1.5 rounded-full">
            <Search className="w-4 h-4 text-brand-maroon" />
            <span className="font-sans font-bold text-xs text-brand-maroon uppercase tracking-wide">
              Primary Service Pillar • SAMRA Accredited Standards
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
            Scientific Fieldwork & Market Research
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            We operate rigorous statistical surveys and qualitative focus group diagnostic methodologies. We support corporate boards and municipalities across South Africa with clean, un-biased data.
          </p>
        </div>

        {/* Quality Standards Panel */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm uppercase text-brand-maroon">1. Unbiased Data Gathering</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our field agents operate under SAMRA ethical guidelines. We utilize randomized sampling to eliminate structural statistical bias in South African urban and rural segments.
            </p>
          </div>
          <div className="space-y-2 border-t md:border-t-0 md:border-x border-gray-100 md:px-8">
            <h3 className="font-display font-bold text-sm uppercase text-brand-orange">2. Multi-Lingual Fluency</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We design and moderate discussions in English, isiZulu, and other regional vernaculars to ensure participants can express feedback without linguistic constraints.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm uppercase text-brand-maroon">3. C-Suite Level Interviewers</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Senior level interviews and specialized supplier audits are conducted directly by seasoned executive analysts with extensive commercial and public sector experience.
            </p>
          </div>
        </div>

        {/* Core Capabilities Structured Grid */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight text-left">
              Structured Diagnostic Capabilities
            </h2>
            <p className="font-sans text-xs text-gray-400 mt-1 text-left">
              Our core methods cover both large-scale statistics and nuanced anthropological observation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {marketResearchServices.map((service, index) => (
              <div 
                key={service.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 hover:border-brand-maroon/20 hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-brand-orange bg-brand-orange/5 px-2.5 py-0.5 rounded-sm">
                      METHOD {index + 1}
                    </span>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {getIconForIndex(index)}
                    </div>
                  </div>

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

        {/* Call to action panel */}
        <div className="bg-brand-maroon rounded-3xl p-8 md:p-12 text-white relative overflow-hidden text-center shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,114,12,0.15)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight relative z-10">
            Let's Scope Your Next Research Project
          </h2>
          <p className="font-sans text-white/80 max-w-xl mx-auto text-xs md:text-sm leading-relaxed relative z-10">
            Provide details of your target demographic and business objectives, and our team will outline a customized, scientifically sound data sampling strategy.
          </p>
          <div className="pt-2 relative z-10">
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Book a Research Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
