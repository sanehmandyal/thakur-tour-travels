import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Briefcase, ShieldCheck, Award, Star, Clock, Car, ChevronDown, ChevronUp, Sparkles, CheckCircle2, Phone, MessageSquare, ArrowRight, Navigation } from 'lucide-react';
import SEO from '../components/SEO';
import { useFetch, Skeleton, Empty, TourCard, DestinationCard, SectionHeader } from '../components/ui';
import BookingModal from '../components/BookingModal';
import TourDetailModal from '../components/TourDetailModal';
import { FAQS } from '../services/mockData';
import { getVehicleImage, getDestinationImage, VEHICLE_IMAGES } from '../services/imageFallbacks';

export default function Home() {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('Amb Andaura Railway Station (AADR)');
  const [toDestination, setToDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelersCount, setTravelersCount] = useState('2 Persons (Couple)');
  const [bookingItem, setBookingItem] = useState(null);
  const [detailTour, setDetailTour] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const tours = useFetch('/tours', { isFeatured: 'true', limit: 6 });
  const destinations = useFetch('/destinations', { limit: 6 });
  const testimonials = useFetch('/testimonials', { limit: 4 });
  const vehicles = useFetch('/vehicles', { limit: 3 });

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setBookingItem({
      initialValues: {
        pickupLocation: fromLocation,
        destination: toDestination || 'Himachal Custom Tour',
        travelDate: travelDate,
        numberOfTravelers: parseInt(travelersCount) || 2
      }
    });
  };

  const handleHeroWhatsApp = () => {
    const text = `Hello Thakur Tour & Travel, I am inquiring about a trip:
📍 Pickup: ${fromLocation || 'Amb Andaura'}
🏔️ Destination: ${toDestination || 'Himachal Tour'}
📅 Date: ${travelDate || 'Flexible'}
👥 Group Size: ${travelersCount}

Please share tour options and best quote.`;
    window.open(`https://wa.me/916230351337?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleExploreTours = () => {
    navigate(`/tours?q=${encodeURIComponent(toDestination || fromLocation)}`);
  };

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'Thakur Tour & Travels (Amb Andaura)',
    'image': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    'description': 'Premier tour operator and cab rental service in Amb Andaura, Himachal Pradesh, Punjab, and Chandigarh. Custom holiday packages, vetted mountain drivers, and 24/7 on-trip assistance.',
    'telephone': '+91 62303 51337',
    'email': 'bookings@thakurtourandtravels.com',
    'hasMap': 'https://maps.app.goo.gl/bDZyPwLejw7JTwCe6',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Andora Railway Station, Dhandri',
      'addressLocality': 'Amb',
      'addressRegion': 'Himachal Pradesh',
      'postalCode': '177203',
      'addressCountry': 'IN'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '2480'
    },
    'priceRange': 'Custom Quotes on Request'
  };

  return (
    <>
      <SEO
        title="Himachal, Punjab & Chandigarh Tour Packages & Luxury Cabs"
        description="Book customized Shimla, Manali, Spiti Valley, Dharamshala & Amritsar tour packages and private taxi rentals with Thakur Tour & Travel. 100% tailored itineraries, zero hidden costs, 24/7 mountain support."
        keywords="himachal tour packages, manali tour package, shimla taxi service, chandigarh to manali cab, spiti valley road trip, thakur tour and travel, dharamshala taxi, amritsar tour"
        schema={homeSchema}
      />

      {/* Hero Section with Vibrant Snow Mountain Picture */}
      <section className="relative isolate overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
          alt="Breathtaking snow-capped Himalayan mountain range"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center brightness-95"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />

        <div className="mx-auto max-w-7xl px-4 pt-14 pb-28 sm:pt-24 sm:pb-36 lg:pt-32 text-white w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl w-full"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3.5 sm:px-4 py-1 text-[11px] sm:text-xs font-bold text-gold border border-gold/40 mb-4 sm:mb-6 shadow-sm">
              <Sparkles size={14} className="text-gold shrink-0" />
              <span>100% Customized Trips • Verified Mountain Drivers</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Experience Himachal &amp; North India with Local Mountain Experts
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/95 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
              Handcrafted private tour packages, scenic road trips, and luxury taxi services across Shimla, Manali, Spiti Valley, Dharamshala, Dalhousie, and Amritsar.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => setBookingItem({ title: 'General Custom Trip' })}
                className="btn-gold !py-3 !px-7 text-xs sm:text-sm font-black shadow-2xl hover:shadow-gold/30 hover:scale-105 transition transform"
              >
                Plan My Custom Trip
              </button>
              <Link
                to="/tours"
                className="btn bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30 !py-3 !px-6 text-xs sm:text-sm font-bold shadow-lg"
              >
                Explore Tour Packages
              </Link>
            </div>
          </motion.div>

          {/* Trust Stat Badges */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
            <div>
              <p className="text-xl sm:text-3xl font-black text-gold">15+ Years</p>
              <p className="text-[11px] sm:text-xs text-white/75 mt-0.5">Himalayan Expertise</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-black text-gold">12,500+</p>
              <p className="text-[11px] sm:text-xs text-white/75 mt-0.5">Happy Guests</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-black text-gold">50+ Cabs</p>
              <p className="text-[11px] sm:text-xs text-white/75 mt-0.5">Modern Fleet</p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-black text-gold">4.9 / 5</p>
              <p className="text-[11px] sm:text-xs text-white/75 mt-0.5">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Search & Fast Inquiry Bar - 4 Dimensions */}
      <div className="relative z-20 mx-auto -mt-12 max-w-6xl px-4">
        <form
          onSubmit={handleHeroSearch}
          className="rounded-3xl bg-white p-4 sm:p-6 shadow-2xl border border-navy/10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-end"
        >
          {/* 1. From Where to Go */}
          <div className="lg:col-span-3">
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-1.5">
              <Navigation size={13} className="text-sky shrink-0" />
              <span>1. From (Pickup)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                list="pickup-suggestions"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="Amb Andaura (AADR), Chandigarh..."
                className="input !py-2.5 !pl-3.5 text-xs font-semibold text-navy focus:ring-sky"
                required
              />
              <datalist id="pickup-suggestions">
                <option value="Amb Andaura Railway Station (AADR)" />
                <option value="Una Himachal Railway Station (UHL)" />
                <option value="Chandigarh Airport / Railway Station" />
                <option value="New Delhi Railway Station / IGI Airport" />
                <option value="Kalka Railway Station" />
                <option value="Amritsar Airport / Station" />
                <option value="Jalandhar / Ludhiana City" />
              </datalist>
            </div>
          </div>

          {/* 2. Where to Go */}
          <div className="lg:col-span-3">
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-1.5">
              <MapPin size={13} className="text-rose-500 shrink-0" />
              <span>2. Where to Go</span>
            </label>
            <div className="relative">
              <input
                type="text"
                list="destination-suggestions"
                value={toDestination}
                onChange={(e) => setToDestination(e.target.value)}
                placeholder="Manali, Shimla, Spiti, Chintpurni..."
                className="input !py-2.5 !pl-3.5 text-xs font-semibold text-navy focus:ring-rose-400"
                required
              />
              <datalist id="destination-suggestions">
                <option value="Manali, Solang Valley & Atal Tunnel" />
                <option value="Shimla, Kufri & Narkanda" />
                <option value="Dharamshala, McLeodganj & Kangra" />
                <option value="Spiti Valley Circuit (Kaza, Tabo & Chandratal)" />
                <option value="Dalhousie & Khajjiar (Mini Switzerland)" />
                <option value="Mata Chintpurni, Jawala Ji & Kangra Devi" />
                <option value="Amritsar (Golden Temple & Wagah Border)" />
                <option value="Kasol, Manikaran Sahib & Tosh" />
                <option value="Kinnaur Valley (Kalpa & Sangla)" />
              </datalist>
            </div>
          </div>

          {/* 3. When to Go */}
          <div className="lg:col-span-2">
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-1.5">
              <Calendar size={13} className="text-emerald-500 shrink-0" />
              <span>3. When to Go</span>
            </label>
            <input
              type="date"
              value={travelDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setTravelDate(e.target.value)}
              className="input !py-2.5 text-xs font-semibold text-navy focus:ring-emerald-400"
            />
          </div>

          {/* 4. How Many to Go */}
          <div className="lg:col-span-2">
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-1.5">
              <Users size={13} className="text-amber-500 shrink-0" />
              <span>4. How Many to Go</span>
            </label>
            <select
              value={travelersCount}
              onChange={(e) => setTravelersCount(e.target.value)}
              className="input !py-2.5 text-xs font-semibold text-navy focus:ring-amber-400"
            >
              <option value="1 Person (Solo)">1 Person (Solo)</option>
              <option value="2 Persons (Couple)">2 Persons (Couple)</option>
              <option value="3 - 4 Persons (Family)">3 - 4 Persons (Family)</option>
              <option value="5 - 7 Persons (Innova SUV)">5 - 7 Persons (Innova/Ertiga)</option>
              <option value="8 - 12 Persons (Tempo)">8 - 12 (Tempo Traveller)</option>
              <option value="13+ Persons (Large Group)">13+ Persons (Group / Bus)</option>
            </select>
          </div>

          {/* Submit / Action Button */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <button
              type="submit"
              className="btn-gold w-full !py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition active:scale-95"
            >
              <Sparkles size={13} className="shrink-0" />
              <span>Plan &amp; Quote</span>
            </button>
            <button
              type="button"
              onClick={handleHeroWhatsApp}
              className="w-full rounded-xl bg-[#25D366] text-white hover:brightness-105 py-1.5 px-2 text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition"
            >
              <MessageSquare size={13} className="shrink-0" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleExploreTours}
              className="text-[10px] font-bold text-sky hover:text-navy text-center underline decoration-sky/40"
            >
              Browse Tours →
            </button>
          </div>
        </form>
      </div>

      {/* Section 1: Popular Destinations */}
      <section className="mx-auto mt-20 max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            badge="Top Mountain Destinations"
            title="Explore Popular Travel Destinations"
            subtitle="Discover pristine hill stations, colonial towns, holy shrines, and trans-Himalayan valleys."
          />
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky hover:text-navy transition mb-10 shrink-0"
          >
            <span>View All Destinations</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {destinations.loading ? (
          <Skeleton n={6} />
        ) : !destinations.data?.items?.length ? (
          <Empty text="No destinations available right now." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.data.items.map((d) => (
              <DestinationCard
                key={d._id}
                d={d}
                onExplore={(dest) => setBookingItem({ title: `Trip to ${dest.name}` })}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Featured Tour Packages (NO PRICES) */}
      <section className="mx-auto mt-24 max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            badge="Handcrafted Itineraries"
            title="Trending Tour Packages"
            subtitle="All packages include private mountain cab, handpicked stays, sightseeing, and 24/7 on-trip assistance."
          />
          <Link
            to="/tours"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky hover:text-navy transition mb-10 shrink-0"
          >
            <span>Browse All Packages</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {tours.loading ? (
          <Skeleton n={6} />
        ) : !tours.data?.items?.length ? (
          <Empty text="No tour packages found." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.data.items.map((t) => (
              <TourCard
                key={t._id}
                t={t}
                onBook={(tour) => setBookingItem(tour)}
                onExplore={(tour) => setDetailTour(tour)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Cab & Taxi Fleet Showcase (NO PRICES) */}
      <section className="mt-24 bg-slate-50 py-20 border-y border-navy/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <SectionHeader
              badge="Comfortable Mountain Travel"
              title="Our Premium Taxi & Cab Fleet"
              subtitle="From compact sedans to luxury Innova Crysta and 17-seater Tempo Travellers, driven by certified hill chauffeurs."
            />
            <Link
              to="/cabs"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky hover:text-navy transition mb-10 shrink-0"
            >
              <span>Explore Full Fleet</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(vehicles.data?.items || []).slice(0, 3).map((v) => (
              <div
                key={v._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={v.image || getVehicleImage(v)}
                    alt={v.name}
                    onError={(e) => { e.target.src = getVehicleImage(v); }}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-navy/90 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                      {v.vehicleType}
                    </span>
                  </div>
                  {v.tag && (
                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold text-navy shadow-md">
                        {v.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-navy group-hover:text-sky transition">{v.name}</h3>
                  <p className="mt-1 text-xs text-navy/70 line-clamp-2">{v.suitability}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-navy/80">
                    <span className="rounded-xl bg-slate-50 p-2 font-medium border border-slate-100 flex items-center gap-1.5">
                      <Users size={14} className="text-sky" /> {v.seatingCapacity}
                    </span>
                    <span className="rounded-xl bg-slate-50 p-2 font-medium border border-slate-100 flex items-center gap-1.5">
                      <Briefcase size={14} className="text-sky" /> {v.luggageCapacity}
                    </span>
                  </div>

                  <div className="mt-auto pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-emerald-600">
                      ✓ Hill Permit Ready
                    </span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://wa.me/916230351337?text=${encodeURIComponent(
                          `Hello Thakur Tour & Travel, I would like to inquire about booking the ${v.name} (${v.seatingCapacity}) for my trip.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-xl bg-[#25D366] text-white px-2.5 py-1.5 text-xs font-bold hover:brightness-105 shadow-sm transition"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare size={13} />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setBookingItem({ name: v.name, vehicle: v })}
                        className="btn-gold !py-1.5 !px-3 text-xs font-bold shadow-md"
                      >
                        Book / Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose Thakur Tour & Travel */}
      <section className="mx-auto mt-24 max-w-7xl px-4">
        <SectionHeader
          badge="Why Choose Us"
          title="The Thakur Tour & Travel Advantage"
          subtitle="We are not just a booking portal; we are local mountain natives who ensure your journey is safe, joyful, and memorable."
          centered
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: '15+ Years Mountain Expertise',
              desc: 'Born and raised in Himachal, our drivers and tour guides know every hairpin bend, scenic shortcut, and weather forecast.'
            },
            {
              icon: Award,
              title: '100% Customized Itineraries',
              desc: 'Flexible day-by-day schedules tailored specifically to your family, pace, hotel category preference, and sightseeing wishlist.'
            },
            {
              icon: Car,
              title: 'Spotless & Well-Maintained Fleet',
              desc: 'Clean, sanitized, GPS-tracked vehicles equipped with mountain heating, music systems, and heavy-duty suspensions.'
            },
            {
              icon: Clock,
              title: '24/7 Dedicated Trip Manager',
              desc: 'From the moment you arrive in Chandigarh or Delhi until your return departure, a dedicated coordinator assists you round-the-clock.'
            },
            {
              icon: Sparkles,
              title: 'Handpicked Verified Hotels',
              desc: 'We personally inspect hotel quality, hygiene, mountain views, and hospitality before recommending them to our guests.'
            },
            {
              icon: CheckCircle2,
              title: 'Zero Hidden Charges Guarantee',
              desc: 'All quotes include tolls, state taxes, driver night allowances, and parking fees. No unexpected surprises on the road.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-navy/10 bg-white p-6 transition duration-300 hover:border-sky/50 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky/15 text-sky mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-xs text-navy/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: How It Works (3 Steps) */}
      <section className="mt-24 bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
            Easy 3-Step Booking
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            How Your Dream Journey Begins
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3 text-left">
            <div className="relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
              <span className="text-3xl font-black text-gold">01</span>
              <h3 className="mt-3 text-lg font-bold">Share Your Travel Dates &amp; Plan</h3>
              <p className="mt-2 text-xs text-white/75 leading-relaxed">
                Click any quote button or message us on WhatsApp with your destination choice, group size, and preferred pickup location.
              </p>
            </div>

            <div className="relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
              <span className="text-3xl font-black text-gold">02</span>
              <h3 className="mt-3 text-lg font-bold">Receive Custom Itinerary &amp; Quote</h3>
              <p className="mt-2 text-xs text-white/75 leading-relaxed">
                Our mountain travel expert prepares a transparent, day-by-day plan with hotel options and all-inclusive pricing in 15 minutes.
              </p>
            </div>

            <div className="relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
              <span className="text-3xl font-black text-gold">03</span>
              <h3 className="mt-3 text-lg font-bold">Confirm &amp; Enjoy Your Tour</h3>
              <p className="mt-2 text-xs text-white/75 leading-relaxed">
                Pay a small advance token to reserve your vehicle &amp; hotel vouchers. Our polite chauffeur welcomes you at the airport/station!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Customer Testimonials & Reviews */}
      <section className="mx-auto mt-24 max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
            <Star size={13} className="text-amber-500 fill-amber-500" />
            <span>4.9 / 5.0 Star Rated on Google Maps</span>
          </div>
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            What Our Travelers Say
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-navy/70 leading-relaxed">
            Real experiences from pilgrims, families, and vacationers who booked station pickups and customized tours with us.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(testimonials.data?.items || []).slice(0, 6).map((rev) => (
            <div
              key={rev._id}
              className="flex flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 shadow-sm hover:shadow-lg transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Verified Google Review
                  </span>
                </div>
                <p className="text-xs text-navy/80 leading-relaxed">
                  "{rev.message}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-gold text-xs font-black">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-navy">{rev.name}</p>
                  <p className="text-[11px] text-navy/60">{rev.location} • <span className="text-sky font-medium">{rev.trip || 'Himachal Tour'}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="mx-auto mt-24 max-w-4xl px-4">
        <SectionHeader
          badge="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about planning, booking, and traveling across Himachal and North India."
          centered
        />

        <div className="mt-8 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-navy/10 bg-white overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-navy text-sm sm:text-base hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-sky shrink-0" /> : <ChevronDown size={18} className="text-navy/40 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 text-xs sm:text-sm text-navy/75 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 8: Bottom Call To Action Banner */}
      <section className="mx-auto mt-24 mb-10 max-w-7xl px-4">
        <div className="rounded-3xl bg-gradient-to-r from-navy via-navy/95 to-sky p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="rounded-full bg-gold px-3.5 py-1 text-xs font-black text-navy uppercase tracking-wider">
              Ready to Explore?
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
              Let's Plan Your Unforgettable Himalayan Holiday
            </h2>
            <p className="mt-2 text-sm text-white/85">
              Talk directly with our local tour planner. Free customized itinerary and guaranteed best custom quote within minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setBookingItem({ title: 'Special Holiday Request' })}
              className="btn-gold !py-3 !px-6 text-sm font-bold justify-center shadow-lg"
            >
              Get Free Custom Quote
            </button>
            <a
              href="https://wa.me/916230351337?text=Hi%20Thakur%20Tour%20%26%20Travel,%20I%20am%20planning%20a%20trip%20and%20need%20a%20quote."
              target="_blank"
              rel="noreferrer"
              className="btn bg-[#25D366] text-white hover:brightness-105 !py-3 !px-5 text-sm font-bold justify-center"
            >
              <MessageSquare size={17} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Modals */}
      {bookingItem && (
        <BookingModal
          tour={bookingItem.itinerary ? bookingItem : null}
          vehicle={bookingItem.vehicle || null}
          destination={bookingItem.initialValues?.destination ? { name: bookingItem.initialValues.destination } : (bookingItem.name ? bookingItem : null)}
          initialValues={bookingItem.initialValues || {}}
          onClose={() => setBookingItem(null)}
        />
      )}

      {detailTour && (
        <TourDetailModal
          tour={detailTour}
          onClose={() => setDetailTour(null)}
          onBook={(t) => {
            setDetailTour(null);
            setBookingItem(t);
          }}
        />
      )}
    </>
  );
}
