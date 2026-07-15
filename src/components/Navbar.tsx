/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Calendar, Settings } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onOpenAdmin: () => void;
  isOwner?: boolean;
}

export default function Navbar({ currentPage, setCurrentPage, onOpenAdmin, isOwner }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'market-research', label: 'Market Research' },
    { id: 'marketing-branding', label: 'Marketing & Branding' },
    { id: 'training-consulting', label: 'Training & Consulting' },
    { id: 'clients', label: 'Our Clients' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Section */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-brand-maroon text-white font-display font-bold text-xl shadow-md transition-transform duration-300 group-hover:scale-105">
              PJ
              {/* Overlapping Orange Ring */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-orange border-2 border-white flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                ✓
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg leading-tight tracking-tight text-gray-900 flex items-center">
                PRIDE & JOY
              </span>
              <span className="font-sans text-[10px] tracking-widest font-semibold uppercase text-brand-orange leading-none">
                Market Research & Consulting
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-md font-sans text-sm font-medium transition-all duration-200 ${
                  currentPage === link.id
                    ? 'text-brand-maroon bg-gray-50 border-b-2 border-brand-maroon rounded-b-none'
                    : 'text-gray-600 hover:text-brand-maroon hover:bg-gray-50/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {isOwner && (
              <button
                onClick={onOpenAdmin}
                title="Admin Panel"
                className="p-2 text-gray-400 hover:text-brand-maroon hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => handleNavClick('book-online')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-orange text-white font-sans font-semibold text-sm shadow-md transition-all duration-200 hover:bg-brand-orange-hover hover:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-brand-orange/50 active:scale-98"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger & Action Icon */}
          <div className="flex items-center space-x-2 lg:hidden">
            {isOwner && (
              <button
                onClick={onOpenAdmin}
                className="p-2 text-gray-500 hover:text-brand-maroon rounded-lg"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-gray-600 hover:text-brand-maroon hover:bg-gray-100 focus:outline-hidden transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-lg animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-sans text-base font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'text-brand-maroon bg-brand-maroon/5 border-l-4 border-brand-maroon'
                    : 'text-gray-700 hover:text-brand-maroon hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-100 mt-2">
              <button
                onClick={() => handleNavClick('book-online')}
                className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl bg-brand-orange text-white font-sans font-bold text-center shadow-md hover:bg-brand-orange-hover"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
