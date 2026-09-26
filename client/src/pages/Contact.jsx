import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, Send, Sparkles, ShieldCheck, Star, ExternalLink, Navigation, Train } from 'lucide-react';
import SEO from '../components/SEO';
import { SectionHeader } from '../components/ui';
import api from '../services/axiosClient';
import { addToStore } from '../services/dataStore';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      numberOfPeople: 2,
      destination: 'Amb Andaura Station Pickup & Dharamshala Tour',
      serviceType: 'Cab Rental Only (Station Pickup / Outstation)'
    }
  });

  const [submittedRef, setSubmittedRef] = useState(null);

  const onSubmit = async (data) => {
    const refId = `TTT-INQ-${Date.now().toString().slice(-5)}`;
    try {
      const payload = {
        ...data,
        reference: refId,
        status: 'New',
        numberOfPeople: Number(data.numberOfPeople) || 1
      };
      addToStore('inquiries', payload);
      await api.post('/inquiries', payload).catch(() => {});
      setSubmittedRef(refId);
      reset();
    } catch {
      setSubmittedRef(refId);
    }
  };

  const googleMapsUrl = "https://maps.app.goo.gl/bDZyPwLejw7JTwCe6";

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'Thakur Tour & Travels (Amb Andaura)',
    'image': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    'telephone': '+91 62303 51337',
    'email': 'bookings@thakurtourandtravels.com',
    'hasMap': googleMapsUrl,
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
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '31.6841',
      'longitude': '76.1268'
    }
  };

  return (
    <>
      <SEO
        title="Contact Us & Google Location | Thakur Tour & Travels (Amb Andaura)"
        description="Visit Thakur Tour & Travels at Amb Andaura Railway Station, Himachal Pradesh (PIN 177203). 24/7 Vande Bharat cab pickups, Chintpurni temple tours, Dharamshala & Manali packages. Call +91 62303 51337."
        keywords="thakur tour and travels amb andaura, amb andaura railway station taxi, chintpurni temple taxi, taxi service amb una himachal, himachal cab booking"
        schema={contactSchema}
      />

      {/* Hero Header */}
      <div className="relative bg-navy py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <Train size={14} /> Amb Andaura Railway Station HQ
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
              <Star size={13} fill="currentColor" /> 4.9/5 Google Rated (2,480+ Reviews)
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact Us &amp; Find Us On Google Maps
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
            Headquartered at <strong>Amb Andaura Railway Station (HP)</strong> with fleet hubs across Chandigarh, Shimla, Dharamshala, and Manali. Get in touch for instant station pickups and tailor-made Himachal tours.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Contact Details & Office Addresses (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky">
                Get In Touch Directly
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-navy">
                We’re Here to Assist You 24/7
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-navy/70 leading-relaxed">
                Arriving by Vande Bharat Express or planning a family tour? Our polite chauffeurs and tour coordinators provide punctual, 24/7 mountain assistance.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Primary Head Office Address Card */}
              <div className="rounded-2xl bg-gradient-to-br from-navy to-slate-900 text-white p-5 shadow-lg border border-gold/30">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-gold">
                    <MapPin size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider">Primary Location (Google Maps)</span>
                  </div>
                  <span className="rounded-full bg-gold text-navy text-[10px] font-extrabold px-2 py-0.5">
                    Verified
                  </span>
                </div>
                
                <h3 className="mt-3 text-base font-bold text-white">
                  Thakur Tour &amp; Travels (Amb Andaura)
                </h3>
                <p className="mt-1 text-xs text-white/80 leading-relaxed">
                  Andora Railway Station, Dhandri, Amb, Himachal Pradesh - 177203
                </p>
                <p className="mt-1 text-[11px] text-sky font-medium">
                  ★ Landmark: Direct Cab Stand at Amb Andaura Railway Station (AADR)
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
                  >
                    <Navigation size={14} />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy/60">Phone Numbers</p>
                  <p className="mt-0.5 text-sm font-bold text-navy">
                    <a href="tel:+916230351337" className="hover:text-sky transition">+91 62303 51337</a>
                  </p>
                  <p className="text-xs text-navy/70">+91 62303 51337 (24/7 Booking Helpline)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">WhatsApp Instant Chat</p>
                  <p className="mt-0.5 text-sm font-bold text-navy">
                    <a
                      href="https://wa.me/916230351337?text=Hi%20Thakur%20Tour%20%26%20Travel,%20I%20want%20to%20book%20a%20cab%20/%20tour%20package."
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline"
                    >
                      +91 62303 51337 (Click to Chat)
                    </a>
                  </p>
                  <p className="text-xs text-emerald-900/70">Instant response for train arrivals &amp; tours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy/60">Official Email</p>
                  <p className="mt-0.5 text-sm font-bold text-navy">
                    <a href="mailto:bookings@thakurtourandtravels.com" className="hover:text-sky transition">
                      bookings@thakurtourandtravels.com
                    </a>
                  </p>
                  <p className="text-xs text-navy/70">For corporate tours &amp; hotel reservations</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy/60">Working Hours</p>
                  <p className="mt-0.5 text-sm font-bold text-navy">
                    24x7 Station Pickup &amp; Roadside Assistance
                  </p>
                  <p className="text-xs text-navy/70">Booking Desk: Mon - Sun, 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Regional Hubs */}
            <div className="rounded-3xl bg-navy text-white p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <MapPin size={16} /> Fleet Hubs Across North India
              </h3>
              
              <div className="space-y-3 text-xs text-white/80">
                <div>
                  <p className="font-bold text-white">📍 Amb Andaura Station (Headquarters):</p>
                  <p>Andora Railway Station, Dhandri, Amb, Una HP 177203</p>
                </div>
                <div>
                  <p className="font-bold text-white">📍 Chandigarh Regional Hub:</p>
                  <p>Near ISBT Sector 43 &amp; Airport Road, Chandigarh 160047</p>
                </div>
                <div>
                  <p className="font-bold text-white">📍 Dharamshala &amp; Kangra Branch:</p>
                  <p>Main Temple Road, McLeodganj, Dharamshala, HP 176219</p>
                </div>
                <div>
                  <p className="font-bold text-white">📍 Manali &amp; Shimla Fleet Bases:</p>
                  <p>Mall Road (Shimla) &amp; Aleo Left Bank (Manali, HP)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Custom Quote & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl border border-navy/10 bg-white p-6 sm:p-10 shadow-xl">
              {submittedRef ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-50 text-green-600 mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                    Quote Request Received
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy">
                    We’ve Received Your Inquiry!
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-navy/70 max-w-md mx-auto leading-relaxed">
                    Our tour coordinator will review your preferences and share your customized itinerary + quote on WhatsApp / Phone within 15 minutes.
                  </p>

                  <div className="my-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 max-w-xs mx-auto">
                    <p className="text-[11px] font-bold text-navy/60 uppercase">Inquiry Reference ID</p>
                    <p className="font-mono text-xl font-black text-navy">{submittedRef}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/916230351337?text=Hi%20Thakur%20Tour%20%26%20Travel,%20I%20just%20submitted%20inquiry%20reference%20${submittedRef}.%20Please%20share%20the%20quote.`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn bg-[#25D366] text-white hover:brightness-105 text-xs font-bold"
                    >
                      <MessageSquare size={16} />
                      Fast Confirmation on WhatsApp
                    </a>
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="btn-navy text-xs font-bold"
                    >
                      Submit Another Plan
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                      100% Free Custom Itinerary &amp; Cab Quote
                    </span>
                    <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
                      Request Your Tailored Trip Quote
                    </h2>
                    <p className="mt-1 text-xs text-navy/70">
                      Fill in your preferences below. No hidden fees, guaranteed transparent pricing.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <label className="block text-xs font-semibold text-navy">
                        Your Full Name *
                        <input
                          type="text"
                          placeholder="e.g. Amit Sharma"
                          className="input mt-1 text-sm"
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <span className="text-[11px] text-red-600">{errors.name.message}</span>}
                      </label>

                      <label className="block text-xs font-semibold text-navy">
                        Phone Number (WhatsApp) *
                        <input
                          type="tel"
                          placeholder="+91 98123 45678"
                          className="input mt-1 text-sm"
                          {...register('phone', { required: 'Phone is required' })}
                        />
                        {errors.phone && <span className="text-[11px] text-red-600">{errors.phone.message}</span>}
                      </label>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <label className="block text-xs font-semibold text-navy">
                        Email Address
                        <input
                          type="email"
                          placeholder="name@example.com"
                          className="input mt-1 text-sm"
                          {...register('email')}
                        />
                      </label>

                      <label className="block text-xs font-semibold text-navy">
                        Destination / Tour Route
                        <select className="input mt-1 text-sm" {...register('destination')}>
                          <option value="Amb Andaura Station Pickup to Dharamshala / McLeodganj">Amb Andaura Station Pickup to Dharamshala</option>
                          <option value="Chintpurni & Jawala Ji Shaktipeeth Temple Tour">Chintpurni &amp; Jawala Ji Pilgrimage</option>
                          <option value="Shimla & Manali Panorama (6 Days)">Shimla &amp; Manali (6 Days)</option>
                          <option value="Complete Grand Himachal Circuit (9 Days)">Grand Himachal + Amritsar (9 Days)</option>
                          <option value="Spiti Valley Expedition (8-10 Days)">Spiti Valley Grand Road Trip</option>
                          <option value="Manali Honeymoon Special (5 Days)">Manali Honeymoon Special</option>
                          <option value="Dharamshala, Dalhousie & Khajjiar (5 Days)">Dharamshala &amp; Dalhousie</option>
                          <option value="Amritsar & Wagah Border (2 Days)">Amritsar 2-Day Getaway</option>
                          <option value="Outstation Cab Rental (Custom Route)">Outstation Cab Rental (Custom)</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <label className="block text-xs font-semibold text-navy">
                        Travel / Arrival Date
                        <input
                          type="date"
                          className="input mt-1 text-xs"
                          {...register('travelDate')}
                        />
                      </label>

                      <label className="block text-xs font-semibold text-navy">
                        Number of Travelers
                        <input
                          type="number"
                          min="1"
                          className="input mt-1 text-xs"
                          {...register('numberOfPeople')}
                        />
                      </label>

                      <label className="col-span-2 sm:col-span-1 block text-xs font-semibold text-navy">
                        Pickup Point
                        <input
                          type="text"
                          placeholder="Amb Andaura / Chandigarh / Delhi"
                          className="input mt-1 text-xs"
                          {...register('pickupLocation')}
                        />
                      </label>
                    </div>

                    <label className="block text-xs font-semibold text-navy">
                      Service Type Required
                      <select className="input mt-1 text-sm" {...register('serviceType')}>
                        <option value="Station Pickup (Amb Andaura / Chandigarh)">Railway Station / Airport Pickup</option>
                        <option value="Complete Holiday Package (Cab + Hotel + Sightseeing)">Complete Holiday Package (Cab + Hotel + Sightseeing)</option>
                        <option value="Cab Rental Only (Dzire / Innova / Tempo Traveller)">Cab Rental Only (Dedicated Car + Driver)</option>
                        <option value="Temple / Pilgrimage Yatra (Chintpurni, Jawala Ji, Baglamukhi)">Temple / Pilgrimage Yatra</option>
                        <option value="Custom Honeymoon Arrangement">Custom Honeymoon Arrangement</option>
                      </select>
                    </label>

                    <label className="block text-xs font-semibold text-navy">
                      Special Requests / Train Details
                      <textarea
                        rows="3"
                        placeholder="Mention train name (e.g. Vande Bharat Express), hotel preferences, senior citizen care, snow activities..."
                        className="input mt-1 text-xs"
                        {...register('message')}
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold w-full !py-3.5 text-sm font-bold shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send size={16} />
                      <span>{isSubmitting ? 'Sending Request…' : 'Submit & Receive Free Custom Quote'}</span>
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[11px] text-navy/60 pt-2">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={13} className="text-emerald-600" /> 100% Privacy Assured
                      </span>
                      <span>•</span>
                      <span>Zero Spam Guaranteed</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Google Map Section */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-navy/15 bg-white shadow-xl">
          <div className="border-b border-navy/10 bg-navy p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
                <MapPin size={16} /> Live Google Maps Location
              </div>
              <h3 className="mt-1 text-xl font-extrabold text-white">
                Thakur Tour &amp; Travels — Amb Andaura Railway Station
              </h3>
              <p className="mt-0.5 text-xs text-white/80">
                Andora Railway Station, Dhandri, Amb, Himachal Pradesh 177203
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold !py-2.5 !px-5 text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Navigation size={15} />
                <span>Open in Google Maps App</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="relative aspect-[16/7] w-full min-h-[380px] bg-slate-100">
            <iframe
              title="Thakur Tour & Travels Amb Andaura Location"
              src="https://maps.google.com/maps?q=thakur_tours_travel_amb_andaura,Andora+Railway+Station,Dhandri,Amb,Himachal+Pradesh+177203&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {/* Google Maps Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-50 border-t border-slate-200 text-xs text-navy/80">
            <div>
              <p className="font-bold text-navy flex items-center gap-1 text-amber-700">
                <Star size={14} fill="currentColor" /> 4.9 / 5.0 Rating
              </p>
              <p className="text-[11px] text-navy/60 mt-0.5">2,480+ Google reviews</p>
            </div>
            <div>
              <p className="font-bold text-navy">🚆 Vande Bharat Terminal</p>
              <p className="text-[11px] text-navy/60 mt-0.5">Instant platform exit cab pickup</p>
            </div>
            <div>
              <p className="font-bold text-navy">🛕 Shaktipeeth Circuits</p>
              <p className="text-[11px] text-navy/60 mt-0.5">Chintpurni, Jawala Ji, Kangra</p>
            </div>
            <div>
              <p className="font-bold text-navy">⏱️ 24/7 Availability</p>
              <p className="text-[11px] text-navy/60 mt-0.5">Late-night train pickup guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
