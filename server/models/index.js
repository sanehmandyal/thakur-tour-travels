const mongoose = require('mongoose');
const slugify = require('../utils/slugify');
const { Schema } = mongoose;
const T = { timestamps: true };
const S = { type: String, trim: true };
const withSlug = (schema, src) => {
  schema.add({ slug: { type: String, unique: true, sparse: true, index: true } });
  schema.pre('validate', function (n) { if (!this.slug && this[src]) this.slug = slugify(this[src]); n(); });
  return schema;
};
const M = (name, schema) => mongoose.models[name] || mongoose.model(name, schema);

exports.Destination = M('Destination', withSlug(new Schema({
  name: { ...S, required: true }, shortDescription: S, description: S, location: S, state: S, country: { ...S, default: 'India' },
  images: [String], thumbnail: S, price: { type: Number, default: 0 }, duration: S, bestTimeToVisit: S,
  highlights: [String], inclusions: [String], exclusions: [String],
  isFeatured: { type: Boolean, default: false }, isActive: { type: Boolean, default: true }, seoTitle: S, seoDescription: S
}, T), 'name'));

exports.Tour = M('Tour', withSlug(new Schema({
  title: { ...S, required: true }, destination: { type: Schema.Types.ObjectId, ref: 'Destination' }, description: S, shortDescription: S,
  images: [String], thumbnail: S, duration: S, price: { type: Number, required: true }, discountPrice: Number,
  category: { ...S, enum: ['Himachal Tours','Punjab Tours','Chandigarh Tours','North India Tours','Family Tours','Honeymoon Tours','Adventure Tours','Weekend Trips','Custom Tours'] },
  highlights: [String], itinerary: [{ day: Number, title: S, description: S }], inclusions: [String], exclusions: [String],
  pickupLocation: S, dropLocation: S, availableDates: [Date], maxTravelers: { type: Number, default: 12 },
  isFeatured: { type: Boolean, default: false }, isActive: { type: Boolean, default: true }, seoTitle: S, seoDescription: S
}, T), 'title'));

exports.Vehicle = M('Vehicle', new Schema({
  name: { ...S, required: true }, vehicleType: { ...S, enum: ['Hatchback','Sedan','SUV','Innova','Tempo Traveller','Luxury Car','Bus'] },
  brand: S, model: S, seatingCapacity: Number, luggageCapacity: S, pricePerKm: Number, pricePerDay: Number, image: S, features: [String],
  isAvailable: { type: Boolean, default: true }, isActive: { type: Boolean, default: true }
}, T));

exports.Booking = M('Booking', new Schema({
  reference: { type: String, unique: true }, user: { type: Schema.Types.ObjectId, ref: 'User' },
  customerName: { ...S, required: true }, email: S, phone: { ...S, required: true },
  tour: { type: Schema.Types.ObjectId, ref: 'Tour' }, vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
  pickupLocation: S, dropLocation: S, travelDate: { type: Date, required: true }, returnDate: Date, numberOfTravelers: { type: Number, default: 1, min: 1 },
  specialRequest: S, totalAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending','Confirmed','Cancelled','Completed'], default: 'Pending' },
  paymentStatus: { type: String, enum: ['Unpaid','Partial','Paid'], default: 'Unpaid' }, isRead: { type: Boolean, default: false }
}, T));

exports.Inquiry = M('Inquiry', new Schema({
  name: { ...S, required: true }, email: S, phone: { ...S, required: true }, subject: S, message: S, travelDate: Date, destination: S, numberOfPeople: Number,
  status: { type: String, enum: ['New','Contacted','Resolved'], default: 'New' }, adminNotes: S, isRead: { type: Boolean, default: false }
}, T));

exports.Testimonial = M('Testimonial', new Schema({
  name: { ...S, required: true }, location: S, rating: { type: Number, min: 1, max: 5, default: 5 }, message: { ...S, required: true }, profileImage: S,
  isPublished: { type: Boolean, default: false }
}, T));

exports.Gallery = M('Gallery', new Schema({ title: S, image: { ...S, required: true }, category: S, description: S, isFeatured: { type: Boolean, default: false } }, T));

exports.Blog = M('Blog', withSlug(new Schema({
  title: { ...S, required: true }, featuredImage: S, author: S, category: S, content: S, tags: [String], seoTitle: S, seoDescription: S, published: { type: Boolean, default: false }
}, T), 'title'));

exports.Settings = M('Settings', new Schema({
  companyName: { ...S, default: 'Thakur Tour & Travel' }, logo: S, phone: S, whatsapp: S, email: S, address: S, googleMapUrl: S,
  facebook: S, instagram: S, youtube: S, twitter: S, about: S, footerText: S, workingHours: S
}, T));
