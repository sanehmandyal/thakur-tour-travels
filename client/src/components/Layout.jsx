import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, MapPin, Mail, Clock, ShieldCheck, Star, Heart, Award } from 'lucide-react';
import Logo from './Logo';
import BookingModal from './BookingModal';
import { DEFAULT_SETTINGS } from '../services/mockData';
import api from '../services/axiosClient';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/tours', label: 'Tour Packages' },
  { to: '/cabs', label: 'Cab & Taxi' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Travel Blog' },
  { to: '/contact', label: 'Contact Us' }
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickQuoteOpen, setQuickQuoteOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('ttt_settings');
      return cached ? { ...DEFAULT_SETTINGS, ...JSON.parse(cached) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    const refreshSettings = () => {
      try {
        const cached = localStorage.getItem('ttt_settings');
        if (cached) setSettings((prev) => ({ ...prev, ...JSON.parse(cached) }));
      } catch {}
    };
    refreshSettings();
    window.addEventListener('ttt_store_change', refreshSettings);
    return () => window.removeEventListener('ttt_store_change', refreshSettings);
  }, []);

  const cleanPhone = settings.phone ? settings.phone.replace(/[^\d+]/g, '') : '+916230351337';
  const waNumber = settings.whatsapp ? settings.whatsapp.replace(/\D/g, '') : '916230351337';
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello Thakur Tour & Travel, I want to inquire about a customized tour package / cab rental.')}`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Notification / Contact Bar */}
      <div className="bg-navy text-white text-xs border-b border-white/10 py-2 px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-gold font-medium">
              <Award size={14} /> Govt. Recognized Himachal & North India Travel Partner
            </span>
            <span className="inline-flex items-center gap-1 text-white/80">
              <Clock size={13} className="text-sky" /> 24x7 Mountain Assistance
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a href={`tel:${cleanPhone}`} className="inline-flex items-center gap-1 text-white hover:text-gold transition font-semibold">
              <Phone size={13} className="text-gold" />
              <span>{settings.phone || '+91 62303 51337'}</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-semibold">
              <MessageSquare size={13} />
              <span>WhatsApp Chat</span>
            </a>
            <Link to="/admin/login" className="text-white/60 hover:text-white transition text-[11px]">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4">
          <Link to="/" aria-label="Thakur Tour & Travel home" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm text-navy">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `transition py-1 relative ${
                    isActive
                      ? 'text-sky font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky after:rounded-full'
                      : 'hover:text-sky'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuickQuoteOpen(true)}
              className="btn-gold !py-2 !px-4 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg"
            >
              Get Free Quote
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-navy hover:bg-slate-200 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-navy/10 bg-white px-4 py-4 lg:hidden animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isActive ? 'bg-sky/15 text-sky font-bold' : 'text-navy hover:bg-slate-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="btn-navy !py-2.5 text-xs font-bold justify-center"
                >
                  <Phone size={15} /> Call: {settings.phone}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[#25D366] text-white hover:brightness-105 !py-2.5 text-xs font-bold justify-center"
                >
                  <MessageSquare size={15} /> WhatsApp Instant Chat
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Page Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer className="mt-20 bg-navy text-white">
        {/* Trust Badges Strip */}
        <div className="border-b border-white/10 bg-navy/80 py-6">
          <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/20 text-gold">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">100% Customized Trips</p>
                <p className="text-[11px] text-white/60">Tailored to your dates & preferences</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky/20 text-sky">
                <Award size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Verified Mountain Drivers</p>
                <p className="text-[11px] text-white/60">10+ yrs hill terrain experience</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Star size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">4.9/5 Star Rated</p>
                <p className="text-[11px] text-white/60">2,400+ delighted travelers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-500/20 text-purple-300">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">24x7 On-Trip Support</p>
                <p className="text-[11px] text-white/60">Dedicated mountain coordinator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Main Links */}
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: About */}
          <div>
            <Logo dark />
            <p className="mt-4 text-xs text-white/70 leading-relaxed">
              {settings.about || 'Thakur Tour & Travel is North India’s trusted travel and cab service specialist. We provide tailored private tours, luxury cabs, and memorable mountain road trips across Himachal, Punjab, and Chandigarh.'}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gold">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <span className="text-white/80 font-medium ml-1">4.9 / 5 from 2,400+ guests</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore Our Site
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
              <li><Link to="/destinations" className="hover:text-gold transition">Destinations (Manali, Shimla, Spiti)</Link></li>
              <li><Link to="/tours" className="hover:text-gold transition">Tour Packages & Itineraries</Link></li>
              <li><Link to="/cabs" className="hover:text-gold transition">Outstation Cabs & Taxi Fleet</Link></li>
              <li><Link to="/about" className="hover:text-gold transition">About Us & Our Team</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition">Himachal Travel Blog & Guides</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition">Contact & Free Quote</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Circuits */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Popular Tour Circuits
            </h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/tours" className="hover:text-sky transition">Shimla Manali 6-Day Tour</Link></li>
              <li><Link to="/tours" className="hover:text-sky transition">Spiti Valley Road Expedition</Link></li>
              <li><Link to="/tours" className="hover:text-sky transition">Dharamshala Dalhousie Khajjiar</Link></li>
              <li><Link to="/tours" className="hover:text-sky transition">Manali Honeymoon Special</Link></li>
              <li><Link to="/tours" className="hover:text-sky transition">Amritsar Golden Temple & Wagah</Link></li>
              <li><Link to="/cabs" className="hover:text-sky transition">Chandigarh to Manali Taxi Service</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Head Office &amp; Station Hub
            </h3>
            <div className="space-y-3 text-xs text-white/80">
              <div>
                <p className="flex items-start gap-2">
                  <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                  <span>{settings.address || 'Andora Railway Station, Dhandri, Amb, Himachal Pradesh - 177203'}</span>
                </p>
                <a
                  href={settings.googleMapsUrl || 'https://maps.app.goo.gl/bDZyPwLejw7JTwCe6'}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 ml-6 inline-flex items-center gap-1 text-[11px] font-semibold text-gold hover:underline"
                >
                  <span>📍 View on Google Maps</span>
                </a>
              </div>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-gold shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition font-medium">{settings.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-gold shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition">{settings.email || 'bookings@thakurtourandtravels.com'}</a>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={15} className="text-sky shrink-0" />
                <span>{settings.workingHours || '24/7 Helpline | Station Stand: 24 Hours'}</span>
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={() => setQuickQuoteOpen(true)}
                className="btn-gold !py-2 w-full text-xs font-bold shadow-md"
              >
                Request Free Custom Quote
              </button>
              <a
                href={settings.googleMapsUrl || 'https://maps.app.goo.gl/bDZyPwLejw7JTwCe6'}
                target="_blank"
                rel="noreferrer"
                className="btn border border-white/20 text-white hover:bg-white/10 !py-1.5 w-full text-[11px] font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Navigate via Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/50 px-4">
          <p>{settings.footerText || '© 2026 Thakur Tour & Travel. All rights reserved.'}</p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Travel Specialist on WhatsApp"
          className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 active:scale-95 focus:outline-none"
        >
          <MessageSquare size={26} />
        </a>

        {/* Call Button (Mobile Only) */}
        <a
          href={`tel:${cleanPhone}`}
          aria-label="Call Thakur Tour & Travel"
          className="md:hidden grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-xl transition hover:scale-105 active:scale-95 border-2 border-gold"
        >
          <Phone size={20} className="text-gold" />
        </a>
      </div>

      {/* Global Quick Quote Modal */}
      {quickQuoteOpen && (
        <BookingModal onClose={() => setQuickQuoteOpen(false)} />
      )}
    </div>
  );
}
