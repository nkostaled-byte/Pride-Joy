/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, Clock, MapPin, ShieldCheck, Globe, Facebook, Linkedin, Twitter, Lock } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  onOpenOwnerLogin?: () => void;
}

export default function Footer({ setCurrentPage, onOpenOwnerLogin }: FooterProps) {
  const handleLinkClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 text-gray-300 border-t border-gray-900 z-10 overflow-hidden">
      {/* Decorative colored grid border */}
      <div className="h-1.5 w-full flex">
        <div className="bg-brand-maroon flex-1" />
        <div className="bg-brand-orange flex-1" />
        <div className="bg-brand-maroon flex-1" />
        <div className="bg-brand-orange flex-1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Profile Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-maroon text-white font-display font-bold text-lg shadow-sm">
                PJ
              </div>
              <div>
                <span className="font-display font-bold text-base tracking-tight text-white block">
                  PRIDE & JOY
                </span>
                <span className="font-sans text-[9px] tracking-widest font-bold uppercase text-brand-orange">
                  Consultants
                </span>
              </div>
            </div>
            
            <p className="font-sans text-sm leading-relaxed text-gray-400">
              A 100% black-owned, Durban-based business consulting firm providing actionable, scientifically sound recommendations since 2013.
            </p>

            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-gray-900 hover:bg-brand-maroon hover:text-white rounded-lg transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-900 hover:bg-brand-maroon hover:text-white rounded-lg transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-900 hover:bg-brand-maroon hover:text-white rounded-lg transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div>
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">
              Our Services & Pages
            </h3>
            <ul className="space-y-3.5 font-sans text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-brand-orange transition-colors duration-200">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-brand-orange transition-colors duration-200">
                  About Our Firm
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('market-research')} className="hover:text-brand-orange transition-colors duration-200">
                  Market Research Capabilities
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('marketing-branding')} className="hover:text-brand-orange transition-colors duration-200">
                  Strategic Marketing & Branding
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('training-consulting')} className="hover:text-brand-orange transition-colors duration-200">
                  SME Business Training
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('clients')} className="hover:text-brand-orange transition-colors duration-200">
                  Our Track Record & Clients
                </button>
              </li>
            </ul>
          </div>

          {/* Core Credentials Column */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Credentials & Accreditations
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 bg-gray-900/50 p-3 rounded-xl border border-gray-900">
                <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-white uppercase">BBBEE Level 1</h4>
                  <p className="font-sans text-xs text-gray-400">100% Black-Owned, promoting active economic empowerment.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 bg-gray-900/50 p-3 rounded-xl border border-gray-900">
                <ShieldCheck className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-white uppercase">SAMRA Member</h4>
                  <p className="font-sans text-xs text-gray-400">Registered member of the South African Market Research Association.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Get In Touch
            </h3>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <span className="text-gray-300">073 508 5200</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <a href="mailto:info@prideandjoyonline.co.za" className="text-gray-300 hover:text-brand-orange transition-colors duration-200 break-all">
                  info@prideandjoyonline.co.za
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Globe className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <a href="https://www.prideandjoyonline.co.za" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-orange transition-colors duration-200">
                  www.prideandjoyonline.co.za
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300">Mon–Fri: 8:30–16:30</p>
                  <p className="text-xs text-gray-500">South African Standard Time (SAST)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Registration & Copyright Bottom Row */}
        <div className="border-t border-gray-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-500 font-sans">
          <div className="flex flex-col space-y-1 text-center md:text-left">
            <p>Pride and Joy Consultants (Pty) Ltd — Reg No: 2013/024409/07</p>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <p>Nkosingiphile Mchunu (Founder & Managing Director)</p>
              <span>•</span>
              <button 
                onClick={onOpenOwnerLogin} 
                className="inline-flex items-center text-brand-orange hover:text-brand-orange/80 transition-colors font-semibold"
                id="footer-owner-portal-btn"
              >
                <Lock className="w-3 h-3 mr-1" />
                Owner Portal
              </button>
            </div>
          </div>
          <div className="text-right">
            <p>&copy; {currentYear} Pride and Joy Consultants. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
