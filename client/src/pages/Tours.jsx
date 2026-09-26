import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Sparkles, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useFetch, Skeleton, Empty, TourCard, SectionHeader } from '../components/ui';
import BookingModal from '../components/BookingModal';
import TourDetailModal from '../components/TourDetailModal';

const CATEGORIES = [
  'All Packages',
  'Family Tours',
  'Honeymoon Tours',
  'Himachal Tours',
  'North India Tours',
  'Adventure Tours',
  'Weekend Trips'
];

export default function Tours() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [page, setPage] = useState(1);
  const [bookingTour, setBookingTour] = useState(null);
  const [detailTour, setDetailTour] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, loading, error } = useFetch('/tours', {
    q: debouncedQuery || undefined,
    category: category && category !== 'All Packages' ? category : undefined,
    page,
    limit: 9
  });

  const toursSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': (data?.items || []).map((t, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': t.title,
      'description': t.shortDescription,
      'image': t.thumbnail
    }))
  };

  return (
    <>
      <SEO
        title="Himachal & North India Tour Packages | Family, Honeymoon & Adventure Trips"
        description="Browse handcrafted Himachal Pradesh, Punjab and Chandigarh holiday tour packages. Shimla, Manali, Spiti Valley, Dharamshala, Dalhousie & Amritsar itineraries with private cab and 24/7 support."
        keywords="himachal holiday packages, manali honeymoon tour, shimla family package, spiti valley tour, chandigarh to manali tour, north india holiday packages, thakur tour travel"
        schema={toursSchema}
      />

      {/* Hero Banner */}
      <div className="relative bg-navy py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
            Handcrafted Holiday Itineraries
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Tour Packages &amp; Itineraries
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
            Every journey includes dedicated private mountain cabs, handpicked verified hotels, and flexible customization for your family or group.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Search & Category Filter */}
        <div className="mb-10 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2 relative">
              <Search size={16} className="absolute left-3.5 top-3.5 text-navy/40" />
              <input
                type="text"
                placeholder="Search packages by destination or title (e.g. Manali, Honeymoon, Spiti)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input !pl-10 text-sm"
              />
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="input text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat === 'All Packages' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const active = (!category && cat === 'All Packages') || category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat === 'All Packages' ? '' : cat);
                    setPage(1);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition whitespace-nowrap ${
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

        {/* Tours Grid */}
        {loading ? (
          <Skeleton n={6} />
        ) : error ? (
          <Empty text={error} />
        ) : !data?.items?.length ? (
          <Empty text="No tour packages matched your search. Try changing the category or search keyword." />
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((t) => (
                <TourCard
                  key={t._id}
                  t={t}
                  onBook={(tour) => setBookingTour(tour)}
                  onExplore={(tour) => setDetailTour(tour)}
                />
              ))}
            </div>

            {/* Pagination */}
            {data.pages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="btn-navy !py-2 !px-5 text-xs font-bold disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-xs font-bold text-navy">
                  Page {page} of {data.pages}
                </span>
                <button
                  disabled={page >= data.pages}
                  onClick={() => setPage(page + 1)}
                  className="btn-navy !py-2 !px-5 text-xs font-bold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Booking / Quote Modal */}
      {bookingTour && (
        <BookingModal
          tour={bookingTour}
          onClose={() => setBookingTour(null)}
        />
      )}

      {/* Full Itinerary Modal */}
      {detailTour && (
        <TourDetailModal
          tour={detailTour}
          onClose={() => setDetailTour(null)}
          onBook={(t) => {
            setDetailTour(null);
            setBookingTour(t);
          }}
        />
      )}
    </>
  );
}
