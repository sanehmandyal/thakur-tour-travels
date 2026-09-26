import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, CheckCircle2, Search, Sparkles, ArrowRight, X, Phone, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { useFetch, Skeleton, Empty, SectionHeader } from '../components/ui';
import BookingModal from '../components/BookingModal';
import { getDestinationImage } from '../services/imageFallbacks';

const CATEGORIES = [
  'All Destinations',
  'Hill Station',
  'Spiritual & Hill Station',
  'Scenic Nature',
  'Adventure & Road Trip',
  'Heritage & Spiritual',
  'Nature & Trekking',
  'City & Gateway'
];

export default function Destinations() {
  const [searchParams] = useSearchParams();
  const [selectedCat, setSelectedCat] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDestModal, setSelectedDestModal] = useState(null);
  const [quoteDestination, setQuoteDestination] = useState(null);

  const { data, loading, error } = useFetch('/destinations', {
    q: searchQuery || undefined,
    category: selectedCat && selectedCat !== 'All Destinations' ? selectedCat : undefined
  });

  const destSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': (data?.items || []).map((d, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': d.name,
      'description': d.shortDescription,
      'image': d.thumbnail
    }))
  };

  return (
    <>
      <SEO
        title="Top Himachal & North India Travel Destinations | Thakur Tour & Travel"
        description="Explore top tourist places in Himachal Pradesh, Punjab and Chandigarh including Manali, Shimla, Spiti Valley, Dharamshala, Dalhousie, and Amritsar. Get custom quotes with private cabs."
        keywords="himachal destinations, manali tourist places, shimla sightseeing, spiti valley places, dharamshala mcleodganj, khajjiar, amritsar golden temple, thakur tour travel"
        schema={destSchema}
      />

      {/* Hero Banner */}
      <div className="relative bg-navy py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
            Himalayan Wonders &amp; Sacred Cities
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Explore Tourist Destinations
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
            Discover the magic of snow peaks, ancient cedar forests, sacred temples, and cold desert valleys. Let us craft your personalized journey.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Search & Filter Bar */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-3.5 text-navy/40" />
            <input
              type="text"
              placeholder="Search destination (e.g. Manali, Spiti)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input !pl-10 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const active = (!selectedCat && cat === 'All Destinations') || selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat === 'All Destinations' ? '' : cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
                    active
                      ? 'bg-navy text-white shadow-md'
                      : 'bg-slate-100 text-navy/80 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <Skeleton n={6} />
        ) : error ? (
          <Empty text={error} />
        ) : !data?.items?.length ? (
          <Empty text="No destinations matched your search. Try searching for Manali, Shimla, Dharamshala or Spiti." />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((dest) => (
              <article
                key={dest._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    loading="lazy"
                    src={dest.thumbnail || getDestinationImage(dest)}
                    alt={dest.name}
                    onError={(e) => { e.target.src = getDestinationImage(dest); }}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 rounded-full bg-navy/85 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                    {dest.state}
                  </span>
                  
                  <span className="absolute bottom-3 right-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-navy flex items-center gap-1">
                    <Clock size={12} /> {dest.duration || '3 - 5 Days'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-navy group-hover:text-sky transition">
                    {dest.name}
                  </h2>
                  <p className="mt-1 text-xs font-medium text-navy/60">
                    📍 {dest.location}
                  </p>

                  <p className="mt-3 text-xs text-navy/75 leading-relaxed line-clamp-3">
                    {dest.shortDescription || dest.description}
                  </p>

                  {/* Best Time */}
                  {dest.bestTimeToVisit && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-2.5 text-[11px] text-navy/80 flex items-center gap-1.5 border border-slate-100">
                      <Calendar size={13} className="text-sky shrink-0" />
                      <span><b>Best Season:</b> {dest.bestTimeToVisit}</span>
                    </div>
                  )}

                  {/* Highlights */}
                  {dest.highlights && dest.highlights.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-navy/50">Top Attractions</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="rounded-md bg-mist px-2 py-0.5 text-[11px] font-medium text-navy">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions (NO PRICES) */}
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDestModal(dest)}
                      className="text-xs font-bold text-navy hover:text-sky transition"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuoteDestination(dest)}
                      className="btn-gold !py-2 !px-4 text-xs font-bold shadow-md"
                    >
                      Plan Trip Here
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Destination Detail Modal */}
      {selectedDestModal && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedDestModal(null)}
        >
          <div
            className="my-8 w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDestModal(null)}
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-navy/60 backdrop-blur text-white grid place-items-center hover:bg-navy transition"
            >
              <X size={20} />
            </button>

            <div className="relative h-64 w-full bg-navy">
              <img
                src={selectedDestModal.thumbnail}
                alt={selectedDestModal.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                  {selectedDestModal.state}
                </span>
                <h2 className="mt-2 text-3xl font-extrabold">{selectedDestModal.name}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy/60">Overview</h3>
                <p className="mt-1 text-sm text-navy/80 leading-relaxed">
                  {selectedDestModal.description || selectedDestModal.shortDescription}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-xs font-bold text-navy flex items-center gap-1.5 mb-1">
                    <Clock size={14} className="text-sky" /> Recommended Duration
                  </p>
                  <p className="text-xs text-navy/70">{selectedDestModal.duration || '3 - 5 Days'}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-xs font-bold text-navy flex items-center gap-1.5 mb-1">
                    <Calendar size={14} className="text-sky" /> Best Time to Visit
                  </p>
                  <p className="text-xs text-navy/70">{selectedDestModal.bestTimeToVisit || 'Throughout the year'}</p>
                </div>
              </div>

              {selectedDestModal.highlights && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy/60 mb-2">Must-Visit Attractions</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedDestModal.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-navy/80 bg-mist p-2 rounded-xl">
                        <CheckCircle2 size={14} className="text-sky shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-navy/70">
                100% Customized Trips • Private Cabs Available
              </span>
              <button
                onClick={() => {
                  const d = selectedDestModal;
                  setSelectedDestModal(null);
                  setQuoteDestination(d);
                }}
                className="btn-gold !py-2.5 !px-6 text-xs font-bold w-full sm:w-auto"
              >
                Plan My Trip to {selectedDestModal.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking / Quote Modal */}
      {quoteDestination && (
        <BookingModal
          destination={quoteDestination}
          onClose={() => setQuoteDestination(null)}
        />
      )}
    </>
  );
}
