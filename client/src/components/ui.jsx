import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, CheckCircle, ShieldCheck, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import api from '../services/axiosClient';
import { INITIAL_TOURS, INITIAL_DESTINATIONS, INITIAL_VEHICLES, INITIAL_BLOGS, INITIAL_TESTIMONIALS, DEFAULT_SETTINGS } from '../services/mockData';
import { getVehicleImage, getDestinationImage, VEHICLE_IMAGES, DESTINATION_IMAGES } from '../services/imageFallbacks';

// Fallback lookup map for mock resources
const mockLookup = {
  '/tours': INITIAL_TOURS,
  '/destinations': INITIAL_DESTINATIONS,
  '/vehicles': INITIAL_VEHICLES,
  '/blog': INITIAL_BLOGS,
  '/testimonials': INITIAL_TESTIMONIALS,
  '/settings': DEFAULT_SETTINGS
};

import { getStore } from '../services/dataStore';

export function useFetch(url, params) {
  const [state, set] = useState({ data: null, loading: true, error: null });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const handleStoreChange = () => {
      setRefreshTrigger((prev) => prev + 1);
    };
    window.addEventListener('ttt_store_change', handleStoreChange);
    return () => window.removeEventListener('ttt_store_change', handleStoreChange);
  }, []);

  const key = url + JSON.stringify(params || {}) + '_' + refreshTrigger;

  useEffect(() => {
    let on = true;
    set((s) => ({ ...s, loading: true }));

    // Extract resource name (e.g. /vehicles -> vehicles, /tours -> tours, /destinations -> destinations, /bookings -> bookings, /inquiries -> inquiries)
    const resource = url.replace(/^\//, '').split('?')[0].split('/')[0];

    // Read immediately from our synchronized dynamic local store
    const localData = getStore(resource);

    if (localData) {
      if (Array.isArray(localData)) {
        let items = localData.map((item) => {
          if (resource === 'vehicles') return { ...item, image: item.image || getVehicleImage(item) };
          if (resource === 'destinations') return { ...item, thumbnail: item.thumbnail || getDestinationImage(item) };
          return item;
        });

        if (params?.q) {
          const q = String(params.q).toLowerCase();
          items = items.filter((x) =>
            (x.title || x.name || x.shortDescription || x.customerName || x.destination || '').toLowerCase().includes(q)
          );
        }
        if (params?.category && params.category !== 'All') {
          items = items.filter((x) => x.category === params.category || x.vehicleType === params.category);
        }
        if (params?.isFeatured === 'true') {
          items = items.filter((x) => x.isFeatured);
        }
        if (params?.limit) {
          items = items.slice(0, +params.limit);
        }

        if (on) {
          set({
            data: { items, total: localData.length, pages: Math.ceil(localData.length / (params?.limit || 12)) },
            loading: false,
            error: null
          });
        }
      } else {
        if (on) {
          set({ data: localData, loading: false, error: null });
        }
      }
    }

    // Attempt background API fetch if server is running
    api.get(url, { params })
      .then((r) => {
        if (!on) return;
        let data = r.data;
        if (data?.items && Array.isArray(data.items)) {
          data.items = data.items.map((item) => {
            if (url.includes('vehicle')) return { ...item, image: item.image || getVehicleImage(item) };
            if (url.includes('destination')) return { ...item, thumbnail: item.thumbnail || getDestinationImage(item) };
            return item;
          });
          set({ data, loading: false, error: null });
        } else if (data && typeof data === 'object') {
          set({ data, loading: false, error: null });
        }
      })
      .catch(() => {
        // Local store fallback already active
      });

    return () => {
      on = false;
    };
  }, [key]);

  return state;
}

export const Skeleton = ({ n = 3 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-100 p-4" />
    ))}
  </div>
);

export const Empty = ({ text = 'No items found.' }) => (
  <div className="rounded-2xl bg-slate-50 border border-dashed border-navy/20 p-12 text-center text-navy/70">
    <p className="text-base font-medium">{text}</p>
  </div>
);

export const SectionHeader = ({ badge, title, subtitle, centered = false }) => (
  <div className={`mb-10 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'}`}>
    {badge && (
      <span className="inline-block rounded-full bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-3">
        {badge}
      </span>
    )}
    <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-base text-navy/70 sm:text-lg">
        {subtitle}
      </p>
    )}
  </div>
);

export function TourCard({ t, onBook, onExplore }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
        <img
          loading="lazy"
          src={t.thumbnail || DESTINATION_IMAGES.manali}
          alt={t.title}
          onError={(e) => { e.target.src = DESTINATION_IMAGES.manali; }}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded-full bg-navy/90 backdrop-blur px-3 py-1 text-xs font-semibold text-white shadow-md">
            {t.category || 'Himachal Tour'}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-navy shadow-md">
            <Clock size={12} />
            {t.duration || '5D / 4N'}
          </span>
        </div>

        {/* Bottom Destination */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-white/95">
          <MapPin size={13} className="text-gold" />
          <span>{t.destinationName || t.destination?.name || 'Himachal Pradesh'}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-navy leading-snug line-clamp-2 group-hover:text-sky transition">
          {t.title}
        </h3>
        
        <p className="mt-2 text-xs text-navy/70 line-clamp-2">
          {t.shortDescription}
        </p>

        {t.highlights && t.highlights.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {t.highlights.slice(0, 2).map((h, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-md bg-mist px-2 py-0.5 text-[11px] font-medium text-navy/80">
                <CheckCircle size={10} className="text-sky shrink-0" />
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          <a
            href={`https://wa.me/916230351337?text=${encodeURIComponent(`Hello Thakur Tour & Travels, I want to inquire about the tour package: "${t.title}" (${t.duration || 'Himachal Package'}). Please share customized itinerary & quote.`)}`}
            target="_blank"
            rel="noreferrer"
            className="btn bg-[#25D366] text-white hover:brightness-105 !py-2 !px-3 text-xs font-bold flex items-center gap-1 shrink-0 shadow-sm"
            title="Chat directly with Admin on WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageSquare size={13} /> WhatsApp
          </a>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              type="button"
              onClick={() => onExplore ? onExplore(t) : onBook(t)}
              className="text-xs font-semibold text-navy hover:text-sky transition hidden sm:inline-block"
            >
              Itinerary
            </button>
            
            <button
              type="button"
              onClick={() => onBook(t)}
              className="btn-gold !py-2 !px-3.5 text-xs font-bold shadow-md hover:shadow-lg flex-1 sm:flex-initial text-center justify-center"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function DestinationCard({ d, onExplore }) {
  const thumbnail = d.thumbnail || getDestinationImage(d);
  return (
    <div
      onClick={() => onExplore(d)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-navy/5 shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          loading="lazy"
          src={thumbnail}
          alt={d.name}
          onError={(e) => { e.target.src = DESTINATION_IMAGES.defaultDest; }}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
      
      <div className="absolute top-3 left-3">
        <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
          {d.state}
        </span>
      </div>

      <div className="absolute bottom-0 p-5 text-white w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{d.name}</h3>
          <span className="text-xs text-gold font-semibold">{d.duration}</span>
        </div>
        <p className="mt-1 text-xs text-white/80 line-clamp-2">
          {d.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/15 text-xs font-semibold text-gold">
          <span>Explore attractions &amp; packages</span>
          <ArrowRight size={14} className="transition transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
