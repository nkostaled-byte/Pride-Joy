/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, Sparkles, ShieldCheck, Mail, Phone } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import AbstractShapes from '../components/AbstractShapes';
import { Booking } from '../types';

interface BookOnlineProps {
  bookingCategory: 'Market Research' | 'Marketing & Branding' | 'Training & Consulting';
  onBookingSuccess?: (booking: Booking) => void;
}

export default function BookOnline({ bookingCategory, onBookingSuccess }: BookOnlineProps) {
  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-hidden py-16 md:py-24">
      {/* Background shape vectors */}
      <AbstractShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight">
            Schedule a Strategy consultation
          </h1>
          <p className="font-sans text-base text-gray-500 leading-relaxed">
            Pick a date and time to brief our senior business advisors. We will align our methodologies to your exact project scope.
          </p>
        </div>

        {/* Active Booking Form */}
        <div>
          <BookingForm 
            initialCategory={bookingCategory}
            onBookingSuccess={onBookingSuccess}
          />
        </div>

        {/* Contact info support details block */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs md:text-sm text-gray-500 text-left pt-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start space-x-3">
            <Mail className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-bold text-gray-900 text-sm">Need manual assistance?</h4>
              <p className="leading-relaxed text-xs mt-1">
                If you have trouble scheduling online, dispatch your brief to <a href="mailto:info@prideandjoyonline.co.za" className="text-brand-maroon font-semibold underline">info@prideandjoyonline.co.za</a>. Our administrative desk will response within 4 hours.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start space-x-3">
            <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-bold text-gray-900 text-sm">Urgent Project Scoping?</h4>
              <p className="leading-relaxed text-xs mt-1">
                For rapid municipal tender submissions or tight commercial research deadlines, contact us directly on <span className="font-semibold text-gray-800">073 508 5200</span> during standard business hours.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
