/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Phone, Mail, Building, User, FileText, CheckCircle2, ChevronRight, AlertCircle, Loader2, Sparkles, Send } from 'lucide-react';
import { Booking } from '../types';

interface BookingFormProps {
  initialCategory?: 'Market Research' | 'Marketing & Branding' | 'Training & Consulting';
  onBookingSuccess?: (booking: Booking) => void;
}

export default function BookingForm({ initialCategory, onBookingSuccess }: BookingFormProps) {
  // Booking Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState<'Market Research' | 'Marketing & Branding' | 'Training & Consulting'>(
    initialCategory || 'Market Research'
  );
  const [consultationType, setConsultationType] = useState<'Online' | 'In-Person'>('Online');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  // UI States
  const [step, setStep] = useState<'form' | 'success' | 'thank-you'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [lastBookingId, setLastBookingId] = useState('');

  // Sync initialCategory prop if it changes
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  // Available times every 30 minutes (08:30 to 16:00, with 12:30 break as in traditional hours)
  const timeSlots = [
    '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
  ];

  // Helper to get today's date formatted as YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Inline Validation
  const validateField = (fieldName: string, value: string) => {
    const nextErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          nextErrors.name = 'Contact name is required';
        } else {
          delete nextErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          nextErrors.email = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          nextErrors.email = 'Please enter a valid email address';
        } else {
          delete nextErrors.email;
        }
        break;
      case 'phone':
        if (!value.trim()) {
          nextErrors.phone = 'Phone number is required';
        } else if (value.replace(/\D/g, '').length < 9) {
          nextErrors.phone = 'Please enter a valid phone number (min 9 digits)';
        } else {
          delete nextErrors.phone;
        }
        break;
      case 'date':
        if (!value) {
          nextErrors.date = 'Please select a preferred date';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate < today) {
            nextErrors.date = 'Consultation dates cannot be in the past';
          } else {
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
              nextErrors.date = 'We operate Mon–Fri only. Please choose a weekday';
            } else {
              delete nextErrors.date;
            }
          }
        }
        break;
      case 'time':
        if (!value) {
          nextErrors.time = 'Please select a preferred time slot';
        } else {
          delete nextErrors.time;
        }
        break;
      default:
        break;
    }

    setErrors(nextErrors);
  };

  const validateAll = () => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = 'Contact name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nextErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    } else if (phone.replace(/\D/g, '').length < 9) {
      nextErrors.phone = 'Please enter a valid phone number (min 9 digits)';
    }

    if (!date) {
      nextErrors.date = 'Please select a preferred date';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        nextErrors.date = 'Consultation dates cannot be in the past';
      } else {
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          nextErrors.date = 'We operate Mon–Fri only. Please choose a weekday';
        }
      }
    }

    if (!time) {
      nextErrors.time = 'Please select a preferred time slot';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setErrorMsg('');

    if (!validateAll()) {
      // Scroll to the first error element
      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0) {
        const firstErrorEl = document.getElementById(`field-${errorKeys[0]}`);
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setIsLoading(true);

    // Formulate JSON Payload exactly as requested
    const WORKER_URL = (import.meta as any).env.VITE_CLOUDFLARE_WORKER_URL || "https://mygrafix-email-api.mygrafix.workers.dev";
    
    const payload = {
      clientId: "pride-and-joy",
      formName: "booking",
      website: window.location.origin || "https://prideandjoyonline.co.za",
      customer: {
        name: name,
        email: email
      },
      fields: {
        phone: phone,
        businessName: company || "Not Provided",
        service: category,
        consultationType: consultationType,
        preferredDate: date,
        preferredTime: time,
        message: description || "No message provided."
      }
    };

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Save booking reference returned by Cloudflare Worker, or fallback to random
        const submissionId = result.submissionId || ('PJ-' + Math.floor(100000 + Math.random() * 900000));
        setLastBookingId(submissionId);

        // Store standard local Booking interface in LocalStorage for client trackability
        const newBooking: Booking = {
          id: submissionId,
          name,
          company: company || "Private Client",
          email,
          phone,
          category,
          consultationType: consultationType === 'In-Person' ? 'in-person' : 'virtual',
          date,
          time,
          description: description || "No message provided.",
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        const existingBookingsStr = localStorage.getItem('pj_bookings');
        const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
        existingBookings.push(newBooking);
        localStorage.setItem('pj_bookings', JSON.stringify(existingBookings));

        if (onBookingSuccess) {
          onBookingSuccess(newBooking);
        }

        // Show premium success immediately
        setStep('success');

        // Clear Form fields
        setName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setTime('');
        setDate('');
        setDescription('');

        // Redirect to detailed Thank You section after 2 seconds
        setTimeout(() => {
          setStep('thank-you');
        }, 2000);

      } else {
        // Handle API/Worker error response
        if (response.status === 429) {
          setErrorMsg("Rate Limit Exceeded: Too many booking attempts from this connection. Please wait a minute and try again.");
        } else {
          setErrorMsg(result.error || "The server rejected the booking. Please check your fields and try again.");
        }
      }
    } catch (err) {
      // Handle Network or Fetch error
      setErrorMsg("Network Error: Could not reach the booking server. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Containers and components fade transitions settings
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        staggerChildren: 0.08 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // 1. Success transition overlay (Step 2)
  if (step === 'success') {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden max-w-2xl mx-auto text-center p-12 space-y-6">
        <div className="flex justify-center">
          <motion.div 
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-inner"
          >
            <motion.svg 
              className="w-12 h-12 stroke-current" 
              viewBox="0 0 24 24" 
              fill="none" 
              strokeWidth="3"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                d="M20 6L9 17l-5-5" 
              />
            </motion.svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight">
            Consultation Transmitted!
          </h3>
          <p className="font-sans text-gray-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Thank you! Your consultation has been booked successfully. A confirmation email has been sent to you.
          </p>
        </motion.div>

        {/* Loading/Redirecting indicator */}
        <div className="pt-6 max-w-xs mx-auto">
          <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
            <span>GENERATING ADVISORY PASS</span>
            <span>REDIRECTING...</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-emerald-500 rounded-full" 
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. Thank You section after 2 seconds redirect (Step 3)
  if (step === 'thank-you') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden max-w-2xl mx-auto"
      >
        <div className="bg-gradient-to-r from-brand-maroon to-brand-orange px-6 py-10 text-center text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs mb-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-display font-extrabold text-2xl md:text-3xl leading-tight">
            Consultation Confirmed!
          </h3>
          <p className="font-sans text-white/80 text-sm mt-2 max-w-md mx-auto">
            Your booking request has been locked in under Pride & Joy's verified scheduling engine.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="border-b border-dashed border-gray-200 pb-6">
            <div className="grid grid-cols-2 gap-4 font-sans text-sm">
              <div>
                <span className="text-gray-400 block text-xs uppercase tracking-wider font-semibold">Booking Reference</span>
                <span className="text-brand-maroon font-mono font-bold text-lg">{lastBookingId || 'PJ-PENDING'}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block text-xs uppercase tracking-wider font-semibold">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Transmitted to Resend
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
            <div className="text-xs text-brand-maroon space-y-1 font-sans">
              <p className="font-bold">Important Instructions:</p>
              <p className="leading-relaxed">
                Nkosingiphile Mchunu or a senior research consultant is evaluating your business profile. You should receive a verified calendar invite (Teams/Zoom) within 12 business hours. If you need immediate assistance, please telephone <strong>073 508 5200</strong>.
              </p>
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={() => setStep('form')}
              className="flex-1 py-3 px-4 border border-gray-200 rounded-xl font-sans font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Book Another Session
            </button>
            <a
              href="mailto:info@prideandjoyonline.co.za?subject=Pride %26 Joy Consultation Follow-up"
              className="flex-1 py-3 px-4 bg-brand-maroon text-white font-sans font-bold text-center text-sm rounded-xl hover:bg-brand-maroon-hover transition-colors shadow-md"
            >
              Email Support
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form 
      id="booking-form-element"
      onSubmit={handleSubmit} 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-10 space-y-8 max-w-3xl mx-auto relative z-10"
    >
      <div className="space-y-2 text-left">
        <h3 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-brand-maroon" />
          Request an Advisor Consultation
        </h3>
        <p className="font-sans text-sm text-gray-500 leading-relaxed">
          Select your business focus area, preferred format, and schedule a slot with Nkosingiphile and our Durban-based analyst team.
        </p>
      </div>

      {errorMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start space-x-3 text-left"
        >
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-red-800 space-y-1 font-sans">
            <p className="font-bold">Transmission Issue</p>
            <p>{errorMsg}</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Service Required (Category) Selection */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block font-sans font-bold text-sm text-gray-800">
            Core Business Pillar *
          </label>
          <select
            id="field-category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as any);
              validateField('category', e.target.value);
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-sans text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30 focus:border-brand-maroon transition-colors"
          >
            <option value="Market Research">Market Research & Fieldwork</option>
            <option value="Marketing & Branding">Strategic Marketing & Brand Identity</option>
            <option value="Training & Consulting">SME Capacity Training & Workshops</option>
          </select>
        </motion.div>

        {/* Consultation Type Selection */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block font-sans font-bold text-sm text-gray-800">
            Consultation Type *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'Online', label: 'Online Meeting' },
              { id: 'In-Person', label: 'In-Person (Durban HQ)' },
            ].map((type) => (
              <button
                type="button"
                key={type.id}
                onClick={() => {
                  setConsultationType(type.id as any);
                }}
                className={`py-3 px-1 text-center rounded-xl font-sans font-bold text-xs border transition-all cursor-pointer ${
                  consultationType === type.id
                    ? 'bg-brand-maroon text-white border-brand-maroon shadow-xs'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contact Name */}
        <motion.div variants={itemVariants} className="space-y-2" id="field-name">
          <label className="block font-sans font-bold text-sm text-gray-800 flex items-center">
            <User className="w-4 h-4 mr-1.5 text-gray-400" />
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Sbusiso Mthembu"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField('name', e.target.value);
            }}
            className={`w-full px-4 py-3 rounded-xl border font-sans text-sm bg-gray-50 text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30 ${
              errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-200'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs font-semibold">{errors.name}</p>}
        </motion.div>

        {/* Business Name */}
        <motion.div variants={itemVariants} className="space-y-2" id="field-company">
          <label className="block font-sans font-bold text-sm text-gray-800 flex items-center">
            <Building className="w-4 h-4 mr-1.5 text-gray-400" />
            Business Name
          </label>
          <input
            type="text"
            placeholder="e.g. Durban Tourism Agency"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 font-sans text-sm bg-gray-50 text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30"
          />
        </motion.div>

        {/* Email Address */}
        <motion.div variants={itemVariants} className="space-y-2" id="field-email">
          <label className="block font-sans font-bold text-sm text-gray-800 flex items-center">
            <Mail className="w-4 h-4 mr-1.5 text-gray-400" />
            Email Address *
          </label>
          <input
            type="email"
            placeholder="e.g. client@company.co.za"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
            className={`w-full px-4 py-3 rounded-xl border font-sans text-sm bg-gray-50 text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30 ${
              errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-200'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email}</p>}
        </motion.div>

        {/* Phone Number */}
        <motion.div variants={itemVariants} className="space-y-2" id="field-phone">
          <label className="block font-sans font-bold text-sm text-gray-800 flex items-center">
            <Phone className="w-4 h-4 mr-1.5 text-gray-400" />
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="e.g. 073 508 5200"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validateField('phone', e.target.value);
            }}
            className={`w-full px-4 py-3 rounded-xl border font-sans text-sm bg-gray-50 text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30 ${
              errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-gray-200'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>}
        </motion.div>
      </div>

      {/* Date & Weekday Picker */}
      <motion.div variants={itemVariants} className="border-t border-gray-100 pt-6 space-y-4 text-left">
        <label className="block font-sans font-bold text-sm text-gray-800">
          Preferred Date * (Monday–Friday Only)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div id="field-date" className="space-y-2">
            <input
              type="date"
              min={getTodayDateString()}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                validateField('date', e.target.value);
                // Clear time if date changes
                setTime('');
              }}
              className={`w-full px-4 py-3 rounded-xl border font-sans text-sm bg-gray-50 text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30 ${
                errors.date ? 'border-red-400 focus:ring-red-200' : 'border-gray-200'
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs font-semibold">{errors.date}</p>}
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center">
            <p>
              We operate strictly within South African Standard Time (SAST) business hours. Monday to Friday, <span className="font-bold text-brand-maroon">08:30 to 16:30</span>. Weekend slots are automatically disabled.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Time Slots Grid */}
      {date && !errors.date && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3 text-left" 
          id="field-time"
        >
          <label className="block font-sans font-bold text-sm text-gray-800 flex items-center">
            <Clock className="w-4 h-4 mr-1.5 text-brand-orange" />
            Preferred Time * (SAST Time slots)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => {
                  setTime(slot);
                  validateField('time', slot);
                }}
                className={`py-3 px-2 text-center rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer ${
                  time === slot
                    ? 'bg-brand-orange text-white border-brand-orange shadow-md scale-[1.03]'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time && <p className="text-red-500 text-xs font-semibold">{errors.time}</p>}
        </motion.div>
      )}

      {/* Message / Core Scope & Objectives */}
      <motion.div variants={itemVariants} className="space-y-2 text-left" id="field-description">
        <label className="block font-sans font-bold text-sm text-gray-800 flex items-center">
          <FileText className="w-4 h-4 mr-1.5 text-gray-400" />
          Message / Objectives
        </label>
        <textarea
          rows={4}
          placeholder="Please describe your consultation scope, targets, or specific business goals..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 font-sans text-sm bg-gray-50 text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/30 focus:border-brand-maroon transition-colors"
        />
      </motion.div>

      {/* Call to action submit button */}
      <motion.div variants={itemVariants} className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 font-sans font-extrabold text-base rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 border-none ${
            isLoading 
              ? 'bg-brand-maroon/70 text-white cursor-not-allowed' 
              : 'bg-brand-maroon hover:bg-brand-maroon-hover text-white cursor-pointer hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Booking...</span>
            </>
          ) : (
            <>
              <span>Schedule Advisor Consultation</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3 font-sans">
          By clicking schedule, you agree to our corporate privacy standards. Your data is handled in SAST timezone standards.
        </p>
      </motion.div>
    </motion.form>
  );
}
