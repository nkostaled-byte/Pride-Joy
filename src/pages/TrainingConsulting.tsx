/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Globe, 
  TrendingUp, 
  Lightbulb, 
  Users, 
  UserCheck, 
  Heart, 
  Briefcase, 
  Layers, 
  Smile, 
  Search, 
  Compass, 
  Zap,
  CheckCircle 
} from 'lucide-react';
import { trainingAreas } from '../data/services';
import AbstractShapes from '../components/AbstractShapes';
import { PageId } from '../types';

interface TrainingConsultingProps {
  setCurrentPage: (page: PageId) => void;
  setBookingCategory: (category: 'Market Research' | 'Marketing & Branding' | 'Training & Consulting') => void;
}

export default function TrainingConsulting({ setCurrentPage, setBookingCategory }: TrainingConsultingProps) {
  const handleBookingClick = () => {
    setBookingCategory('Training & Consulting');
    setCurrentPage('book-online');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamically resolve icon based on metadata string
  const renderIcon = (iconName: string) => {
    const size = "w-6 h-6 text-brand-maroon";
    switch (iconName) {
      case 'Globe': return <Globe className={size} />;
      case 'TrendingUp': return <TrendingUp className={size} />;
      case 'Lightbulb': return <Lightbulb className={size} />;
      case 'Users': return <Users className={size} />;
      case 'UserCheck': return <UserCheck className={size} />;
      case 'Heart': return <Heart className={size} />;
      case 'Briefcase': return <Briefcase className={size} />;
      case 'Layers': return <Layers className={size} />;
      case 'Smile': return <Smile className={size} />;
      case 'Search': return <Search className={size} />;
      case 'Compass': return <Compass className={size} />;
      case 'Zap': return <Zap className={size} />;
      default: return <GraduationCap className={size} />;
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
            <GraduationCap className="w-4 h-4 text-brand-maroon" />
            <span className="font-sans font-bold text-xs text-brand-maroon uppercase tracking-wide">
              Capacity-Building Pillar • L&D Enterprise Excellence
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
            Business Training & SME Consulting
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            Empowering South African enterprises with modern management frameworks. We conduct interactive corporate development workshops and structural skills audits for startups, corporate entities, and public agencies.
          </p>
        </div>

        {/* Corporate vs SME suitability callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {/* SME/Startup Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-4">
            <div className="inline-flex items-center space-x-2 text-brand-orange">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <h3 className="font-display font-bold text-base text-gray-900">Tailored for Startups & SMEs</h3>
            </div>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              We design simple, high-impact consulting schedules tailored for micro-enterprises and small business owners. We address legal compliance, cash flow mechanics, digital marketing activation, and practical growth planning.
            </p>
          </div>

          {/* Corporate Team Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-4">
            <div className="inline-flex items-center space-x-2 text-brand-maroon">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <h3 className="font-display font-bold text-base text-gray-900">Corporate & Public Team Alignments</h3>
            </div>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              We build customized corporate workshops focusing on team interpersonal communication, strategic execution structures, client customer service excellence, and creative problem solving.
            </p>
          </div>
        </div>

        {/* 12 Training Areas Grid */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight text-left">
              Our 12 Specialized Training Programs
            </h2>
            <p className="font-sans text-xs text-gray-400 mt-1 text-left">
              High-impact educational pathways curated by senior business consultants and field experts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {trainingAreas.map((area) => (
              <div 
                key={area.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 hover:border-brand-maroon/20 hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-xs text-brand-orange bg-brand-orange/5 px-2.5 py-0.5 rounded-sm">
                      {area.id.toUpperCase()}
                    </span>
                    <div className="p-2 bg-gray-50 rounded-xl">
                      {renderIcon(area.iconName)}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base md:text-lg text-gray-900">
                    {area.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {area.description}
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
            Upskill Your Workforce & SME Network
          </h2>
          <p className="font-sans text-white/80 max-w-xl mx-auto text-xs md:text-sm leading-relaxed relative z-10">
            Let's structure a custom workshop series or capacity development initiative designed specifically around your institutional goals or local community development needs.
          </p>
          <div className="pt-2 relative z-10">
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Book a Training Session / Workshop
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
