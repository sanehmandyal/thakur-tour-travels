import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, MapPin, Mail, Clock, ShieldCheck, Star, Heart, Award, Navigation } from 'lucide-react';
import Logo from './Logo';
import BookingModal from './BookingModal';
import { DEFAULT_SETTINGS } from '../services/mockData';

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
  const location = useLocation();
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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const cleanPhone = settings.phone ? settings.phone.replace(/[^\d+]/g, '') : '+916230351337';
  const waNumber = settings.whatsapp ? settings.whatsapp.replace(/\D/g, '') : '916230351337';
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello Thakur Tour & Travel, I want to inquire about a customized tour package / cab rental.')}`;

  return (
    <div className="flex min-h-screen flex-col bg-white text-navy selection:bg-gold selection:text-navy pb-16 md:pb-0 w-full overflow-x-hidden max-w-full">
      {/* Top Notification / Contact Bar (Mobile-safe layout) */}
      <div className="bg-navy text-white text-[11px] sm:text-xs border-b border-white/10 py-1.5 px-3 sm:px-4 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="hidden md:inline-flex items-center gap-1.5 text-gold font-medium">
              <Award size={13} className="shrink-0" /> Govt. Recognized Himachal Partner
            </span>
            <span className="inline-flex items-center gap-1 text-white/85 truncate">
              <Clock size={12} className="text-sky shrink-0" /> 24x7 Station Pickup &amp; Assistance
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a href={`tel:${cleanPhone}`} className="inline-flex items-center gap-1 text-white hover:text-gold transition font-semibold">
              <Phone size={12} className="text-gold" />
              <span>{settings.phone || '+91 62303 51337'}</span>
            </a>
            <Link to="/admin/login" className="text-white/60 hover:text-white transition text-[10px] sm:text-[11px] underline">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur-md shadow-xs w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2 sm:py-3.5">
          <Link to="/" aria-label="Thakur Tour & Travel home" className="shrink-0 flex items-center min-w-0">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 font-semibold text-xs xl:text-sm text-navy">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `transition-colors py-1 relative ${
                    isActive
                      ? 'text-sky font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky after:rounded-full'
                      : 'hover:text-sky text-navy/80'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setQuickQuoteOpen(true)}
              className="hidden sm:inline-flex btn-gold !py-1.5 sm:!py-2 !px-3 sm:!px-4 text-xs font-bold shadow-md hover:shadow-lg"
            >
              Get Free Quote
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-navy hover:bg-slate-200 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-navy/10 bg-white px-4 py-4 lg:hidden animate-in slide-in-from-top-3 duration-200 shadow-xl w-full">
            <nav className="flex flex-col space-y-1">
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
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="btn-navy !py-2.5 text-xs font-bold justify-center"
                >
                  <Phone size={14} /> Call: {settings.phone}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[#25D366] text-white hover:brightness-105 !py-2.5 text-xs font-bold justify-center"
                >
                  <MessageSquare size={14} /> WhatsApp Instant Chat
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer className="mt-16 sm:mt-24 bg-navy text-white w-full overflow-x-hidden">
        {/* Trust Badges Strip */}
        <div className="border-b border-white/10 bg-navy/90 py-6 px-4 w-full">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gold/20 text-gold">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">100% Tailored Trips</p>
                <p className="text-[11px] text-white/60">Dates, hotel &amp; cab choice</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sky/20 text-sky">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Mountain Experts</p>
                <p className="text-[11px] text-white/60">10+ yrs hill terrain drivers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Star size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">4.9/5 Star Rated</p>
                <p className="text-[11px] text-white/60">2,480+ verified reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-purple-500/20 text-purple-300">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">24x7 Live Support</p>
                <p className="text-[11px] text-white/60">Continuous mountain safety</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Main Links */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: About */}
          <div>
            <Logo dark />
            <p className="mt-3 text-xs text-white/70 leading-relaxed">
              {settings.about || 'Thakur Tour & Travels (Amb Andaura) is a premier tour operator and taxi provider based right at Amb Andaura Railway Station, Himachal Pradesh (PIN 177203). We specialize in 24/7 station cab pickups, pilgrimage tours, and customized holiday packages.'}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
              <span className="text-white/80 font-medium ml-1.5">4.9 / 5 from 2,480+ guests</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">
              Explore Our Site
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
              <li><Link to="/destinations" className="hover:text-gold transition">Destinations (Chintpurni, Manali, Spiti)</Link></li>
              <li><Link to="/tours" className="hover:text-gold transition">Tour Packages &amp; Itineraries</Link></li>
              <li><Link to="/cabs" className="hover:text-gold transition">Outstation Cabs &amp; Taxi Fleet</Link></li>
              <li><Link to="/about" className="hover:text-gold transition">About Us &amp; Our Drivers</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition">Himachal Travel Blog &amp; Guides</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition">Contact &amp; Free Quote</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Circuits */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">
              Popular Tour Circuits
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link to="/tours" className="hover:text-sky transition">5 Devi Darshan Himachal Yatra</Link></li>
              <li><Link to="/tours" className="hover:text-sky transition">Complete Himachal Panorama (6D/5N)</Link></li>
              <li><Link to="/tours" className="hover:text-sky transition">Spiti Valley High-Altitude Expedition</Link></li>
              <li><Link to="/cabs" className="hover:text-sky transition">Innova Crysta Hill Rental</Link></li>
              <li><Link to="/cabs" className="hover:text-sky transition">Mahindra Thar 4x4 Off-Road Cabs</Link></li>
              <li><Link to="/cabs" className="hover:text-sky transition">17-Seater Luxury Tempo Traveller</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">
              Head Office &amp; Station Stand
            </h3>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                <span>{settings.address || 'Andora Railway Station, Dhandri, Amb, Himachal Pradesh - 177203'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition font-semibold">{settings.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition">{settings.email || 'bookings@thakurtourandtravels.com'}</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-sky shrink-0" />
                <span>{settings.workingHours || '24/7 Helpline | Station Stand: 24 Hours'}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
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
                <Navigation size={13} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10 py-4 text-center text-[11px] sm:text-xs text-white/50 px-4">
          <p>{settings.footerText || '© 2026 Thakur Tour & Travel. All rights reserved.'}</p>
        </div>
      </footer>

      {/* Floating Action Button (Tablet & Desktop) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 active:scale-95 focus:outline-none"
        >
          <MessageSquare size={24} />
        </a>
      </div>

      {/* Sticky Bottom Action Bar for Mobile Phones */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center gap-2 shadow-2xl safe-area-bottom">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 btn-navy !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Phone size={14} className="text-gold" />
          <span>Call Now</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 btn bg-[#25D366] text-white hover:brightness-105 !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageSquare size={14} />
          <span>WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() => setQuickQuoteOpen(true)}
          className="btn-gold !py-2.5 !px-3 text-xs font-bold"
        >
          Quote
        </button>
      </div>

      {/* Global Quick Quote Modal */}
      {quickQuoteOpen && (
        <BookingModal onClose={() => setQuickQuoteOpen(false)} />
      )}
    </div>
  );
}
