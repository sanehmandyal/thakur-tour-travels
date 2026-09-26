import { useState } from 'react';
import { X, Clock, MapPin, CheckCircle, XCircle, Sparkles, Phone, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export default function TourDetailModal({ tour, onClose, onBook }) {
  const [openDay, setOpenDay] = useState(1);

  if (!tour) return null;

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-navy/60 backdrop-blur text-white grid place-items-center hover:bg-navy transition shadow-lg"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Hero Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-navy">
          <img
            src={tour.thumbnail || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'}
            alt={tour.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                {tour.category || 'Himachal Tour'}
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-medium flex items-center gap-1">
                <Clock size={12} />
                {tour.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {tour.title}
            </h2>
            {tour.route && (
              <p className="mt-2 text-xs text-white/80 flex items-center gap-1.5 line-clamp-1">
                <MapPin size={13} className="text-gold shrink-0" />
                <span>{tour.route}</span>
              </p>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-base font-bold text-navy uppercase tracking-wider mb-2">
              Tour Overview
            </h3>
            <p className="text-sm text-navy/80 leading-relaxed">
              {tour.shortDescription || tour.description}
            </p>
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="rounded-2xl bg-mist/60 border border-sky/20 p-4">
              <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles size={16} className="text-gold" />
                Key Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-navy/90">
                    <CheckCircle size={14} className="text-sky shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day-by-day Itinerary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-navy uppercase tracking-wider mb-3">
                Day-by-Day Itinerary Plan
              </h3>
              <div className="space-y-3">
                {tour.itinerary.map((day, idx) => {
                  const dayNum = day.day || idx + 1;
                  const isOpen = openDay === dayNum;
                  return (
                    <div
                      key={idx}
                      className="border border-navy/10 rounded-xl overflow-hidden transition"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenDay(isOpen ? null : dayNum)}
                        className={`w-full flex items-center justify-between p-3.5 text-left text-sm font-bold transition ${
                          isOpen ? 'bg-navy text-white' : 'bg-slate-50 text-navy hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-black ${
                            isOpen ? 'bg-gold text-navy' : 'bg-navy/10 text-navy'
                          }`}>
                            Day {dayNum}
                          </span>
                          <span>{day.title}</span>
                        </span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {isOpen && (
                        <div className="p-4 text-xs sm:text-sm text-navy/80 bg-white border-t border-navy/5 leading-relaxed">
                          {day.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50/40 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-green-900 mb-2 flex items-center gap-1.5">
                <CheckCircle size={15} className="text-green-600" />
                Package Inclusions
              </h4>
              <ul className="space-y-1.5 text-xs text-navy/80">
                {(tour.inclusions || [
                  'Dedicated Private Mountain Cab for all transfers',
                  'Verified Hotel accommodations with Mountain Views',
                  'Daily Morning Breakfast & Dinner',
                  'All Toll taxes, State taxes, Parking and Driver Allowances',
                  '24/7 On-Trip Assistance'
                ]).map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50/40 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-900 mb-2 flex items-center gap-1.5">
                <XCircle size={15} className="text-red-600" />
                Package Exclusions
              </h4>
              <ul className="space-y-1.5 text-xs text-navy/80">
                {(tour.exclusions || [
                  'Flight / Train tickets to destination',
                  'Monument entry fees & Adventure sports tickets',
                  'Personal laundry, tips, and items not in inclusions'
                ]).map((exc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-600 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-navy">100% Customized Trips</p>
            <p className="text-[11px] text-navy/60">No fixed prices • Free customized quotes within 15 minutes</p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBook(tour);
              }}
              className="btn-gold !py-2.5 !px-6 text-sm font-bold flex-1 sm:flex-initial shadow-md"
            >
              Get Custom Quote For This Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
