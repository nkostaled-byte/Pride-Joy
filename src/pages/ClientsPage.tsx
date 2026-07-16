/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, 
  Award, 
  Shield, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  ChevronRight,
  Droplet, 
  Wrench, 
  Factory, 
  Compass, 
  Building2, 
  HeartHandshake, 
  Film, 
  Globe as GlobeIcon, 
  ShieldCheck, 
  Briefcase
} from 'lucide-react';
import { clientCompanies } from '../data/services';
import AbstractShapes from '../components/AbstractShapes';
import { PageId } from '../types';

interface ClientsPageProps {
  setCurrentPage: (page: PageId) => void;
}

// Custom client logo helper
const getClientLogo = (name: string) => {
  switch (name) {
    case 'Umgeni Water':
      return {
        bg: 'bg-blue-50/80 border-blue-200 text-blue-600',
        icon: <Droplet className="w-5 h-5 text-blue-600" />,
        initials: 'UW'
      };
    case 'Protea Engineering':
      return {
        bg: 'bg-slate-100 border-slate-300 text-slate-700',
        icon: <Wrench className="w-5 h-5 text-slate-700" />,
        initials: 'PE'
      };
    case 'Hulamin':
      return {
        bg: 'bg-red-50/80 border-red-200 text-red-600',
        icon: <Factory className="w-5 h-5 text-red-600" />,
        initials: 'HL'
      };
    case 'Regional Tourism Board':
    case 'Regional Tourism':
      return {
        bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-600',
        icon: <Compass className="w-5 h-5 text-emerald-600" />,
        initials: 'RT'
      };
    case 'Metropolitan Municipality':
      return {
        bg: 'bg-purple-50 border-purple-200 text-purple-600',
        icon: <Building2 className="w-5 h-5 text-purple-600" />,
        initials: 'MM'
      };
    case 'Sizakala Centres':
      return {
        bg: 'bg-indigo-50 border-indigo-200 text-indigo-600',
        icon: <HeartHandshake className="w-5 h-5 text-indigo-600" />,
        initials: 'SZ'
      };
    case 'SEDA':
      return {
        bg: 'bg-amber-50 border-amber-200 text-amber-600',
        icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
        initials: 'SD'
      };
    case 'Metro Film Commission':
      return {
        bg: 'bg-zinc-900 border-zinc-800 text-white',
        icon: <Film className="w-5 h-5 text-zinc-100" />,
        initials: 'MF'
      };
    case 'Atlas Finance':
      return {
        bg: 'bg-sky-50 border-sky-200 text-sky-700',
        icon: <GlobeIcon className="w-5 h-5 text-sky-700" />,
        initials: 'AF'
      };
    case 'Assupol':
      return {
        bg: 'bg-green-50 border-green-200 text-green-700',
        icon: <ShieldCheck className="w-5 h-5 text-green-700" />,
        initials: 'AP'
      };
    default:
      return {
        bg: 'bg-gray-50 border-gray-200 text-gray-600',
        icon: <Briefcase className="w-5 h-5 text-gray-600" />,
        initials: 'PJ'
      };
  }
};

export default function ClientsPage({ setCurrentPage }: ClientsPageProps) {
  const sectors = [
    { name: 'Public Sector', desc: 'Municipalities and utility bodies requiring social community assessments.' },
    { name: 'Manufacturing', desc: 'Large scale regional metal and engineering companies.' },
    { name: 'Finance', desc: 'National insurance and micro-finance brands evaluating consumer preferences.' },
    { name: 'Tourism', desc: 'Official travel councils assessing tourist behaviors and local event impacts.' },
    { name: 'SME Development', desc: 'Agencies funding startup training workshops and structural business coaching.' }
  ];

  // Professional corporate timeline data
  const milestones = [
    { year: '2013', title: 'Founding Year', desc: 'Pride and Joy Consultants registered in South Africa to provide professional advisory services.' },
    { year: '2016', title: 'SAMRA Accreditation', desc: 'Officially registered as a member house under South African Market Research Association guidelines.' },
    { year: '2019', title: 'Public Sector Expansion', desc: 'Selected to run multi-lingual community satisfaction surveys for major metropolitan municipalities.' },
    { year: '2023', title: 'Decade Milestone', desc: 'Celebrated 10 years of business advisory, establishing a firm BBBEE Level 1 rating.' },
    { year: '2026', title: 'Strategic Re-Positioning', desc: 'Focusing core offerings entirely around Market Research, L&D Business Training, and Marketing.' }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-hidden py-16 md:py-24">
      {/* Background shape vectors */}
      <AbstractShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-left max-w-4xl space-y-4">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
            Our Clients & Corporate Track Record
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            Over the past decade, we have partnered with South Africa's leading state corporations, manufacturers, and municipal hubs. Our custom research models provide objective, actionable frameworks.
          </p>
        </div>

        {/* Growth Stats Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          
          {/* Stat 1 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="font-display font-bold text-sm uppercase text-gray-400">Satisfaction</span>
              <span className="font-display font-extrabold text-2xl text-brand-maroon">86%</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Client satisfaction rating verified across post-project feedback surveys from municipal managers and corporate executives.
            </p>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-maroon rounded-full" style={{ width: '86%' }} />
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="font-display font-bold text-sm uppercase text-gray-400">Compliance</span>
              <span className="font-display font-extrabold text-2xl text-brand-orange">100%</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              BBBEE Level 1 status and SAMRA guidelines compliance across all quantitative and qualitative fieldwork operations.
            </p>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-orange rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="font-display font-bold text-sm uppercase text-gray-400">On-Time Delivery</span>
              <span className="font-display font-extrabold text-2xl text-brand-maroon">94%</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Field surveys, data modeling calculations, and corporate workshops delivered precisely within standard contracted schedules.
            </p>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-maroon rounded-full" style={{ width: '94%' }} />
            </div>
          </div>

        </div>

        {/* Dynamic Sector Highlights */}
        <div className="space-y-6">
          <div className="text-left">
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">Sectors We Actively Serve</h2>
            <p className="font-sans text-xs text-gray-400 mt-1">Cross-industry knowledge tailored to specific market realities.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-sans">
            {sectors.map((sec, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs text-left space-y-3 hover:border-brand-maroon/20 hover:shadow-md transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                <h3 className="font-display font-bold text-sm text-gray-900">{sec.name}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Organizations Details List */}
        <div className="space-y-6">
          <div className="text-left">
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">Key Corporate Partnerships</h2>
            <p className="font-sans text-xs text-gray-400 mt-1">Short summaries of organizations who have utilized our advisory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {clientCompanies.map((comp) => {
              const logo = getClientLogo(comp.name);
              return (
                <div 
                  key={comp.name}
                  className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex items-start space-x-4 shadow-xs text-left hover:border-brand-maroon/20 hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center shrink-0 select-none shadow-xs transition-transform group-hover:scale-105 duration-200 ${logo.bg}`}>
                    {logo.icon}
                    <span className="font-mono text-[9px] font-bold mt-1 leading-none opacity-80 uppercase">
                      {logo.initials}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold text-base text-gray-900 group-hover:text-brand-maroon transition-colors duration-200">{comp.name}</h3>
                      <span className="font-mono text-[9px] uppercase tracking-wider bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-0.5 rounded-sm">
                        {comp.sector}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                      {comp.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Timeline Milestones */}
        <div className="space-y-8 pt-6">
          <div className="text-left">
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">Years of Operation Timeline</h2>
            <p className="font-sans text-xs text-gray-400 mt-1">Our evolution and key operational achievements desde 2013.</p>
          </div>

          <div className="relative border-l-2 border-dashed border-gray-200 pl-6 ml-4 space-y-8 text-left font-sans">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative space-y-2">
                {/* Bullet */}
                <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-brand-maroon border-4 border-white shadow-xs" />
                
                <div className="flex items-center space-x-3">
                  <span className="font-display font-extrabold text-lg text-brand-orange">{m.year}</span>
                  <span className="font-display font-bold text-sm text-gray-900 uppercase tracking-wider">— {m.title}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-3xl">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client CTA Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 text-center shadow-lg space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex p-3 bg-brand-orange/5 text-brand-orange rounded-full">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
            Schedule a Custom Institutional Session
          </h3>
          <p className="font-sans text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Our multidisciplinary team is prepared to align research or corporate capacity-building structures to your specific industry goals. Let's schedule an initial call.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentPage('book-online');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-brand-maroon hover:bg-brand-maroon-hover text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Consult with Our Analysts
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
