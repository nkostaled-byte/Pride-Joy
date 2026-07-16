/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, CheckCircle, FileText, Calendar, ArrowRight } from 'lucide-react';
import AbstractShapes from '../components/AbstractShapes';
import { PageId } from '../types';

interface ContactProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Contact({ setCurrentPage }: ContactProps) {
  // Contact Form State
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cMessage, setCMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');

    if (!cName.trim() || !cEmail.trim() || !cMessage.trim()) {
      setError('Please fill in all required fields before submitting.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL || '';

    const payload = {
      clientId: "pride-and-joy",
      formName: "contact",
      action: "submit",

      customer: {
        name: cName,
        email: cEmail,
        phone: ""
      },

      fields: {
        Message: cMessage,
        SubmittedAt: new Date().toISOString()
      }
    };

    try {
      if (WORKER_URL) {
        const response = await fetch(WORKER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to submit contact enquiry.');
        }
      } else {
        // Fallback for local development or unset environment variables
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Success State
      setIsSuccess(true);
      setCName('');
      setCEmail('');
      setCMessage('');
    } catch (err: any) {
      console.error("Contact Form submission error:", err);
      setError(err?.message || "There was an error sending your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-hidden py-16 md:py-24">
      {/* Background shape vectors */}
      <AbstractShapes />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-left max-w-4xl space-y-4">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
            Connect with Our Advisors
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
            Have a specific municipal survey tender to submit or a corporate skills assessment to plan? Reach out directly, or book an appointment on our live calendar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-sans">
          
          {/* Corporate Details Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-display font-extrabold text-xl text-gray-900 tracking-tight">
                Corporate Credentials
              </h3>
              
              <div className="space-y-4 text-xs md:text-sm text-gray-600">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                  <p className="font-bold text-gray-900">Pride and Joy Consultants (Pty) Ltd</p>
                  <p>Registration No: <span className="font-mono font-semibold text-gray-800">2013/024409/07</span></p>
                  <p>BBBEE Status: <span className="font-semibold text-brand-maroon">Level 1 Contributor (100% Black-Owned)</span></p>
                  <p>Accreditation: <span className="font-semibold text-gray-800">SAMRA Registered Member</span></p>
                </div>

                <ul className="space-y-4 pt-2">
                  <li className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block text-xs font-bold uppercase">Telephone Support</span>
                      <span className="text-gray-900 font-bold text-base">073 508 5200</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block text-xs font-bold uppercase">Email Enquiries</span>
                      <a href="mailto:info@prideandjoyonline.co.za" className="text-brand-maroon font-bold hover:underline break-all">
                        info@prideandjoyonline.co.za
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block text-xs font-bold uppercase">Operating Hours</span>
                      <span className="text-gray-900 font-semibold">Mon–Fri, 8:30–16:30 SAST</span>
                      <p className="text-[10px] text-gray-400">Closed on South African public holidays</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Book Online repeated prominent CTA */}
            <div className="bg-brand-maroon text-white p-8 rounded-3xl space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(232,114,12,0.15)_0%,transparent_50%)]" />
              <h3 className="font-display font-bold text-lg relative z-10">Prefer Live Scheduling?</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Skip the contact form queues and lock in a specific, confirmed date and time slot instantly on our online schedule.
              </p>
              <div className="pt-2 relative z-10">
                <button
                  onClick={() => {
                    setCurrentPage('book-online');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center w-full px-5 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Access Booking Scheduler
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-10 space-y-6">
            <h3 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight text-left">
              Send a Secure Message
            </h3>
            
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-6 rounded-2xl text-left space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <h4 className="font-display font-bold text-base text-gray-900">Message Transmitted!</h4>
                </div>
                <p className="text-xs md:text-sm leading-relaxed">
                  Thank you for reaching out. We have logged your general enquiry, and a senior consultant will be in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-bold text-brand-maroon hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {error && (
                  <p className="text-red-500 font-semibold text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                    {error}
                  </p>
                )}

                <div className="space-y-2">
                  <label className="block font-sans font-bold text-sm text-gray-800">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sbusiso"
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-sans font-bold text-sm text-gray-800">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. client@company.co.za"
                    value={cEmail}
                    onChange={(e) => setCEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-sans font-bold text-sm text-gray-800">
                    Message Detail *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Briefly outline your consulting timeline, required surveys, or training budget queries..."
                    value={cMessage}
                    onChange={(e) => setCMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-maroon hover:bg-brand-maroon-hover text-white font-sans font-extrabold text-base rounded-xl transition-all shadow-md flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Transmitting Enquiry...
                    </>
                  ) : (
                    'Send Corporate Enquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="space-y-4">
          <div className="text-left">
            <h2 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">Our Corporate Headquarters</h2>
            <p className="font-sans text-xs text-gray-400 mt-1">Conveniently located for public transit and corporate briefings.</p>
          </div>

          <div className="w-full h-80 rounded-3xl overflow-hidden border border-gray-200 bg-gray-100 relative shadow-inner">
            {/* Styled vector map graphics */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
              
              {/* Overlapping grid lines representing streets */}
              <div className="absolute inset-0 opacity-25">
                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-400" />
                <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-400" />
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-500" />
                <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-gray-400" />
                <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-gray-400" />
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-500" />
              </div>

              {/* Blue water representation at the right side */}
              <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-blue-100/60 flex items-center justify-center border-l border-dashed border-blue-200">
                <span className="font-display text-[10px] uppercase tracking-wider font-bold text-blue-400 rotate-90 whitespace-nowrap">
                  Waterfront Area
                </span>
              </div>

              {/* Local Port */}
              <div className="absolute right-[15%] bottom-0 w-24 h-24 rounded-t-full bg-blue-100/40 border border-blue-200" />

              {/* Map pin */}
              <div className="relative z-10 flex flex-col items-center animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="p-3 bg-brand-maroon text-white rounded-full shadow-lg border-2 border-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="mt-2 bg-gray-900/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg shadow-md border border-gray-800 text-xs text-center font-sans max-w-xs">
                  <p className="font-bold">Pride & Joy Consultants</p>
                  <p className="text-[10px] text-gray-400">Metro Core, South Africa</p>
                </div>
              </div>
            </div>
            
            {/* Small map controls */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-md shadow-xs border border-gray-100 text-[10px] font-mono text-gray-400">
              GPS: -29.8587° S, 31.0218° E
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
