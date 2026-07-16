/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Users, BookOpen, ShieldCheck, Heart, Award } from 'lucide-react';
import AbstractShapes from '../components/AbstractShapes';
import { PageId } from '../types';

interface AboutProps {
  setCurrentPage: (page: PageId) => void;
}

export default function About({ setCurrentPage }: AboutProps) {
  const whyChooseUs = [
    {
      id: 'wcu-1',
      icon: <BookOpen className="w-6 h-6 text-brand-maroon" />,
      title: 'Academic Rigor + Field Experience',
      desc: 'We combine scientifically validated survey methodologies with over a decade of real-world local market execution.',
    },
    {
      id: 'wcu-2',
      icon: <Users className="w-6 h-6 text-brand-orange" />,
      title: 'Multidisciplinary Team',
      desc: 'Our analyst core covers statistics, anthropology, marketing strategy, and financial advisory to give multi-dimensional advice.',
    },
    {
      id: 'wcu-3',
      icon: <Target className="w-6 h-6 text-brand-maroon" />,
      title: 'Tailored Local Methodologies',
      desc: 'We do not run canned survey templates. Each questionnaire, focus group script, and workshop is localized to Zulu and regional demographics.',
    },
    {
      id: 'wcu-4',
      icon: <Heart className="w-6 h-6 text-brand-orange" />,
      title: 'Ongoing Consulting Support',
      desc: 'We provide post-project strategy sessions, helping internal teams and SME owners act upon recommendations without friction.',
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-hidden py-16 md:py-24">
      {/* Decorative background vectors */}
      <AbstractShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight">
            Our Story & Core Philosophy
          </h1>
          <p className="font-sans text-base text-gray-500 leading-relaxed">
            A trusted multi-disciplinary business advisory registered under South African Market Research Association guidelines and rated BBBEE Level 1.
          </p>
        </div>

        {/* Corporate Profile Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Story Column */}
          <div className="lg:col-span-7 space-y-6 font-sans text-sm md:text-base text-gray-600 leading-relaxed text-left">
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight mb-4">
              Founded on Local Insight & Academic Rigor
            </h2>
            <p>
              In 2013, our Managing Director established Pride and Joy Consultants in South Africa. The objective was clear: to bridge the gap between abstract corporate marketing and the deep, nuanced cultural and economic realities of the regional South African consumer.
            </p>
            <p>
              Over the last decade, our firm has evolved into a robust, 100% black-owned (Pty) Ltd consulting house. We serve metropolitan municipalities, state utilities like Umgeni Water, heavy manufacturers like Hulamin, and hundreds of local SMEs. As a registered member of the <strong>South African Market Research Association (SAMRA)</strong>, we hold our analysts to the highest national standards of quantitative accuracy and ethical qualitative fieldwork.
            </p>
            <p>
              Whether deploying multi-lingual field agents across KwaZulu-Natal and Gauteng, or conducting structured business management training for emerging startups, we remain focused on creating measurable local economic empowerment.
            </p>
            
            {/* Quick Stats Block inside About */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <span className="font-display font-extrabold text-brand-maroon text-xl md:text-2xl block">100%</span>
                <span className="font-sans text-[10px] text-gray-500 font-bold uppercase tracking-wider">Black Owned</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <span className="font-display font-extrabold text-brand-maroon text-xl md:text-2xl block">SAMRA</span>
                <span className="font-sans text-[10px] text-gray-500 font-bold uppercase tracking-wider">Registered</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <span className="font-display font-extrabold text-brand-maroon text-xl md:text-2xl block">Level 1</span>
                <span className="font-sans text-[10px] text-gray-500 font-bold uppercase tracking-wider">BBBEE Rating</span>
              </div>
            </div>
          </div>

          {/* Mission & Vision Block Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-maroon to-brand-maroon-hover text-white rounded-3xl p-8 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,114,12,0.15)_0%,transparent_50%)]" />
            
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 bg-white/10 rounded-xl mb-2">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl uppercase tracking-wider">Our Core Philosophy</h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-white/90 font-light italic border-l-2 border-brand-orange pl-4">
                "We view research as an active corporate service, not a static product. Our goal is not to deliver printed binders of statistics, but to present actionable, scientifically sound recommendations that drive organizational profitability and economic upliftment."
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10 relative z-10">
              <h4 className="font-display font-bold text-base uppercase tracking-wider">Our Mission Statement</h4>
              <p className="font-sans text-sm leading-relaxed text-white/80">
                To equip public institutions and businesses with the precise qualitative and quantitative intelligence required to navigate complex local markets, while actively training the next generation of South African SME entrepreneurs.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight">
              Why Leaders Choose Pride & Joy
            </h2>
            <p className="font-sans text-sm text-gray-500">
              We maintain a rigorous balance of field-level empathy and statistical standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {whyChooseUs.map((wcu) => (
              <div 
                key={wcu.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex items-start space-x-4 shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-3 bg-gray-50 rounded-xl shrink-0">
                  {wcu.icon}
                </div>
                <div className="space-y-2 text-left">
                  <h3 className="font-display font-bold text-base md:text-lg text-gray-900">
                    {wcu.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {wcu.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Schedule Bookings */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 text-center shadow-lg space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex p-3 bg-brand-maroon/5 text-brand-maroon rounded-full">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
            Consult Directly with Our Senior Advisors
          </h3>
          <p className="font-sans text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Whether you are a municipal manager planning community audits, or an SME founder seeking targeted growth frameworks, let's schedule an initial virtual or in-person workshop.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('book-online')}
              className="px-8 py-3.5 bg-brand-maroon hover:bg-brand-maroon-hover text-white font-sans font-extrabold text-sm rounded-xl transition-all shadow-md"
            >
              Access consultation Scheduler
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
