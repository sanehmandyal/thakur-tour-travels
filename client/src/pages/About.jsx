import { useState } from 'react';
import { ShieldCheck, Award, Users, HeartHandshake, CheckCircle2, Star, Sparkles, MapPin, Phone, MessageSquare, Clock, Car } from 'lucide-react';
import SEO from '../components/SEO';
import { SectionHeader } from '../components/ui';
import BookingModal from '../components/BookingModal';

export default function About() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'TravelAgency',
      'name': 'Thakur Tour & Travels (Amb Andaura)',
      'description': 'Trusted travel operator and cab rental specialist headquartered at Amb Andaura Railway Station, Himachal Pradesh (PIN 177203).',
      'foundingDate': '2010',
      'hasMap': 'https://maps.app.goo.gl/bDZyPwLejw7JTwCe6',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '2480'
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Andora Railway Station, Dhandri',
        'addressLocality': 'Amb',
        'addressRegion': 'Himachal Pradesh',
        'postalCode': '177203',
        'addressCountry': 'IN'
      }
    }
  };

  return (
    <>
      <SEO
        title="About Us & Amb Andaura Hub | Thakur Tour & Travels"
        description="Learn about Thakur Tour & Travels - 15+ years of trusted operations based at Amb Andaura Railway Station, Himachal Pradesh. 24/7 Vande Bharat pickups, Chintpurni darshan tours, and Himachal road trips."
        keywords="about thakur tour and travels amb andaura, amb andaura cab service, taxi amb una himachal, best tour agency himachal"
        schema={aboutSchema}
      />

      {/* Hero Header */}
      <div className="relative bg-navy py-16 sm:py-24 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
            Our Story &amp; Heritage
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Crafting Unforgettable Mountain Memories Since 2010
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
            Headquartered directly at <strong>Amb Andaura Railway Station (HP)</strong>, our mission is to deliver authentic, safe, and joyful Himalayan journeys with true local warmth and punctuality.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 space-y-20">
        {/* Story Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky">
              Local Expertise You Can Rely On
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-navy leading-snug">
              The Gateway to Devbhoomi: Station Stand to High Himalayas
            </h2>
            <div className="mt-5 space-y-4 text-xs sm:text-sm text-navy/75 leading-relaxed">
              <p>
                <strong>Thakur Tour &amp; Travels</strong> was established right at the strategic rail gateway of Himachal Pradesh — <strong>Amb Andaura Railway Station (AADR)</strong>. With the advent of key superfast trains including the Vande Bharat Express and Himachal Express, Amb Andaura became the prime entry point for pilgrims and holidaymakers traveling into the state.
              </p>
              <p>
                From an initial fleet of local taxis serving Mata Chintpurni, Jawala Ji, and Kangra temples, we have grown into a premier fleet of over 50 commercial vehicles (Maruti Dzire, Innova Crysta, Scorpio 4x4, and Maharaja Tempo Travellers) operating full holiday circuits across Dharamshala, McLeodganj, Dalhousie, Manali, Shimla, Spiti Valley, and Chandigarh.
              </p>
              <p>
                Rated <strong>4.9 / 5.0 Stars on Google Maps</strong> by more than 2,480+ happy travelers, we take immense pride in guaranteed on-time train platform pickups, clean sanitized vehicles, and respectful, mountain-certified chauffeurs.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="btn-gold !py-3 !px-6 text-xs font-bold shadow-lg"
              >
                Plan a Custom Trip with Us
              </button>
              <a
                href="https://maps.app.goo.gl/bDZyPwLejw7JTwCe6"
                target="_blank"
                rel="noreferrer"
                className="btn-navy !py-3 !px-6 text-xs font-bold shadow-md inline-flex items-center gap-2"
              >
                <MapPin size={15} className="text-gold" />
                <span>Find Us on Google Maps</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic Shimla hills and road trip"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 sm:absolute sm:bottom-4 sm:left-4 rounded-2xl bg-white p-4 shadow-xl border border-navy/10 max-w-xs">
              <div className="flex items-center gap-2 text-gold">
                <Star size={16} fill="currentColor" />
                <span className="font-extrabold text-navy text-sm sm:text-base">4.9 / 5 on Google</span>
              </div>
              <p className="mt-1 text-[11px] text-navy/70">Based on 2,480+ verified traveler reviews on Google Maps &amp; travel portals.</p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <section>
          <SectionHeader
            badge="Our Guiding Values"
            title="The Pillars of Every Thakur Tour"
            subtitle="How we consistently deliver superior travel experiences across Himachal and North India."
            centered
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Mountain Safety Above All',
                desc: 'Mountain roads require respect and skill. Our drivers undergo rigorous high-altitude driving assessments and all cabs are mechanically inspected before every departure.'
              },
              {
                icon: Award,
                title: 'Zero Hidden Charges',
                desc: 'We quote all-inclusive prices with toll taxes, state permits, driver allowances, and fuel upfront. You will never encounter surprise demands on the road.'
              },
              {
                icon: HeartHandshake,
                title: 'Personalized Hospitality',
                desc: 'From arranging quiet valley-view rooms away from noise to managing special dietary preferences or honeymoon surprises, we tailor every detail.'
              },
              {
                icon: Clock,
                title: '24/7 Dedicated Trip Concierge',
                desc: 'Whenever you need assistance—be it weather updates, route changes, or medical advice—our coordinator is just a phone call away.'
              },
              {
                icon: Car,
                title: 'Pristine & Sanitized Fleet',
                desc: 'All vehicles feature working climate control, Bluetooth audio, phone charging stations, ample luggage carriers, and pushback comfort seating.'
              },
              {
                icon: Sparkles,
                title: 'Authentic Local Insights',
                desc: 'Enjoy secret viewpoints, local dhaba recommendations, and cultural folklore that big commercial aggregators miss completely.'
              }
            ].map((pillar, i) => (
              <div
                key={i}
                className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm hover:shadow-xl transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/20 text-navy mb-4">
                  <pillar.icon size={24} className="text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy">{pillar.title}</h3>
                <p className="mt-2 text-xs text-navy/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones and Stats Banner */}
        <section className="rounded-3xl bg-navy text-white p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-black text-gold">15+</p>
              <p className="mt-2 text-xs sm:text-sm text-white/80 font-semibold">Years of Operational Excellence</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-gold">12,500+</p>
              <p className="mt-2 text-xs sm:text-sm text-white/80 font-semibold">Completed Custom Tours</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-gold">50+</p>
              <p className="mt-2 text-xs sm:text-sm text-white/80 font-semibold">Dedicated Commercial Cabs</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-gold">98.8%</p>
              <p className="mt-2 text-xs sm:text-sm text-white/80 font-semibold">Customer Retention &amp; Referrals</p>
            </div>
          </div>
        </section>

        {/* Team and Driver Pledge */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky">
              Our Chauffeur Promise
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy">
              Certified Mountain Chauffeurs You Can Trust With Your Family
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-navy/75 leading-relaxed">
              Every driver associated with Thakur Tour &amp; Travel is police-verified, non-smoking, strictly disciplined against rash driving, and trained in courteous customer communication. They do not just drive; they act as your trusted local friend throughout the journey.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs text-navy/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Zero alcohol tolerance policy on duty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Fluent in Hindi, Punjabi &amp; Basic English</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Expertise in snow-chains &amp; high passes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Punctual doorstep pickup &amp; luggage assistance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {quoteOpen && (
        <BookingModal
          onClose={() => setQuoteOpen(false)}
        />
      )}
    </>
  );
}
