/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { Lock, X, ShieldAlert, KeyRound } from 'lucide-react';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import MarketResearch from './pages/MarketResearch';
import MarketingBranding from './pages/MarketingBranding';
import TrainingConsulting from './pages/TrainingConsulting';
import ClientsPage from './pages/ClientsPage';
import BookOnline from './pages/BookOnline';
import Contact from './pages/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingCategory, setBookingCategory] = useState<'Market Research' | 'Marketing & Branding' | 'Training & Consulting'>('Market Research');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Owner Authentication States
  const [isOwner, setIsOwner] = useState<boolean>(() => localStorage.getItem('pj_is_owner') === 'true');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Handle owner login submission
  const handleOwnerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = passcode.trim();
    if (['2013', 'admin', '0735085200'].includes(cleanCode)) {
      setIsOwner(true);
      localStorage.setItem('pj_is_owner', 'true');
      setIsLoginOpen(false);
      setPasscode('');
      setLoginError('');
      setIsAdminOpen(true); // Automatically open dashboard on successful login
    } else {
      setLoginError('Incorrect passcode. Please check your credentials and try again.');
    }
  };

  // Helper to render the currently selected page
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'market-research':
        return (
          <MarketResearch 
            setCurrentPage={setCurrentPage} 
            setBookingCategory={setBookingCategory} 
          />
        );
      case 'marketing-branding':
        return (
          <MarketingBranding 
            setCurrentPage={setCurrentPage} 
            setBookingCategory={setBookingCategory} 
          />
        );
      case 'training-consulting':
        return (
          <TrainingConsulting 
            setCurrentPage={setCurrentPage} 
            setBookingCategory={setBookingCategory} 
          />
        );
      case 'clients':
        return <ClientsPage setCurrentPage={setCurrentPage} />;
      case 'book-online':
        return (
          <BookOnline 
            bookingCategory={bookingCategory}
            onBookingSuccess={() => {
              console.log('New consulting slot requested.');
            }}
          />
        );
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] text-gray-800">
      {/* Sticky navigation bar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isOwner={isOwner}
      />

      {/* Main Body with Transitions */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate footer */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        onOpenOwnerLogin={() => {
          if (isOwner) {
            setIsAdminOpen(true);
          } else {
            setLoginError('');
            setPasscode('');
            setIsLoginOpen(true);
          }
        }}
      />

      {/* Beautiful Owner Gate Passcode Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden max-w-md w-full p-8 space-y-6 relative"
          >
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-maroon/10 text-brand-maroon mb-1">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-gray-900 tracking-tight">
                Owner Security Gateway
              </h3>
              <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                Access to the scheduling panel and consulting records is restricted to authenticated website owners.
              </p>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl flex items-start space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="font-sans text-xs text-red-800 font-semibold leading-normal">
                  {loginError}
                </span>
              </div>
            )}

            <form onSubmit={handleOwnerLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-sans font-bold text-xs text-gray-700 uppercase tracking-wider">
                  Owner Security Passcode
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter owner passcode..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon text-center tracking-widest font-mono text-gray-800"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-brand-maroon hover:bg-brand-maroon-hover text-white font-sans font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Authenticate & Unlock
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Admin Panel Modal Overlay */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl">
            <AdminDashboard 
              onClose={() => setIsAdminOpen(false)} 
              onLogout={() => {
                setIsOwner(false);
                setIsAdminOpen(false);
                setPasscode('');
                setLoginError('');
                setIsLoginOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
