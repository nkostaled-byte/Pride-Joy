/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Briefcase, Mail, Phone, Trash2, Check, X, Search, Clock, FileSpreadsheet, RefreshCcw, Database, Loader2, CloudLightning } from 'lucide-react';
import { Booking } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
  onLogout?: () => void;
}

export default function AdminDashboard({ onClose, onLogout }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Cloudflare D1 Integration States
  const [isLoadingFromWorker, setIsLoadingFromWorker] = useState(false);
  const [workerFetchStatus, setWorkerFetchStatus] = useState<'idle' | 'success' | 'error' | 'local_fallback'>('idle');

  // Fetch from D1 SQL Database via Cloudflare Worker
  const fetchFromWorker = async () => {
    setIsLoadingFromWorker(true);
    setWorkerFetchStatus('idle');

    const WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL;
    
    // Attempt multiple fetch routes to be incredibly robust
    const urlsToTry = [
      `${WORKER_URL}?clientId=pride-and-joy&formName=booking`,
      `${WORKER_URL}/submissions?clientId=pride-and-joy`,
      `${WORKER_URL}/api/bookings?clientId=pride-and-joy`,
    ];

    let success = false;
    let fetchedData: any[] = [];

    // 1. Try GET requests
    for (const url of urlsToTry) {
      try {
        console.log(`Querying D1 SQL via: ${url}`);
        const res = await fetch(url, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.submissions || data.data || data.results);
          if (Array.isArray(list)) {
            fetchedData = list;
            success = true;
            break;
          }
        }
      } catch (err) {
        console.warn(`GET fetch failed for URL ${url}:`, err);
      }
    }

    // 2. Try POST fallback if GET is blocked by CORS/Worker limitations
    if (!success) {
      try {
        console.log(`Fallback: Sending POST query to ${WORKER_URL}`);
        const res = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId: "pride-and-joy",
            formName: "booking",
            action: "get_submissions"
          })
        });

        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : (data.submissions || data.data || data.results || (data.success && data.submissions));
          if (Array.isArray(list)) {
            fetchedData = list;
            success = true;
          }
        }
      } catch (err) {
        console.warn("POST fetch fallback failed:", err);
      }
    }

    if (success && fetchedData.length > 0) {
      // Map D1 query rows to the standard Booking interface
      const mappedBookings: Booking[] = fetchedData.map((item: any, index: number) => {
        let fields: any = {};
        if (typeof item.fields === 'string') {
          try {
            fields = JSON.parse(item.fields);
          } catch (e) {
            fields = {};
          }
        } else if (typeof item.fields === 'object' && item.fields !== null) {
          fields = item.fields;
        }

        const id = item.id || item.submissionId || fields.id || `PJ-${Math.floor(100000 + index * 100)}`;
        const name = item.customer_name || item.customerName || (item.customer && item.customer.name) || fields.name || item.name || 'Unknown Client';
        const email = item.customer_email || item.customerEmail || (item.customer && item.customer.email) || fields.email || item.email || '';
        const company = item.ticket || fields.Company || fields.company || fields.ticket || fields.businessName || item.company || item.businessName || 'Private Client';
        const phone = item.phone || fields.Phone || fields.phone || '';
        const category = item.service || fields.Service || fields.service || fields.category || item.category || 'Market Research';
        const consultationType = (item.barber === 'In-Person' || fields.Consultation === 'In-Person' || fields.consultation === 'In-Person' || fields.barber === 'In-Person' || fields.consultationType === 'In-Person' || item.consultationType === 'in-person' ? 'in-person' : 'virtual') as 'in-person' | 'virtual';
        const date = item.date || fields.Date || fields.date || fields.preferredDate || item.preferredDate || '';
        const time = item.time || fields.Time || fields.time || fields.preferredTime || item.preferredTime || '';
        const description = fields.Description || fields.description || fields.message || item.description || item.message || 'No message provided';
        const status = item.status || fields.status || 'pending';
        const createdAt = item.created_at || item.createdAt || new Date().toISOString();

        return {
          id,
          name,
          company,
          email,
          phone,
          category,
          consultationType,
          date,
          time,
          description,
          status,
          createdAt
        };
      }).filter((b: Booking) => b.id !== 'PJ-883921' && b.id !== 'PJ-482910' && b.id !== 'PJ-192837' && b.name !== 'Sbusiso Cele' && b.name !== 'Thembeka Khumalo' && b.name !== 'Bruce Henderson');

      setBookings(mappedBookings);
      setWorkerFetchStatus('success');
      // Update local storage so data aligns perfectly
      localStorage.setItem('pj_bookings', JSON.stringify(mappedBookings));
    } else {
      // If Cloudflare Worker query fails or is empty, load from LocalStorage
      console.log("D1 query returned no results, reading from Local Cache fallback.");
      const existing = localStorage.getItem('pj_bookings');
      if (existing) {
        const parsed = JSON.parse(existing);
        const filtered = parsed.filter((b: any) => b.id !== 'PJ-883921' && b.id !== 'PJ-482910' && b.id !== 'PJ-192837' && b.name !== 'Sbusiso Cele' && b.name !== 'Thembeka Khumalo' && b.name !== 'Bruce Henderson');
        setBookings(filtered);
        localStorage.setItem('pj_bookings', JSON.stringify(filtered));
      }
      setWorkerFetchStatus('local_fallback');
    }
    setIsLoadingFromWorker(false);
  };

  useEffect(() => {
    fetchFromWorker();
  }, []);

  // Update Status of a Booking
  const updateStatus = (id: string, newStatus: 'approved' | 'cancelled' | 'rescheduled') => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    localStorage.setItem('pj_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  // Delete a Booking
  const deleteBooking = (id: string) => {
    if (window.confirm('Are you sure you want to remove this booking permanently?')) {
      const updated = bookings.filter((b) => b.id !== id);
      localStorage.setItem('pj_bookings', JSON.stringify(updated));
      setBookings(updated);
    }
  };

  // Clear All Bookings
  const clearAllBookings = () => {
    if (window.confirm('Clear all bookings? This resets the calendar database in-browser.')) {
      localStorage.removeItem('pj_bookings');
      setBookings([]);
    }
  };

  // Filter & Search Logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    approved: bookings.filter((b) => b.status === 'approved').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    mrCount: bookings.filter((b) => b.category === 'Market Research').length,
    mbCount: bookings.filter((b) => b.category === 'Marketing & Branding').length,
    tcCount: bookings.filter((b) => b.category === 'Training & Consulting').length,
  };

  return (
    <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-2xl p-6 md:p-10 space-y-8 animate-fadeIn max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-200 pb-6 gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight flex items-center">
              <Database className="w-8 h-8 mr-3 text-brand-maroon" />
              Pride & Joy Booking Database
            </h2>
            
            {/* Live Cloudflare D1 Connection Indicator */}
            {isLoadingFromWorker ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Syncing with Cloudflare D1...
              </span>
            ) : workerFetchStatus === 'success' ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                <CloudLightning className="w-3.5 h-3.5 mr-1.5 text-emerald-600 fill-emerald-100" />
                Live D1 SQL Connected
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 shadow-xs" title="Worker is unreachable or returned empty database. Operating on local cache.">
                <CloudLightning className="w-3.5 h-3.5 mr-1.5 text-blue-600 animate-pulse" />
                Cached Local Sync
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={fetchFromWorker}
            disabled={isLoadingFromWorker}
            className="inline-flex items-center px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-sans font-bold text-xs rounded-xl shadow-xs disabled:opacity-50"
            title="Refresh database entries from Cloudflare D1 SQL"
          >
            <RefreshCcw className={`w-3.5 h-3.5 mr-1.5 ${isLoadingFromWorker ? 'animate-spin' : ''}`} />
            Refresh Sync
          </button>
          
          <button
            onClick={clearAllBookings}
            className="inline-flex items-center px-4 py-2 border border-red-200 text-red-700 bg-red-50 font-sans font-bold text-xs rounded-xl hover:bg-red-100"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Clear Database
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-sans font-bold text-xs rounded-xl hover:bg-gray-100"
          >
            Close Panel
          </button>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to lock the database and sign out from Owner Portal? This will hide the settings icon again.")) {
                localStorage.removeItem('pj_is_owner');
                if (onLogout) {
                  onLogout();
                } else {
                  window.location.reload();
                }
              }
            }}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-sans font-bold text-xs rounded-xl shadow-md"
          >
            Lock & Log Out
          </button>
        </div>
      </div>

      {/* KPI Stats Panel */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block">Total Proposals</span>
          <span className="text-3xl font-extrabold text-gray-900">{stats.total}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-amber-600 text-xs font-bold uppercase tracking-wider block">Awaiting Action</span>
          <span className="text-3xl font-extrabold text-amber-600">{stats.pending}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider block">Confirmed Slots</span>
          <span className="text-3xl font-extrabold text-emerald-700">{stats.approved}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Pillar: Market Research</span>
          <span className="text-3xl font-extrabold text-brand-maroon">{stats.mrCount} <span className="text-xs text-gray-400 font-normal">({stats.total > 0 ? Math.round(stats.mrCount/stats.total*100) : 0}%)</span></span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-96 flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by company, client name, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 font-sans text-xs text-gray-700 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 font-sans text-xs text-gray-700 focus:outline-hidden"
          >
            <option value="all">All Pillars</option>
            <option value="Market Research">Market Research</option>
            <option value="Marketing & Branding">Marketing & Branding</option>
            <option value="Training & Consulting">Training & Consulting</option>
          </select>
        </div>
      </div>

      {/* Table/Cards List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200/60 p-8 space-y-4 font-sans">
          <div className="inline-flex p-4 bg-gray-100 rounded-full text-gray-400">
            <Calendar className="w-12 h-12" />
          </div>
          <h3 className="font-display font-extrabold text-xl text-gray-900">No Booking Records Found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Try adjusting search key words, filters, or select "Seed Sample Data" at the top to quickly test features.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-gray-200/80 hover:border-brand-maroon/20 hover:shadow-md transition-all duration-200 p-5 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 font-sans relative"
            >
              {/* Reference, Client, Company */}
              <div className="space-y-2 lg:col-span-1.5">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-xs text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded-sm">
                    {b.id}
                  </span>
                  
                  {b.status === 'pending' && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      Pending
                    </span>
                  )}
                  {b.status === 'approved' && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Approved
                    </span>
                  )}
                  {b.status === 'cancelled' && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-50 text-red-800 border border-red-200">
                      Cancelled
                    </span>
                  )}
                </div>

                <h4 className="font-display font-extrabold text-lg text-gray-900">{b.name}</h4>
                <div className="space-y-1 text-xs text-gray-500">
                  <p className="flex items-center font-semibold text-gray-800">
                    <Briefcase className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    {b.company}
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    {b.email}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    {b.phone}
                  </p>
                </div>
              </div>

              {/* Booking Slot and Pillar */}
              <div className="space-y-3 lg:col-span-1.5">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">Service Focus</span>
                  <span className="font-display font-bold text-sm text-brand-maroon">{b.category}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-bold text-gray-700">{b.date}</span>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-bold text-gray-700 font-mono">{b.time}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 capitalize">
                  Format: <span className="font-bold text-gray-700">{b.consultationType}</span>
                </div>
              </div>

              {/* Brief Description & Action buttons */}
              <div className="lg:col-span-1 flex flex-col justify-between space-y-4">
                <div className="text-xs text-gray-600 line-clamp-3 leading-relaxed bg-gray-50/50 p-2.5 rounded-lg border border-dashed border-gray-100">
                  {b.description}
                </div>

                <div className="flex gap-1.5 justify-end mt-auto">
                  {b.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(b.id, 'approved')}
                      className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg border border-emerald-200 transition-colors"
                      title="Approve / Confirm Appointment"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  {b.status !== 'cancelled' && (
                    <button
                      onClick={() => updateStatus(b.id, 'cancelled')}
                      className="p-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg border border-red-200 transition-colors"
                      title="Cancel Booking"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="p-1.5 bg-gray-50 text-gray-500 hover:bg-gray-900 hover:text-white rounded-lg border border-gray-200 transition-colors"
                    title="Delete Permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
