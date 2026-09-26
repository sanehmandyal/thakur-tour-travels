import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, CheckCircle2, Phone, MessageSquare, Calendar, Users, MapPin, Sparkles, Car, Building2 } from 'lucide-react';
import api from '../services/axiosClient';

import { addToStore } from '../services/dataStore';

export default function BookingModal({ tour, vehicle, destination, initialValues = {}, onClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      numberOfTravelers: initialValues?.numberOfTravelers || 2,
      numberOfChildren: initialValues?.numberOfChildren || 0,
      travelDate: initialValues?.travelDate || '',
      hotelCategory: 'Deluxe (3-Star / 4-Star)',
      vehiclePreference: vehicle?.name || 'Innova Crysta / Ertiga SUV',
      pickupLocation: initialValues?.pickupLocation || 'Amb Andaura Railway Station'
    }
  });

  const [done, setDone] = useState(null);
  const title = initialValues?.destination || tour?.title || vehicle?.name || destination?.name || 'Custom Himachal Holiday';

  const submit = async (d) => {
    const ref = `TTT-${Date.now().toString().slice(-6)}`;
    try {
      const payload = {
        ...d,
        reference: ref,
        customerName: d.fullName || d.name || 'Guest Traveler',
        tourTitle: title,
        status: 'Pending',
        numberOfTravelers: Number(d.numberOfTravelers) || 1,
        numberOfChildren: Number(d.numberOfChildren) || 0,
        tour: tour?._id?.startsWith('tour-') ? undefined : tour?._id,
        vehicle: vehicle?._id?.startsWith('veh-') ? undefined : vehicle?._id,
        subject: `Trip Quote Request: ${title}`
      };

      addToStore('bookings', payload);

      const { data } = await api.post('/bookings', payload).catch(() => ({
        data: { reference: ref }
      }));

      setDone(data.reference || ref);
    } catch {
      setDone(ref);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Thakur Tour & Travel, I just submitted a quote request for: ${title}. My Reference is: ${done || 'NEW'}. Please share the customized itinerary and quote on WhatsApp.`
  );

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 grid place-items-center text-navy/70 hover:bg-slate-200 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-50 text-green-600 mb-4">
              <CheckCircle2 size={36} />
            </div>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              Request Received
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">
              Thank You!
            </h2>
            <p className="mt-2 text-sm text-navy/70 max-w-md mx-auto">
              Your customized travel itinerary request for <b className="text-navy">{title}</b> has been received. Our mountain trip specialist is preparing your best quote.
            </p>

            <div className="my-6 rounded-2xl bg-slate-50 border border-navy/10 p-4">
              <p className="text-xs text-navy/60 uppercase font-semibold tracking-wider">
                Your Booking Reference
              </p>
              <p className="mt-1 font-mono text-2xl font-black text-navy">
                {done}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/916230351337?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="btn bg-[#25D366] text-white hover:brightness-105 shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} />
                Get Instant Quote on WhatsApp
              </a>
              <button onClick={onClose} className="btn-navy">
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-block rounded-full bg-sky/15 px-3 py-1 text-xs font-bold text-sky mb-2">
                100% Free Tailored Quote
              </span>
              <h2 className="text-2xl font-extrabold text-navy">
                Plan Your Journey: {title}
              </h2>
              <p className="text-xs text-navy/70 mt-1">
                Fill details below for an all-inclusive customized package & cab quote with zero obligations.
              </p>
            </div>

            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-navy">
                  Your Full Name *
                  <input
                    type="text"
                    className="input mt-1 text-sm"
                    placeholder="e.g. Rahul Sharma"
                    {...register('customerName', { required: 'Name is required' })}
                  />
                  {errors.customerName && <span className="text-[11px] text-red-600">{errors.customerName.message}</span>}
                </label>

                <label className="block text-xs font-semibold text-navy">
                  Phone Number (WhatsApp) *
                  <input
                    type="tel"
                    className="input mt-1 text-sm"
                    placeholder="+91 98123 45678"
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  {errors.phone && <span className="text-[11px] text-red-600">{errors.phone.message}</span>}
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-navy">
                  Email Address
                  <input
                    type="email"
                    className="input mt-1 text-sm"
                    placeholder="name@example.com"
                    {...register('email')}
                  />
                </label>

                <label className="block text-xs font-semibold text-navy">
                  Pickup Location
                  <select className="input mt-1 text-sm" {...register('pickupLocation')}>
                    <option value="Chandigarh (Airport / Railway Station)">Chandigarh (Airport / Rly)</option>
                    <option value="New Delhi (Airport / Railway Station)">New Delhi (Airport / Rly)</option>
                    <option value="Kalka Railway Station">Kalka Railway Station</option>
                    <option value="Ambala Cantt">Ambala Cantt</option>
                    <option value="Amritsar">Amritsar</option>
                    <option value="Shimla">Shimla</option>
                    <option value="Manali">Manali</option>
                    <option value="Other / Custom">Other (Mention in notes)</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <label className="block text-xs font-semibold text-navy">
                  Travel Date *
                  <input
                    type="date"
                    className="input mt-1 text-xs"
                    {...register('travelDate', { required: 'Travel date is required' })}
                  />
                  {errors.travelDate && <span className="text-[10px] text-red-600">{errors.travelDate.message}</span>}
                </label>

                <label className="block text-xs font-semibold text-navy">
                  Adults
                  <input
                    type="number"
                    min="1"
                    className="input mt-1 text-xs"
                    {...register('numberOfTravelers')}
                  />
                </label>

                <label className="block text-xs font-semibold text-navy">
                  Children
                  <input
                    type="number"
                    min="0"
                    className="input mt-1 text-xs"
                    {...register('numberOfChildren')}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-navy">
                  Hotel Stay Preference
                  <select className="input mt-1 text-sm" {...register('hotelCategory')}>
                    <option value="Standard (3-Star)">Standard (Comfortable 3-Star)</option>
                    <option value="Deluxe (4-Star / Mountain View)">Deluxe (4-Star / Scenic View)</option>
                    <option value="Luxury (5-Star / Boutique Resort)">Luxury (5-Star / Boutique Resort)</option>
                    <option value="Cab Only (No Hotel Required)">Cab Only (No Hotel Needed)</option>
                  </select>
                </label>

                <label className="block text-xs font-semibold text-navy">
                  Vehicle Preference
                  <select className="input mt-1 text-sm" {...register('vehiclePreference')}>
                    <option value="Sedan (Dzire / Etios) - Up to 4 Guests">Sedan (Dzire / Etios - 4 Guests)</option>
                    <option value="SUV (Innova Crysta) - 6 to 7 Guests">SUV (Innova Crysta - 6-7 Guests)</option>
                    <option value="SUV (Ertiga) - 5 to 6 Guests">SUV (Ertiga - 5-6 Guests)</option>
                    <option value="Tempo Traveller (12 Seater Luxury)">Tempo Traveller (12 Seater)</option>
                    <option value="Tempo Traveller (17 / 26 Seater)">Tempo Traveller (17 / 26 Seater)</option>
                    <option value="Luxury Force Urbania">Force Urbania VIP Van</option>
                  </select>
                </label>
              </div>

              <label className="block text-xs font-semibold text-navy">
                Special Requests or Custom Itinerary Needs
                <textarea
                  rows="2"
                  className="input mt-1 text-xs"
                  placeholder="e.g. Honeymoon room decoration, Rohtang snow pass assistance, senior citizen ground floor rooms..."
                  {...register('specialRequest')}
                />
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-3 text-sm font-bold shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request…' : 'Submit & Get Custom Quote (100% Free)'}
                </button>
                <p className="mt-2 text-center text-[11px] text-navy/60">
                  🔒 We respect your privacy. No spam. You will receive customized quotes via WhatsApp / Phone.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
