require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const M = require('../models');

const img = (url) => url;

(async () => {
  if (!process.env.MONGO_URI || !/^mongodb(?:\+srv)?:\/\//.test(process.env.MONGO_URI)) {
    throw new Error('Set MONGO_URI in server/.env to a valid MongoDB URI.');
  }
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.env.ADMIN_EMAIL || 'admin@thakurtourandtravels.com';
  
  if (!(await User.findOne({ email }))) {
    await User.create({
      name: process.env.ADMIN_NAME || 'Sunil Thakur (Admin)',
      email,
      password: process.env.ADMIN_PASSWORD || 'Thakur@2026Admin',
      role: 'admin'
    });
  }

  await M.Settings.deleteMany({});
  await M.Settings.create({
    companyName: 'Thakur Tour & Travels',
    tagline: 'Amb Andaura Railway Station Cab Pickup & Himachal Tour Packages',
    phone: '+91 62303 51337',
    phoneSecondary: '+91 62303 51337',
    whatsapp: '916230351337',
    email: 'bookings@thakurtourandtravels.com',
    address: 'Andora Railway Station, Dhandri, Amb, Himachal Pradesh - 177203',
    googleMapsUrl: 'https://maps.app.goo.gl/bDZyPwLejw7JTwCe6?g_st=aw',
    workingHours: 'Open 24/7 for Train Arrivals & Roadside Support | Office: 8:00 AM - 10:00 PM',
    about: 'Thakur Tour & Travels (Amb Andaura) is a premier tour operator and taxi provider based right at Amb Andaura Railway Station, Himachal Pradesh (PIN 177203). We specialize in 24/7 station cab pickups, pilgrimage tours (Chintpurni, Jawala Ji), and customized holiday packages across Himachal and North India.',
    footerText: '© 2026 Thakur Tour & Travels. All rights reserved. Government Approved Fleet Partner.'
  });

  // Seed Destinations
  // Seed Destinations
  await M.Destination.deleteMany({});
  const dests = await M.Destination.create([
    {
      name: 'Mata Chintpurni Devi Temple',
      state: 'Himachal Pradesh',
      location: 'Una District (Near Amb Andaura)',
      shortDescription: 'Sacred Maa Chhinnamastika 51 Shaktipeeth, accessible in 25 mins from Amb Andaura Station.',
      description: 'Mata Chintpurni Temple is the holy abode where devotees pray for wish fulfillment. Directly accessible from Amb Andaura Station with 24/7 cab services.',
      thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      duration: '1 - 2 Days',
      bestTimeToVisit: 'Throughout the year',
      highlights: ['Maa Chhinnamastika Sanctum Darshan', 'Ancient Banyan Tree', 'Direct 25-Min Cab Pickup from Amb Andaura'],
      isFeatured: true
    },
    {
      name: 'Mata Jawala Ji Temple',
      state: 'Himachal Pradesh',
      location: 'Kangra District',
      shortDescription: 'Sacred Shaktipeeth renowned for nine eternal natural flames burning without fuel.',
      description: 'Jwalamukhi Temple is dedicated to the Goddess of Divine Light and Flames, featuring 9 continuous natural holy flames in a rock cave.',
      thumbnail: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      duration: '1 - 2 Days',
      bestTimeToVisit: 'Throughout the year',
      highlights: ['9 Divine Eternal Natural Flames', 'Gorakh Dibbi Sacred Pond', 'Golden Canopy'],
      isFeatured: true
    },
    {
      name: 'Mata Chamunda Devi & Kangra Fort',
      state: 'Himachal Pradesh',
      location: 'Kangra Valley',
      shortDescription: 'Fierce Goddess shrine along Baner River overlooking snow-clad Dhauladhar peaks.',
      description: 'Chamunda Nandikeshwar Dham combines profound spirituality with visits to historic Kangra Fort and Bajreshwari Kangra Devi Temple.',
      thumbnail: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80',
      duration: '2 - 3 Days',
      bestTimeToVisit: 'September to June',
      highlights: ['Maa Chamunda Sanctum Darshan', 'Historic Kangra Fort', 'Bajreshwari Temple'],
      isFeatured: true
    },
    {
      name: 'Mata Baglamukhi & Baijnath Shiv Temple',
      state: 'Himachal Pradesh',
      location: 'Kangra Valley',
      shortDescription: 'Miraculous Pitambara Peeth and ancient 1204 AD Vaidyanath Jyotirlinga Stone Temple.',
      description: 'Mata Baglamukhi Temple worshipped for victory and protection, combined with the 800-year-old Nagara stone masterpiece Baijnath Shiva Temple.',
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      duration: '1 - 2 Days',
      bestTimeToVisit: 'Throughout the year',
      highlights: ['Mata Baglamukhi Havan Peeth', '1204 AD Ancient Baijnath Stone Architecture', 'Palampur Tea Gardens'],
      isFeatured: true
    },
    {
      name: 'Amritsar Golden Temple & Wagah Border',
      state: 'Punjab',
      location: 'Majha Region',
      shortDescription: 'The Golden Temple (Sri Harmandir Sahib), holy Sarovar, and patriotic Wagah Border ceremony.',
      description: 'Amritsar is the spiritual heart of Sikhism with the glistening Golden Temple, round-the-clock Guru Ka Langar, and Wagah Border retreat.',
      thumbnail: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
      duration: '2 - 3 Days',
      bestTimeToVisit: 'October to March',
      highlights: ['Golden Temple (Harmandir Sahib)', 'Wagah Border Retreat Ceremony', 'Jallianwala Bagh'],
      isFeatured: true
    },
    {
      name: 'Manikaran Sahib Gurudwara & Hot Springs',
      state: 'Himachal Pradesh',
      location: 'Parvati Valley (Kullu)',
      shortDescription: 'Sacred Sikh & Hindu pilgrimage famed for natural therapeutic boiling sulphur springs.',
      description: 'Located in Parvati Valley, Manikaran Sahib is sacred to Guru Nanak Dev Ji and Lord Shiva, featuring healing natural hot springs.',
      thumbnail: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      duration: '2 - 3 Days',
      bestTimeToVisit: 'March to November',
      highlights: ['Gurudwara Shri Manikaran Sahib', 'Natural Sulphur Hot Springs', 'Parvati River Valley'],
      isFeatured: true
    },
    {
      name: 'Takht Sri Kesgarh Sahib & Naina Devi',
      state: 'Punjab / Himachal Pradesh',
      location: 'Anandpur Sahib & Bilaspur',
      shortDescription: 'Birthplace of the Khalsa (Takht Sri Kesgarh) and sacred hilltop Naina Devi Temple.',
      description: 'Anandpur Sahib where Guru Gobind Singh Ji created the Khalsa, paired with hilltop Maa Naina Devi overlooking Gobind Sagar Lake.',
      thumbnail: 'https://images.unsplash.com/photo-1565019004944-9f798835848c?auto=format&fit=crop&w=1200&q=80',
      duration: '1 - 2 Days',
      bestTimeToVisit: 'Throughout the year',
      highlights: ['Takht Sri Kesgarh Sahib', 'Virasat-e-Khalsa Museum', 'Mata Naina Devi Temple & Ropeway'],
      isFeatured: true
    },
    {
      name: 'Manali, Solang Valley & Hadimba Temple',
      state: 'Himachal Pradesh',
      location: 'Kullu Valley',
      shortDescription: 'Ancient Hadimba Temple, snow peaks, Solang Valley, and Atal Tunnel.',
      description: 'Premier Himalayan gateway for snow sports, ancient pine forests, and Atal Tunnel road trips.',
      thumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      duration: '4 - 6 Days',
      bestTimeToVisit: 'Throughout the year',
      highlights: ['Hadimba Devi Temple', 'Solang Valley Snow Point', 'Atal Tunnel & Sissu', 'Rohtang Pass'],
      isFeatured: true
    },
    {
      name: 'Shimla, Kufri & Jakhu Hanuman Temple',
      state: 'Himachal Pradesh',
      location: 'Shimla District',
      shortDescription: '108ft giant Jakhu Hill Hanuman statue, Mall Road, and Kufri pine vistas.',
      description: 'Shimla retains colonial charm with Christ Church, the Ridge, and the high-altitude Jakhu Temple overlooking snow peaks.',
      thumbnail: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
      duration: '3 - 4 Days',
      bestTimeToVisit: 'March to June & Dec to Feb',
      highlights: ['Jakhu Temple (108ft Hanuman Statue)', 'The Ridge & Mall Road', 'Kufri Snow Park', 'Tara Devi Temple'],
      isFeatured: true
    },
    {
      name: 'Dharamshala, McLeodganj & Dalai Lama Temple',
      state: 'Himachal Pradesh',
      location: 'Kangra Valley',
      shortDescription: 'Tibetan spiritual culture, Dalai Lama Temple, Bhagsunag Shiva Mandir, and Dhauladhars.',
      description: 'Surrounded by cedar forests, Dharamshala is home to the Dalai Lama, Tibetan monasteries, and peaceful mountain temples.',
      thumbnail: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
      duration: '3 - 5 Days',
      bestTimeToVisit: 'September to June',
      highlights: ['Dalai Lama Temple Complex', 'Bhagsunag Shiv Mandir & Waterfall', 'HPCA Cricket Stadium'],
      isFeatured: true
    },
    {
      name: 'Spiti Valley, Key Monastery & Tabo',
      state: 'Himachal Pradesh',
      location: 'Lahaul & Spiti',
      shortDescription: 'Cold mountain desert, 1,000-year-old Buddhist monasteries, and Chandratal Moon Lake.',
      description: 'High-altitude desert wonderland featuring ancient Tibetan gompas and starry night skies.',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      duration: '7 - 10 Days',
      bestTimeToVisit: 'May to October',
      highlights: ['Key Monastery', 'Tabo Ancient Gompa', 'Chandratal Lake', 'Hikkim Highest Post Office'],
      isFeatured: true
    },
    {
      name: 'Dalhousie, Khajjiar & Chamba Temples',
      state: 'Himachal Pradesh',
      location: 'Chamba District',
      shortDescription: 'The "Mini Switzerland of India", 10th-century Chamba Laxmi Narayan stone temples.',
      description: 'A tranquil high-altitude hill station boasting colonial bungalows, Khajjiar meadow, and ancient Chamba shrines.',
      thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      duration: '3 - 4 Days',
      bestTimeToVisit: 'March to November',
      highlights: ['Khajjiar Meadow & Lake', 'Chamba 10th Century Temples', 'Dainkund Peak'],
      isFeatured: true
    }
  ]);

  // Seed / Refresh Vehicles with Real Verified Local Images
  await M.Vehicle.deleteMany({});
  await M.Vehicle.create([
    {
      name: 'Toyota Innova Crysta 2.4 ZX',
      vehicleType: 'Innova',
      seatingCapacity: 7,
      luggageCapacity: '4 Large Bags + Roof Carrier',
      image: '/images/cars/innova_crysta.jpg',
      features: ['Reclining Captain Seats', 'Triple Zone Independent AC', 'Superior Mountain Suspension', 'Roof Luggage Carrier'],
      isAvailable: true
    },
    {
      name: 'Toyota Innova Hycross Hybrid',
      vehicleType: 'Innova',
      seatingCapacity: 7,
      luggageCapacity: '4 Large Bags',
      image: '/images/cars/hycross.jpg',
      features: ['Ottoman Powered Recliners', 'Panoramic Sunroof', 'Silent Hybrid Drive', 'VIP Interior'],
      isAvailable: true
    },
    {
      name: 'Mahindra Thar 4x4 Hardtop',
      vehicleType: 'SUV',
      seatingCapacity: 4,
      luggageCapacity: '2 Duffel Bags',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      features: ['True 4x4 Low-Ratio Gearbox', 'All-Terrain Snow Tires', 'High Ground Clearance', 'Spiti & Rohtang Snow Certified'],
      isAvailable: true
    },
    {
      name: 'Mahindra Scorpio-N 4XPLOR (4x4)',
      vehicleType: 'SUV',
      seatingCapacity: 6,
      luggageCapacity: '3 Bags',
      image: '/images/cars/scorpio.jpg',
      features: ['4XPLOR Snow & Offroad Modes', 'High Ground Clearance', 'Dual Zone Climate', 'Spiti Certified Driver'],
      isAvailable: true
    },
    {
      name: 'Mahindra Bolero Cruiser (9-Seater)',
      vehicleType: 'SUV',
      seatingCapacity: 9,
      luggageCapacity: '6 Large Bags + Roof Carrier',
      image: '/images/cars/scorpio.jpg',
      features: ['High-Traction Leaf Spring Suspension', 'Heavy Duty Luggage Carrier', 'Ideal for Temple Yatras & Hill Villages'],
      isAvailable: true
    },
    {
      name: 'Toyota Fortuner 4x4 Sigma-4',
      vehicleType: 'SUV',
      seatingCapacity: 6,
      luggageCapacity: '4 Bags',
      image: '/images/cars/fortuner.jpg',
      features: ['True 4WD Snow & Offroad Drive', 'High Ground Clearance', 'Leather Interior', 'Spiti & Ladakh Certified'],
      isAvailable: true
    },
    {
      name: 'Maruti Suzuki Ertiga Smart Hybrid',
      vehicleType: 'SUV',
      seatingCapacity: 6,
      luggageCapacity: '3 Bags',
      image: '/images/cars/ertiga.jpg',
      features: ['Dual AC with Rear Blower', '3-Row Comfortable Seating', 'Smart Hybrid Efficiency', 'GPS Tracked'],
      isAvailable: true
    },
    {
      name: 'Kia Carens Luxury Plus',
      vehicleType: 'SUV',
      seatingCapacity: 6,
      luggageCapacity: '3 Bags',
      image: '/images/cars/carens.jpg',
      features: ['Ventilated Seats', 'Rear AC Vents', 'Bose Sound System', 'All-Wheel Disc Brakes'],
      isAvailable: true
    },
    {
      name: 'Maruti Suzuki Dzire (AC Sedan Taxi)',
      vehicleType: 'Sedan',
      seatingCapacity: 4,
      luggageCapacity: '2 Large Bags',
      image: '/images/cars/dzire.jpg',
      features: ['AC & Mountain Heater', 'Music System with Bluetooth', 'Ample Boot Space', 'USB Charging', 'Sanitized Cabin'],
      isAvailable: true
    },
    {
      name: 'Toyota Etios Platinum (Large Boot Taxi)',
      vehicleType: 'Sedan',
      seatingCapacity: 4,
      luggageCapacity: '3 Large Bags',
      image: '/images/cars/etios.jpg',
      features: ['Extra Large 595L Boot', 'High Headroom & Legroom', 'Chilling AC & Heater', 'Smooth Mountain Suspension'],
      isAvailable: true
    },
    {
      name: 'Luxury Force Tempo Traveller (12 Seater)',
      vehicleType: 'Tempo Traveller',
      seatingCapacity: 12,
      luggageCapacity: '12 Bags',
      image: '/images/cars/tempo_traveller.jpg',
      features: ['1x1 Maharaja Pushback Seats', 'Central AC & Heating', 'LED Screen & Audio Setup', 'Mobile Chargers at Every Seat'],
      isAvailable: true
    },
    {
      name: 'Force Tempo Traveller (17 Seater Yatra Coach)',
      vehicleType: 'Tempo Traveller',
      seatingCapacity: 17,
      luggageCapacity: '15 Bags',
      image: '/images/cars/tempo_traveller.jpg',
      features: ['2x1 Reclining High-Back Seats', 'Individual AC Vents', 'Dedicated Top Luggage Carrier', 'All-India Permit'],
      isAvailable: true
    },
    {
      name: 'Force Tempo Traveller (26 Seater Tourist Coach)',
      vehicleType: 'Tempo Traveller',
      seatingCapacity: 26,
      luggageCapacity: '25 Bags',
      image: '/images/cars/tempo_traveller.jpg',
      features: ['Spacious Walk-Through Aisle', 'Dual High-Power AC', 'PA Sound System', 'Wedding & Group Specialist'],
      isAvailable: true
    },
    {
      name: 'Force Urbania Luxury VIP Van (10 / 14-Seater)',
      vehicleType: 'Luxury Car',
      seatingCapacity: 14,
      luggageCapacity: '14 Bags',
      image: '/images/cars/tempo_traveller.jpg',
      features: ['Mercedes-Derived High Roof Monocoque Body', 'Ultra-Quiet Luxury Cabin', 'Individual Purified AC Vents', 'Aircraft Reclining Seats'],
      isAvailable: true
    }
  ]);

  console.log('Seed completed successfully with verified images');
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
