/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClipboardList, Users, Shield, MapPin, Award } from 'lucide-react';

export default function Stats() {
  const statsList = [
    {
      id: 'stat-1',
      icon: <ClipboardList className="w-8 h-8 text-brand-orange" />,
      value: '100+',
      label: 'Surveys Conducted',
      desc: 'Scientific quantitative metrics',
    },
    {
      id: 'stat-2',
      icon: <Users className="w-8 h-8 text-brand-maroon" />,
      value: '150+',
      label: 'Focus Groups Facilitated',
      desc: 'Deep qualitative insights',
    },
    {
      id: 'stat-3',
      icon: <MapPin className="w-8 h-8 text-brand-orange" />,
      value: '3+',
      label: 'Metropolitan Hubs',
      desc: 'Durban, Gauteng & Cape Town',
    },
    {
      id: 'stat-4',
      icon: <Award className="w-8 h-8 text-brand-maroon" />,
      value: 'Level 1',
      label: 'BBBEE Rating',
      desc: '100% black-owned (Pty) Ltd',
    },
  ];

  return (
    <section className="relative z-10 py-12 bg-white border-y border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsList.map((stat) => (
            <div 
              key={stat.id}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-300"
            >
              <div className="p-3 bg-gray-50 rounded-xl mb-4">
                {stat.icon}
              </div>
              <span className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight">
                {stat.value}
              </span>
              <span className="font-sans font-bold text-sm text-gray-800 mt-1">
                {stat.label}
              </span>
              <span className="font-sans text-xs text-gray-500 mt-1">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
