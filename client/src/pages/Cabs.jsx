import { useState } from 'react';
import { Users, Briefcase, ShieldCheck, CheckCircle2, Car, Sparkles, Phone, MessageSquare, Award, Clock, ArrowRight, Star, ChevronRight, Eye } from 'lucide-react';
import SEO from '../components/SEO';
import { useFetch, Skeleton, Empty, SectionHeader } from '../components/ui';
import BookingModal from '../components/BookingModal';
import { getVehicleImage } from '../services/imageFallbacks';

const VEHICLE_FILTERS = [
  'All Vehicles',
  'Sedans',
  'Innova & SUVs',
  'Tempo Travellers & Luxury Vans'
];

export default function Cabs() {
  const { data, loading, error } = useFetch('/vehicles', { limit: 30 });
  const [activeFilter, setActiveFilter] = useState('All Vehicles');
  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const cabsSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    'name': 'Thakur Tour & Travels - Luxury Cabs & Taxi Services',
    'description': 'Premium outstation and local taxi rental services across Amb Andaura, Chandigarh, Himachal Pradesh, and Punjab. Dzire, Innova Crysta, Fortuner 4x4, and Luxury Tempo Travellers with mountain expert chauffeurs.',
    'telephone': '+91 62303 51337',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Andora Railway Station, Dhandri',
      'addressLocality': 'Amb',
      'addressRegion': 'Himachal Pradesh',
      'postalCode': '177203',
      'addressCountry': 'IN'
    },
    'priceRange': 'Custom Quotes on Request'
  };

  const allItems = data?.items || [];
  const filteredVehicles = allItems.filter((veh) => {
    if (activeFilter === 'All Vehicles') return true;
    if (activeFilter === 'Sedans') return veh.vehicleType.toLowerCase().includes('sedan') || veh.name.toLowerCase().includes('dzire') || veh.name.toLowerCase().includes('etios');
    if (activeFilter === 'Innova & SUVs') return veh.vehicleType.toLowerCase().includes('suv') || veh.vehicleType.toLowerCase().includes('mpv') || veh.vehicleType.toLowerCase().includes('innova') || veh.vehicleType.toLowerCase().includes('ertiga') || veh.vehicleType.toLowerCase().includes('fortuner');
    if (activeFilter === 'Tempo Travellers & Luxury Vans') return veh.vehicleType.toLowerCase().includes('tempo') || veh.vehicleType.toLowerCase().includes('van') || veh.vehicleType.toLowerCase().includes('urbania');
    return true;
  });

  return (
    <>
      <SEO
        title="Chandigarh, Himachal & Punjab Taxi Service | Outstation & Airport Cabs"
        description="Hire private cabs and taxis for Chandigarh to Manali, Shimla, Dharamshala, Spiti Valley and Delhi Airport. Innova Crysta, Dzire, Ertiga, Fortuner and Tempo Traveller with certified mountain drivers."
        keywords="chandigarh to manali taxi, shimla taxi service, innova crysta rental chandigarh, tempo traveller manali, himachal cab booking, thakur cabs, airport taxi chandigarh"
        schema={cabsSchema}
      />

      {/* Hero Banner */}
      <div className="relative bg-navy py-16 sm:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold border border-gold/30">
            Certified Mountain Chauffeurs • Yellow Plate Commercial Fleet
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Premium Outstation Cabs &amp; Travel Fleet
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
            From sleek executive sedans and gold-standard Innova Crystas to luxury 17-seater Tempo Travellers &amp; Force Urbania vans. Sanitized, comfortable, and driven by mountain veterans.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
        {/* Why Book Our Cabs Strip */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: 'Mountain Certified Chauffeurs', desc: '10+ years experience navigating tricky hill roads, hairpin bends, and snow conditions.' },
            { icon: ShieldCheck, title: 'Zero Hidden Charges', desc: 'All-inclusive custom quotes including tolls, state permits, parking fees, and driver allowances.' },
            { icon: Clock, title: 'Guaranteed On-Time Pickups', desc: 'Punctual 24/7 doorstep service at Chandigarh & Delhi airports, train stations, and hotels.' },
            { icon: Sparkles, title: 'Spotless Climate Control', desc: 'Deeply sanitized before each journey with high-power cooling AC and warm mountain blowers.' }
          ].map((item, i) => (
            <div key={i} className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold mb-4 shadow-sm">
                <item.icon size={22} />
              </div>
              <h3 className="text-sm font-bold text-navy">{item.title}</h3>
              <p className="mt-1.5 text-xs text-navy/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fleet Showcase Header & Filter Tabs */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <SectionHeader
              badge="Our Verified Commercial Fleet"
              title="Select the Perfect Vehicle for Your Journey"
              subtitle="All vehicles feature interstate all-India mountain permits, GPS tracking, and experienced drivers."
            />

            {/* Filter Tabs (Horizontal touch scroll on mobile/tablet) */}
            <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap max-w-full">
              {VEHICLE_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition whitespace-nowrap shrink-0 ${
                    activeFilter === f
                      ? 'bg-navy text-white shadow-md'
                      : 'bg-slate-100 text-navy/80 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Fleet Grid with Professional Cards */}
          {loading ? (
            <Skeleton n={6} />
          ) : error ? (
            <Empty text={error} />
          ) : !filteredVehicles.length ? (
            <Empty text="No vehicles found in this category. Contact us directly for custom fleet requirements." />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVehicles.map((veh) => (
                <article
                  key={veh._id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  {/* Vehicle Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      loading="lazy"
                      src={veh.image || getVehicleImage(veh)}
                      alt={veh.name}
                      onError={(e) => { e.target.src = getVehicleImage(veh); }}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-full bg-navy/90 backdrop-blur px-3 py-1 text-xs font-semibold text-white shadow-md">
                        {veh.vehicleType}
                      </span>
                      <span className="rounded-full bg-emerald-500 backdrop-blur px-2.5 py-0.5 text-xs font-bold text-white shadow-md flex items-center gap-1">
                        ✓ Available
                      </span>
                    </div>

                    {/* Tag / Recommendation */}
                    {veh.tag && (
                      <div className="absolute bottom-3 left-3">
                        <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-extrabold text-navy shadow-md">
                          {veh.tag}
                        </span>
                      </div>
                    )}

                    {/* Quick Preview Eye */}
                    <button
                      type="button"
                      onClick={() => setPreviewImage({ url: veh.image, title: veh.name })}
                      className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/80 transition"
                      aria-label="View photo"
                    >
                      <Eye size={14} />
                    </button>
                  </div>

                  {/* Vehicle Details */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-bold text-navy group-hover:text-sky transition">
                      {veh.name}
                    </h2>
                    
                    <p className="mt-2 text-xs text-navy/70 leading-relaxed">
                      {veh.suitability}
                    </p>

                    {/* Capacity Specs */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-navy/85">
                      <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-2.5 border border-slate-200/70">
                        <Users size={16} className="text-sky shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-navy/50">Capacity</p>
                          <p className="font-bold text-navy leading-tight">{veh.seatingCapacity}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-2.5 border border-slate-200/70">
                        <Briefcase size={16} className="text-sky shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-navy/50">Luggage</p>
                          <p className="font-bold text-navy leading-tight">{veh.luggageCapacity}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    {veh.features && veh.features.length > 0 && (
                      <div className="mt-4 space-y-1.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-navy/50">
                          Comfort &amp; Hill Features
                        </p>
                        <div className="space-y-1">
                          {veh.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-navy/80">
                              <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                      <a
                        href={`https://wa.me/916230351337?text=${encodeURIComponent(`Hello Thakur Tour & Travels, I want to inquire about renting the ${veh.name} (${veh.vehicleType}). Please share rates & availability.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn bg-[#25D366] text-white hover:brightness-105 !py-2.5 !px-3 text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0"
                        title="Chat directly with Admin on WhatsApp"
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => setBookingVehicle(veh)}
                        className="btn-gold !py-2.5 !px-4 text-xs font-bold shadow-md hover:shadow-lg flex-1 text-center justify-center"
                      >
                        Book / Get Quote
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Popular Taxi Routes Showcase */}
        <section className="rounded-3xl bg-navy text-white p-8 sm:p-12 shadow-2xl">
          <SectionHeader
            badge="Direct Taxi Routes &amp; Transfers"
            title="Popular Outstation Cab Routes We Operate"
            subtitle="Doorstep pickup from Chandigarh &amp; Delhi airports, railway stations, and local residences."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {[
              { from: 'Chandigarh (IXC)', to: 'Manali & Solang Valley', type: 'Scenic Himalayan Expressway (8-9 hrs)' },
              { from: 'Chandigarh (IXC)', to: 'Shimla & Kufri Hills', type: 'Smooth 4-Lane Mountain Highway (3.5 hrs)' },
              { from: 'Chandigarh', to: 'Dharamshala & McLeodganj', type: 'Kangra Valley Tea Garden Route (5-6 hrs)' },
              { from: 'New Delhi (DEL)', to: 'Shimla / Manali', type: 'Direct Luxury Outstation Transfer' },
              { from: 'Chandigarh / Kalka', to: 'Spiti Valley (Kaza)', type: 'Kinnaur Mountain Highway 4x4 / SUV' },
              { from: 'Amritsar Airport', to: 'Dalhousie & Khajjiar', type: 'Comfort Hill Station Route (4-5 hrs)' }
            ].map((route, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-gold/50 transition flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-white flex items-center justify-between">
                    <span>{route.from} ➔ {route.to}</span>
                  </p>
                  <p className="mt-1.5 text-xs text-white/65">{route.type}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingVehicle({ name: `${route.from} to ${route.to} Taxi` })}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline"
                >
                  <span>Request Route Quote</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Driver Standards & Safety Section */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky">
                Uncompromising Chauffeur Standards
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy">
                Why Families Trust Our Mountain Chauffeurs
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-navy/75 leading-relaxed">
                Driving on Himalayan mountain roads requires special instincts, defensive driving reflexes, and calm temperament. All our chauffeurs are local Himachal natives with police background verification and minimum 10 years of accident-free hill driving.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs text-navy/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Strict zero-alcohol policy on duty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Well-versed in Hindi, Punjabi &amp; English</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Equipped with snow-chains &amp; emergency kit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Courteous sightseeing guidance</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic mountain road drive in Himachal"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-3xl w-full rounded-3xl overflow-hidden bg-navy shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage.url} alt={previewImage.title} className="w-full max-h-[80vh] object-cover" />
            <div className="p-4 flex items-center justify-between text-white bg-navy">
              <p className="font-bold text-sm">{previewImage.title}</p>
              <button onClick={() => setPreviewImage(null)} className="btn-gold !py-1 text-xs font-bold">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Booking / Quote Modal */}
      {bookingVehicle && (
        <BookingModal
          vehicle={bookingVehicle}
          onClose={() => setBookingVehicle(null)}
        />
      )}
    </>
  );
}
