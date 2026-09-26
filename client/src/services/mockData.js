export const DEFAULT_SETTINGS = {
  companyName: 'Thakur Tour & Travels',
  tagline: 'Amb Andaura Railway Station Cab Pickup & Himachal Tour Packages',
  phone: '+91 62303 51337',
  phoneSecondary: '+91 62303 51337',
  whatsapp: '916230351337',
  email: 'bookings@thakurtourandtravels.com',
  address: 'Andora Railway Station, Dhandri, Amb, Himachal Pradesh - 177203',
  locationCity: 'Amb, District Una, Himachal Pradesh',
  stationHub: 'Amb Andaura Railway Station (AADR) - Vande Bharat Terminal',
  googleMapsUrl: 'https://maps.app.goo.gl/bDZyPwLejw7JTwCe6?g_st=aw',
  googleMapsShareUrl: 'https://maps.app.goo.gl/bDZyPwLejw7JTwCe6',
  workingHours: 'Open 24/7 for Train Arrivals & Roadside Support | Office: 8:00 AM - 10:00 PM',
  about: 'Thakur Tour & Travels (Amb Andaura) is a premier tour and taxi service provider based directly at Amb Andaura Railway Station, Himachal Pradesh. We provide 24/7 station cab pickups (for Vande Bharat Express & Himachal Express), pilgrimage tours to Mata Chintpurni, Jawalamukhi, Kangra, and customized holiday packages to Dharamshala, McLeodganj, Dalhousie, Manali, Shimla, and Chandigarh.',
  footerText: '© 2026 Thakur Tour & Travels. All rights reserved. Government Approved Fleet Partner.',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  rating: '4.9',
  reviewsCount: '2,480+',
  tripsCompleted: '14,200+'
};

export const INITIAL_VEHICLES = [
  {
    _id: 'veh-1',
    name: 'Toyota Innova Crysta 2.4 ZX',
    vehicleType: 'Innova Crysta Luxury SUV / MPV',
    tag: '👑 #1 Gold Standard for Himachal Hills',
    seatingCapacity: '6 to 7 Passengers + 1 Chauffeur',
    luggageCapacity: '4 Large Strolleys + Dedicated Roof Carrier',
    image: '/images/cars/innova_crysta.jpg',
    features: [
      'Individual Reclining Pilot Captain Seats with Armrests',
      'Triple-Zone Independent AC & Mountain Heating Vents',
      'Superior Independent Mountain Suspension (Zero Motion Sickness)',
      'Heavy-Duty Rainproof Roof Luggage Carrier',
      '12V & USB Fast Charging at Every Row'
    ],
    suitability: 'The undisputed king of hill travel in India. Supreme comfort on mountain hairpin bends for families, seniors, and long circuits.',
    idealRoutes: 'Chandigarh / Delhi / Amb Andaura to Manali, Shimla, Dharamshala, Spiti Valley',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-2',
    name: 'Toyota Innova HyCross (Hybrid VIP Lounge)',
    vehicleType: 'Hybrid VIP MPV / SUV',
    tag: 'Ultra-Modern Flagship Hybrid',
    seatingCapacity: '6 to 7 Passengers + 1 Chauffeur',
    luggageCapacity: '4 Large Bags + Carrier',
    image: '/images/cars/hycross.jpg',
    features: [
      'Powered Ottoman Calf-Rest Captain Recliners',
      'Panoramic Glass Sunroof with Ambient Cabin Glow',
      'Whisper-Quiet Electric Hybrid Powertrain',
      'Dual-Zone Digital Automatic Climate Control',
      'Ultra-Smooth High-Speed Expressway Cruising'
    ],
    suitability: 'For travelers desiring the ultimate flagship luxury MPV experience with silent electric cruising and executive hospitality.',
    idealRoutes: 'Delhi / Chandigarh Airport to Shimla & Manali Luxury Resorts',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-3',
    name: 'Mahindra Thar 4x4 Hardtop Adventure',
    vehicleType: '4WD Off-Road Adventure SUV',
    tag: 'Spiti, Rohtang Snow & Off-Road Icon',
    seatingCapacity: '4 Passengers (Including Driver)',
    luggageCapacity: '2 Duffel Bags + Rear Storage',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg',
    features: [
      'Authentic 4x4 Low-Ratio Gearbox & Mechanical Locking Differential',
      'High Ground Clearance (226mm) & All-Terrain Snow Tires',
      'Hardtop Insulation with Powerful Heating & Defogger',
      'Touchscreen Infotainment with Adventure Gauges',
      'Seasoned Mountain Off-Road Driving Specialist'
    ],
    suitability: 'Perfect for adventure seekers, couples, and photography expeditions conquering Spiti Valley, Rohtang snow, Chandratal, and remote trans-Himalayan passes.',
    idealRoutes: 'Spiti Valley Circuit, Atal Tunnel to Sissu, Rohtang Snow Point, Chandratal Lake',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-4',
    name: 'Mahindra Scorpio-N 4XPLOR (4x4)',
    vehicleType: 'Mountain Adventure 4WD SUV',
    tag: 'Rugged Off-Road & Snow Ready',
    seatingCapacity: '6 Passengers + 1 Chauffeur',
    luggageCapacity: '3 Large Bags + Carrier',
    image: '/images/cars/scorpio.jpg',
    features: [
      'Intelligent 4XPLOR Terrain Modes (Snow, Sand, Mud, Rocks)',
      'High Ground Clearance (187mm) & Muscular Stance',
      'High Seating Position with Panoramic Valley Views',
      'Dual-Zone Climate Control & Sony 3D Audio',
      'High-Altitude Certified Spiti Tour Chauffeur'
    ],
    suitability: 'Built for thrilling road trips through rough mountain trails, Atal Tunnel winter snow, Spiti Valley, and high mountain passes.',
    idealRoutes: 'Spiti Valley Loop, Rohtang Pass, Chandratal Lake, Kinnaur',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-5',
    name: 'Mahindra Bolero Cruiser / Camper (9-Seater)',
    vehicleType: 'Rugged Mountain Hill Cruiser',
    tag: 'High-Traction 9-Seater Himalayan Workhorse',
    seatingCapacity: '9 Passengers + 1 Chauffeur',
    luggageCapacity: '6 Large Bags + Heavy Roof Carrier',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Mahindra_Bolero_GLX_Front.JPG',
    features: [
      'Metal Solid Bumper & Reinforced Mountain Leaf Springs',
      'High Ground Clearance (180mm) for Harsh Hill Roads',
      'Spacious Long Wheelbase with Forward & Side-Facing Seats',
      'Heavy-Duty Roof Luggage Carrier for Pilgrimage Baggage',
      'Local Himachali Mountain Master Driver'
    ],
    suitability: 'Unmatched toughness on steep village gradients, temple yatras, group pilgrims, and rural Himachal mountain routes.',
    idealRoutes: 'Amb Andaura to Mata Chintpurni, Jawala Ji, Kangra Devi, Baijnath & Interior Valleys',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-6',
    name: 'Force Trax Cruiser / Toofan (13-Seater Hill MUV)',
    vehicleType: 'Rugged 13-Seater Hill Cruiser',
    tag: 'Heavy-Duty Mountain People Mover',
    seatingCapacity: '12 to 13 Passengers + 1 Chauffeur',
    luggageCapacity: '8+ Bags + Heavy-Duty Top Carrier',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Mahindra_Bolero_Camper_double-cab_truck_in_Pakxe_Laos.jpg',
    features: [
      'Reinforced High-Torque Mercedes-Derived Engine',
      'High Ground Clearance for Rugged Mountain Terrains',
      'Triple-Row Spacious High-Back Seating with Grab Handles',
      'Reinforced Roof Luggage Rack for Group Baggage',
      'Experienced Senior Hill-Route Specialist Driver'
    ],
    suitability: 'The workhorse choice for large pilgrimage jathas, rural temple circuits, local functions, and heavy luggage hill transfers.',
    idealRoutes: 'Chintpurni, Jawala Ji, Chamunda, Baglamukhi, Baba Balak Nath, Anandpur Sahib',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-7',
    name: 'Toyota Fortuner 4x4 Sigma-4',
    vehicleType: 'Luxury 4WD Mountain SUV',
    tag: 'Spiti Valley & VIP Escort Ready',
    seatingCapacity: '6 Passengers + 1 Chauffeur',
    luggageCapacity: '4 Large Suitcases',
    image: '/images/cars/fortuner.jpg',
    features: [
      'Heavy-Duty 4x4 High-Low Transfer Case for Extreme Snow',
      'Premium Black Leather Interior & Sound Isolation',
      'Auto-Limited Slip Differential for Mountain Safety',
      'Designed for Rohtang, Spiti, Kaza & Leh Ladakh passes',
      'Seasoned High-Altitude Chauffeur'
    ],
    suitability: 'Engineered for extreme trans-Himalayan roads, water crossings, snow drives in Lahaul/Spiti, and VIP executive transfers.',
    idealRoutes: 'Full Spiti Valley Circuit, Leh Ladakh, High Mountain Expeditions',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-8',
    name: 'Maruti Suzuki Ertiga Smart Hybrid',
    vehicleType: 'Family MUV / SUV',
    tag: 'Budget-Friendly Family 6-Seater',
    seatingCapacity: '5 to 6 Passengers + 1 Chauffeur',
    luggageCapacity: '3 Large Bags + Top Carrier',
    image: '/images/cars/ertiga.jpg',
    features: [
      'Dual Air Conditioners with 2nd Row Blower Controls',
      'Flexible 3-Row Foldable High-Comfort Seating',
      'High Mileage & Low Carbon Footprint Hybrid',
      'Clean Sanitized Cabin with Mobile Chargers',
      'Real-Time GPS Tracking for Family Safety'
    ],
    suitability: 'Smart, cost-effective 6-seater vehicle providing great comfort for family holidays to Shimla, Manali, and Dharamshala.',
    idealRoutes: 'Chandigarh to Shimla, Manali, Amritsar, Kalka, Amb Andaura',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-9',
    name: 'Kia Carens Luxury Plus',
    vehicleType: 'Premium 6-Seater MUV',
    tag: 'Modern High-Tech Family Tourer',
    seatingCapacity: '6 Passengers + 1 Chauffeur',
    luggageCapacity: '3 Large Bags + Roof Carrier',
    image: '/images/cars/carens.jpg',
    features: [
      'Ventilated Leatherette Seats & Rear Sunshades',
      'One-Touch Electric Tumble 2nd Row Seating',
      'Roof Mounted AC Vents for 2nd & 3rd Rows',
      'Bose Premium 8-Speaker Audio System',
      'Advanced All-Wheel Disc Brakes & Hill Hold'
    ],
    suitability: 'A stylish, modern 6-seater with cutting-edge comfort features, ample headroom, and refined mountain ride quality.',
    idealRoutes: 'Chandigarh to Dharamshala, Dalhousie, Manali',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-10',
    name: 'Maruti Suzuki Dzire (AC Sedan Taxi)',
    vehicleType: 'Executive Sedan Taxi',
    tag: 'Best for Couples & Small Families',
    seatingCapacity: '4 Passengers + 1 Chauffeur',
    luggageCapacity: '2 Large Suitcases + 2 Handbags',
    image: '/images/cars/dzire.jpg',
    features: [
      'Chilling AC & High-Power Mountain Heater',
      'Plush Sanitized Cabin & Fabric Upholstery',
      'Bluetooth Music System with USB Fast Charging',
      '378L Large Trunk Boot Space',
      'Mountain-Certified Polite Chauffeur'
    ],
    suitability: 'Smooth, highly economical, and comfortable highway & hill drive for couples, honeymooners, and small families of up to 4.',
    idealRoutes: 'Amb Andaura Station, Chandigarh to Shimla, Manali, Kalka transfers, Local Sightseeing',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-11',
    name: 'Toyota Etios Platinum (Large Boot Taxi)',
    vehicleType: 'Executive Sedan Taxi',
    tag: 'Extra Legroom & Huge Boot (595L)',
    seatingCapacity: '4 Passengers + 1 Chauffeur',
    luggageCapacity: '3 Large Bags + 2 Duffel Bags',
    image: '/images/cars/etios.jpg',
    features: [
      'Massive 595-Litre Trunk for Airport Strolleys',
      'Flat Rear Floor with Class-Leading Knee Room',
      'Super-Cooled AC and Mountain Defogger',
      'Soft Alpine Suspension on Hairpin Curves',
      'Commercial Yellow Plate with All-India Permit'
    ],
    suitability: 'Selected by guests with heavy luggage who prioritize comfort, rear legroom, and a stable hill station ride.',
    idealRoutes: 'Delhi / Chandigarh to Manali, Dharamshala, Dalhousie, Amritsar',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-12',
    name: 'Honda City V-Tec Executive Sedan',
    vehicleType: 'Premium Sedan Taxi',
    tag: 'Executive Class & Ultra Smooth Ride',
    seatingCapacity: '4 Passengers + 1 Chauffeur',
    luggageCapacity: '3 Large Bags + 2 Handbags',
    image: '/images/cars/honda_city.jpg',
    features: [
      'Plush Soft Leather Seating & Rear Sunshade',
      '506-Litre Deep Boot Capacity for Luggage',
      'Cruise Control & High-Efficiency Silent Powertrain',
      'Dual Air Conditioners with Rear AC Vents',
      'Experienced Polite Uniformed Chauffeur'
    ],
    suitability: 'First choice for business executives, delegates, honeymoon couples, and premium intercity highway travel.',
    idealRoutes: 'Chandigarh Airport to Shimla, Dharamshala, Amritsar, Delhi NCR',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-13',
    name: 'Luxury Force Tempo Traveller (12-Seater Maharaja)',
    vehicleType: 'Luxury 12-Seater Maharaja',
    tag: '1x1 Maharaja Pushback Seats',
    seatingCapacity: '12 Passengers + 1 Chauffeur',
    luggageCapacity: '12+ Large Suitcases (Dedicated Rear Boot)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Force_Traveller_Luxury.jpg',
    features: [
      'Exclusive 1x1 Maharaja Wide Pushback Recliners',
      'Powerful Central High-Cooling AC & Heating Blowers',
      'LED TV Screen, Mic Setup & Music System',
      'Individual Reading Lights & Mobile Chargers at Every Seat',
      'Experienced Senior Mountain Tour Driver'
    ],
    suitability: 'The top choice for joint family tours, college friends, corporate offsites, and pilgrimage tours to Amritsar & Himachal.',
    idealRoutes: 'Shimla Manali 6-Day Tour, Spiti Valley, Dharamshala Dalhousie, Chintpurni Yatra',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-14',
    name: 'Force Tempo Traveller (17-Seater Deluxe Yatra Coach)',
    vehicleType: 'Deluxe 17-Seater Traveller',
    tag: 'Most Popular for Joint Families & Pilgrimage Groups',
    seatingCapacity: '17 Passengers + 1 Chauffeur',
    luggageCapacity: '16+ Bags (Dedicated Rear Boot & Top Carrier)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Force_Traveller%2C_Leh-Manali_Highway.jpg',
    features: [
      '2x1 Deluxe Reclining High-Back Seats with Armrests',
      'Central Chilling AC with Individual Air Vents',
      'High-Power Alpine Suspension for Mountain Roads',
      'Dedicated Heavy-Duty Top Luggage Carrier with Waterproof Cover',
      'All-India Permit & Toll Tax Pre-Cleared'
    ],
    suitability: 'Perfect for group vacations, extended families, student groups, temple darshan yatras, and wedding guest airport transfers.',
    idealRoutes: 'Nau Devi Yatra (Chintpurni, Jawala Ji, Kangra), Complete Himachal Tour, Amritsar Golden Temple',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-15',
    name: 'Force Tempo Traveller (26-Seater Tourist Coach)',
    vehicleType: '26-Seater Tourist Coach / Mini Bus',
    tag: 'Large Group & Wedding Specialist',
    seatingCapacity: '26 Passengers + 1 Driver + 1 Helper',
    luggageCapacity: '25+ Large Suitcases',
    image: '/images/cars/tempo_traveller.jpg',
    features: [
      'Spacious Walk-Through Aisle with High Headroom',
      'Powerful Heavy-Duty Dual Air Conditioners',
      'PA Sound System & Entertainment Display',
      'Curtains on All Windows for Sun Protection',
      'Seasoned Commercial Heavy-Vehicle Mountain Captain'
    ],
    suitability: 'Designed for corporate retreats, destination wedding barati transfers, school excursions, and religious yatra groups.',
    idealRoutes: 'Chandigarh to Himachal, Delhi to Amritsar & Katra, Wedding Transfers',
    isAvailable: true,
    isActive: true
  },
  {
    _id: 'veh-16',
    name: 'Force Urbania VIP Lounge (10 / 14-Seater)',
    vehicleType: 'Executive VIP Luxury Van',
    tag: 'Aircraft-Style Ultra Luxury Lounge',
    seatingCapacity: '10 to 14 Passengers + 1 Chauffeur',
    luggageCapacity: '14 Large Suitcases',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Mercedes-Derived Monocoque High-Roof Aerodynamic Body',
      'Ultra-Quiet Cabin with Ambient Aircraft Lighting',
      'Plush Soft Leatherette Aircraft Recliners with Armrests',
      'Individual Air Vents with Air Purification',
      'Panoramic UV-Protected Windows for Hill Sightseeing'
    ],
    suitability: 'The pinnacle of luxury group travel in North India for VIP delegations, destination weddings, and elite family road trips.',
    idealRoutes: 'VIP Himachal Tours, Luxury Destination Weddings, Executive Offsites',
    isAvailable: true,
    isActive: true
  }
];

export const INITIAL_DESTINATIONS = [
  {
    _id: 'dest-1',
    name: 'Mata Chintpurni Devi Temple',
    state: 'Himachal Pradesh',
    location: 'Una District (Near Amb Andaura)',
    shortDescription: 'One of the most sacred 51 Shaktipeeths (Maa Chhinnamastika), accessible in 25 mins from Amb Andaura Station.',
    description: 'Mata Chintpurni Temple is the holy abode of Maa Chhinnamastika Devi where devotees pray for the fulfillment of all wishes. Situated on the Solasinghi hill range just 25 km from Amb Andaura Railway Station, our headquarters provides 24/7 direct cab transfers for pilgrims arriving via Vande Bharat Express.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Chintpurni.jpg',
    duration: '1 - 2 Days',
    bestTimeToVisit: 'Throughout the year (Navratri Festivals & Sunday Melas)',
    highlights: ['Main Sanctum Darshan of Maa Chhinnamastika', 'Ancient Holy Banyan Tree (Kalgidhar)', 'Prasad & Souvenir Market', 'Garbha Griha Evening Aarti', 'Direct 25-Min Cab Pickup from Amb Andaura Station'],
    category: 'Religious & Pilgrimage',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-2',
    name: 'Mata Jawala Ji Temple',
    state: 'Himachal Pradesh',
    location: 'Kangra District',
    shortDescription: 'Sacred Shaktipeeth renowned for the nine eternal natural blue flames burning without any fuel.',
    description: 'Jwalamukhi Temple is dedicated to the Goddess of Light and Divine Flames. Legend says Sati’s holy tongue fell here. Nine eternal flames representing different forms of Goddess Durga burn continuously in a natural rock cave, revered by millions of pilgrims annually.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Jawala_Ji_Temple.jpg',
    duration: '1 - 2 Days',
    bestTimeToVisit: 'Throughout the year (Chaitra & Ashwin Navratris)',
    highlights: ['9 Divine Eternal Natural Flames Darshan', 'Gorakh Dibbi Miraculous Boiling Water Pond', 'Golden Canopy Donated by Emperor Akbar', 'Sej Bhavan & Aarti Hall', 'Shri Raghunath Ji Temple'],
    category: 'Religious & Pilgrimage',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-3',
    name: 'Mata Chamunda Devi & Kangra Fort',
    state: 'Himachal Pradesh',
    location: 'Kangra Valley',
    shortDescription: 'Fierce Goddess shrine on the banks of Baner River overlooking the majestic snow-clad Dhauladhar peaks.',
    description: 'Chamunda Nandikeshwar Dham is dedicated to the fierce aspect of Goddess Durga who vanquished demons Chanda and Munda. Located near Dharamshala along the roaring river Baner, it combines immense spiritual solace with the grandeur of Kangra Fort and Bajreshwari Devi Temple.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Shri_Chamunda_Devi_Mandir.jpg',
    duration: '2 - 3 Days',
    bestTimeToVisit: 'September to June',
    highlights: ['Maa Chamunda Sanctum Sanctorum Darshan', 'Nandikeshwar Shiva Lingam Cave', 'Historic Kangra Fort (One of India’s Oldest)', 'Mata Bajreshwari Kangra Temple', 'Baner River Banks Ghats'],
    category: 'Religious & Heritage',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-4',
    name: 'Mata Baglamukhi & Baijnath Shiv Temple',
    state: 'Himachal Pradesh',
    location: 'Kangra Valley',
    shortDescription: 'Miraculous Pitambara Shatru-Vinashini Peeth and the ancient 1204 AD Vaidyanath Jyotirlinga Temple.',
    description: 'Mata Baglamukhi Temple (Bankhandi) is worshipped for victory, justice, and protection from all obstacles. Coupled with the 800-year-old Nagara stone masterpiece Baijnath Temple where Ravana worshipped Lord Shiva, this circuit is a sacred Himalayan pilgrimage.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/BaijNath.jpg',
    duration: '1 - 2 Days',
    bestTimeToVisit: 'Throughout the year (Mahashivratri & Navratri)',
    highlights: ['Mata Baglamukhi Havan & Pujan Peeth', '1204 AD Ancient Baijnath Stone Architecture', 'Natural Mineral Spring Waters of Vaidyanath', 'Tea Gardens of Palampur Enroute', 'Neugal Khad Canyon Views'],
    category: 'Religious & Spiritual',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-5',
    name: 'Amritsar Golden Temple & Wagah Border',
    state: 'Punjab',
    location: 'Majha Region',
    shortDescription: 'The Golden Temple (Sri Harmandir Sahib), holy Amrit Sarovar, and patriotic Wagah Border ceremony.',
    description: 'Amritsar is the spiritual and cultural capital of Sikhism, revered globally for Sri Harmandir Sahib glistening in pure gold amidst the sacred pool of nectar, round-the-clock community kitchen (Guru Ka Langar), and the patriotic Wagah Border Beating Retreat.',
    thumbnail: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
    duration: '2 - 3 Days',
    bestTimeToVisit: 'October to March',
    highlights: ['Sri Harmandir Sahib (Golden Temple) Darshan', 'Akal Takht & Guru Ka Langar', 'Wagah Border Patriotic Beating Retreat Ceremony', 'Jallianwala Bagh Memorial & Partition Museum', 'Durgiana Temple & Gobindgarh Fort'],
    category: 'Religious & Heritage',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-6',
    name: 'Manikaran Sahib Gurudwara & Hot Springs',
    state: 'Himachal Pradesh',
    location: 'Parvati Valley (Kullu)',
    shortDescription: 'Sacred Sikh & Hindu pilgrimage site famed for natural boiling therapeutic sulphur hot water springs.',
    description: 'Located by the roaring river Parvati in Kullu, Manikaran Sahib is sacred to both Sikhs (visited by Guru Nanak Dev Ji) and Hindus (Lord Shiva and Goddess Parvati). The miraculous hot springs cook langar food naturally and cure ailments.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Gurudwara_Manikaran_Sahib.jpg',
    duration: '2 - 3 Days',
    bestTimeToVisit: 'March to November',
    highlights: ['Gurudwara Shri Manikaran Sahib Langar & Snan', 'Lord Shiva & Ramchandra Ancient Temples', 'Healing Natural Sulphur Hot Springs Baths', 'Scenic Parvati River Valley Drive', 'Kasol & Tosh Village Base'],
    category: 'Religious & Nature',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-7',
    name: 'Takht Sri Kesgarh Sahib (Anandpur) & Naina Devi',
    state: 'Punjab / Himachal Pradesh',
    location: 'Rupnagar & Bilaspur',
    shortDescription: 'Birthplace of the Khalsa (Takht Sri Damdama / Kesgarh) and sacred hilltop Naina Devi Temple.',
    description: 'Anandpur Sahib, the City of Bliss, is where Guru Gobind Singh Ji created the Khalsa Panth in 1699. Directly across the Shivalik ridges lies the revered hilltop shrine of Maa Naina Devi overlooking Gobind Sagar Lake, connected by ropeway.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Takht_Sri_Keshgarh_Sahib%2C_Anandpur_Sahib.jpg',
    duration: '1 - 2 Days',
    bestTimeToVisit: 'Throughout the year (Hola Mohalla in March & Navratri)',
    highlights: ['Takht Sri Kesgarh Sahib Darshan & Historic Weapons', 'Virasat-e-Khalsa World Heritage Museum', 'Mata Naina Devi Temple & Ropeway Ride', 'Gobind Sagar Lake & Bhakra Dam Views', 'Langar & Spiritual Tranquility'],
    category: 'Religious & Heritage',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-8',
    name: 'Dharamshala, McLeodganj & Dalai Lama Temple',
    state: 'Himachal Pradesh',
    location: 'Kangra Valley',
    shortDescription: 'Tsuglagkhang Buddhist Complex, Dalai Lama residence, Bhagsunag Shiva Temple, and Dhauladhar views.',
    description: 'Surrounded by cedar forests on the edge of the Himalayas, this hillside haven is the spiritual residence of His Holiness the Dalai Lama, featuring serene Tibetan monasteries, Bhagsunag Shiva Mandir, and Dhauladhar mountain peaks.',
    thumbnail: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
    duration: '3 - 5 Days',
    bestTimeToVisit: 'September to June',
    highlights: ['Tsuglagkhang Complex (Dalai Lama Temple)', 'Ancient Bhagsunag Shiv Temple & Waterfall', 'HPCA Cricket Stadium with Snow Backdrop', 'St. John in the Wilderness Historic Church', 'Norbulingka Tibetan Cultural Institute'],
    category: 'Spiritual & Hill Station',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-9',
    name: 'Manali, Solang Valley & Hadimba Temple',
    state: 'Himachal Pradesh',
    location: 'Kullu District',
    shortDescription: '1553 AD Hadimba Devi Temple, Vashisht Hot Springs, Atal Tunnel, and Solang snow slopes.',
    description: 'Set along the Beas River, Manali combines sacred history (1553 AD wooden pagoda Hadimba Temple, Sage Manu Temple) with world-class mountain adventure at Solang Valley, Rohtang Pass, and the engineering marvel Atal Tunnel.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Hadimba_Temple.jpg',
    duration: '4 - 6 Days',
    bestTimeToVisit: 'Throughout the year (Snow: Dec-Feb, Greenery: Mar-Jun)',
    highlights: ['1553 AD Hadimba Devi Temple in Cedar Woods', 'Vashisht Rishi Ancient Temple & Hot Sulphur Springs', 'Solang Valley Ropeway & Snow Sports', 'Atal Tunnel (9.02 km) & Sissu Waterfall', 'Old Manali Manu Maharishi Temple'],
    category: 'Hill Station & Spiritual',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-10',
    name: 'Shimla, Kufri & Jakhu Hanuman Temple',
    state: 'Himachal Pradesh',
    location: 'Shimla District',
    shortDescription: '108ft giant Jakhu Hill Hanuman statue, Tara Devi Temple, Christ Church, and pine forests.',
    description: 'Shimla blends majestic spiritual heritage—such as the sacred Jakhu Temple at 2,455m and Tara Devi Hilltop Temple—with the colonial architecture of the Ridge, Mall Road, Kufri snow slopes, and scenic pine valleys.',
    thumbnail: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
    duration: '3 - 4 Days',
    bestTimeToVisit: 'March to June & December to February (Snowfall)',
    highlights: ['Jakhu Temple & 108ft Giant Hanuman Statue (Ropeway)', 'Tara Devi Hilltop Temple Panoramic Views', 'The Ridge, Mall Road & Historic Christ Church', 'Kufri Snow Adventure Park & Apple Orchards', 'Viceregal Lodge & Indian Institute of Advanced Study'],
    category: 'Hill Station & Spiritual',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-11',
    name: 'Spiti Valley, Key Monastery & Tabo',
    state: 'Himachal Pradesh',
    location: 'Lahaul & Spiti',
    shortDescription: '1,000-year-old Key & Tabo Buddhist Gompas, high altitude passes, and pristine Chandratal Moon Lake.',
    description: 'A sacred high-altitude trans-Himalayan wonderland featuring 11th-century Buddhist monasteries (Key Gompa, Tabo UNESCO heritage), dramatic barren mountain canyons, Kunzum Pass, and the sacred crescent Chandratal Lake.',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    duration: '7 - 10 Days',
    bestTimeToVisit: 'May to October',
    highlights: ['Key Monastery (1,000-Year-Old Cliffside Gompa)', 'Tabo Monastery (Ajanta of the Himalayas)', 'Dhankar Monastery & Lake', 'Chandratal Lake (Sacred Moon Lake)', 'Hikkim Highest Post Office & Komic Highest Village'],
    category: 'Adventure & Spiritual',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-12',
    name: 'Dalhousie, Khajjiar & Chamba Temples',
    state: 'Himachal Pradesh',
    location: 'Chamba District',
    shortDescription: '10th Century Laxmi Narayan Chamba Temples, Chamunda Devi hill shrine, and "Mini Switzerland".',
    description: 'Dalhousie offers colonial serenity, cedar trails, and the breathtaking Khajjiar meadow, with excursions to Chamba’s magnificent 10th-century Shikhara stone temples dedicated to Lord Vishnu and Chamunda Devi.',
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    duration: '3 - 4 Days',
    bestTimeToVisit: 'March to November',
    highlights: ['Khajjiar Lake & Meadow (Mini Switzerland)', 'Chamba 10th Century Laxmi Narayan Temple Complex', 'Chamunda Devi Temple (Chamba Hilltop)', 'Dainkund Peak & Kalatop Wildlife Sanctuary', 'Panchpula & Subhash Baoli Waterfalls'],
    category: 'Scenic Nature & Heritage',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'dest-13',
    name: 'Kinnaur & Kinner Kailash Sacred Peak',
    state: 'Himachal Pradesh',
    location: 'Kinnaur District',
    shortDescription: 'Sacred 6,050m natural Shivling peak, Sangla apple valley, and Chitkul (India’s last village).',
    description: 'Bordering Tibet, Kinnaur is holy for the sacred 6,050m Kinner Kailash peak (natural rock monolith that changes colors through the day, worshipped as Lord Shiva’s winter abode), Baspa river banks, and ancient Kamru Fort.',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    duration: '5 - 7 Days',
    bestTimeToVisit: 'April to October',
    highlights: ['Kinner Kailash Sacred Peak Views from Kalpa', 'Chitkul (Last Village on Indo-Tibet Border)', 'Kamru Fort & Badrinath Temple in Sangla', 'Roghi Village Cliffside Suicide Point', 'Nako Lake & 1,000-Year-Old Monastery'],
    category: 'Adventure & Spiritual',
    isFeatured: false,
    isActive: true
  },
  {
    _id: 'dest-14',
    name: 'Jibhi & Serolsar Lake Buddhi Nagin Temple',
    state: 'Himachal Pradesh',
    location: 'Kullu / Seraj Valley',
    shortDescription: 'Untouched pine valley, Jalori Pass, and the sacred holy waters of Buddhi Nagin at Serolsar Lake.',
    description: 'Jibhi is a peaceful pine sanctuary with roaring trout streams, wooden treehouses, and the famous hike from Jalori Pass (3,120m) to the sacred Serolsar Lake, revered as the holy seat of Goddess Buddhi Nagin.',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    duration: '3 - 4 Days',
    bestTimeToVisit: 'March to November',
    highlights: ['Jalori Pass & Sacred Serolsar Lake Trek', 'Mata Buddhi Nagin Sacred Lake Shrine', 'Jibhi Waterfall & Hidden Wooden Bridges', 'Chehni Kothi Ancient 1,500-Year Tower', 'Tirthan River Trout Valley'],
    category: 'Scenic Nature & Spiritual',
    isFeatured: true,
    isActive: true
  }
];

export const INITIAL_TOURS = [
  {
    _id: 'tour-1',
    title: 'Complete Himachal Panorama (Shimla, Kullu & Manali)',
    destinationName: 'Shimla & Manali',
    duration: '6 Days / 5 Nights',
    category: 'Family Tours',
    shortDescription: 'The ultimate classic mountain holiday covering the Ridge, Kufri, Solang Valley, Atal Tunnel, and Kasol with dedicated private cab.',
    thumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    route: 'Chandigarh / Delhi ➔ Shimla ➔ Kufri ➔ Kullu ➔ Manali ➔ Solang / Atal Tunnel ➔ Chandigarh',
    highlights: ['Private Dedicated Mountain Cab throughout trip', 'Stay in Handpicked 3-Star / 4-Star Mountain View Resorts', 'Daily Breakfast & Dinner included', 'Rohtang Pass / Atal Tunnel & Sissu excursion', 'Kullu River Rafting point & Shawl Factory visit', 'Kufri Snow & Horse ride point'],
    itinerary: [
      { day: 1, title: 'Arrival Chandigarh / Delhi & Scenic Drive to Shimla', description: 'Meet our experienced driver at Chandigarh airport/railway station. Enjoy a scenic 4-hour uphill drive to Shimla with stops at Timber Trail and local pine valleys. Check into hotel and spend a relaxed evening walking along The Mall Road and Christ Church.' },
      { day: 2, title: 'Shimla, Kufri & Jakhu Hill Sightseeing', description: 'Post breakfast, proceed for Kufri sightseeing. Enjoy fun park activities, apple orchard views, and horse rides. Later visit Jakhu Temple via ropeway, Lakkar Bazaar, and Gaiety Heritage Complex.' },
      { day: 3, title: 'Shimla to Manali via Pandoh Dam & Kullu Valley', description: 'Scenic drive to Manali through Sundernagar Lake, Pandoh Dam, and the thrilling Aut Tunnel. Enjoy river rafting and paragliding stops in Kullu. Arrive in Manali and check in with welcoming mountain views.' },
      { day: 4, title: 'Manali Local Sightseeing & Old Manali Exploration', description: 'Explore ancient Hadimba Devi Temple amidst giant deodar cedar forests, Vashisht Hot Sulphur Springs, Tibetan Monastery, Club House, and vibrant Old Manali cafes.' },
      { day: 5, title: 'Solang Valley, Atal Tunnel & Lahaul Sissu Excursion', description: 'Drive to the majestic Solang Valley for ropeway, skiing, and snow activities. Cross the historic Atal Tunnel (9.02 km) to enter the dramatic landscapes of Sissu in Lahaul Valley with stunning waterfalls.' },
      { day: 6, title: 'Manali to Chandigarh / Delhi Departure', description: 'After breakfast, check out from the hotel and commence return journey to Chandigarh / Delhi with sweet memories of the Himalayas.' }
    ],
    inclusions: [
      'Dedicated AC Sedan / SUV with commercial mountain permit',
      'All toll taxes, state road taxes, parking fees & driver allowances',
      '5 Nights accommodation in Deluxe / Premium category hotels',
      'Daily freshly prepared Breakfast & Dinner (MAP Plan)',
      'All local and outstation sightseeing as per itinerary',
      '24x7 On-Trip Assistance by our tour coordinator'
    ],
    exclusions: [
      'Airfare or Train tickets to/from starting point',
      'Adventure sports tickets (Rafting, Paragliding, Skiing)',
      'Entry monuments tickets & Rohtang Pass NGT special permits',
      'Personal expenses, laundry, heater charges (if applicable)'
    ],
    pickupLocation: 'Chandigarh / Delhi / Kalka / Ambala',
    dropLocation: 'Chandigarh / Delhi',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'tour-2',
    title: 'Exotic Himachal & Golden Temple (Shimla, Manali, Dharamshala & Amritsar)',
    destinationName: 'Himachal & Punjab Circuit',
    duration: '9 Days / 8 Nights',
    category: 'North India Tours',
    shortDescription: 'The most comprehensive grand circuit blending snow-capped hills, Tibetan Buddhist monasteries, Kangra tea gardens, and the Golden Temple.',
    thumbnail: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
    route: 'Chandigarh ➔ Shimla ➔ Manali ➔ Dharamshala ➔ Amritsar ➔ Chandigarh',
    highlights: ['Grand Circuit covering 4 prime tourist hubs', 'Dalai Lama Monastery & Bhagsunag Waterfall in McLeodganj', 'Golden Temple Night Palki Sahib & Wagah Border Ceremony', 'Atal Tunnel snow experience', 'Kangra Fort & Tea Gardens'],
    itinerary: [
      { day: 1, title: 'Chandigarh to Shimla Transfer', description: 'Warm greeting at Chandigarh and scenic mountain drive to Queen of Hills, Shimla. Evening at leisure on the Ridge.' },
      { day: 2, title: 'Shimla & Kufri Excursion', description: 'Full day sightseeing of Kufri, Jakhu Temple, and colonial landmarks.' },
      { day: 3, title: 'Shimla to Manali via Kullu Valley', description: 'Drive through beautiful Beas river valley with sightseeing stops at Kullu Shawl Weaving centers.' },
      { day: 4, title: 'Manali Solang Valley & Atal Tunnel', description: 'Adventure day at Solang and crossing Atal Tunnel into Sissu waterfalls.' },
      { day: 5, title: 'Manali to Dharamshala (McLeodganj)', description: 'Scenic drive to Kangra Valley. Visit Palampur Tea Gardens and Baijnath Shiva Temple en route.' },
      { day: 6, title: 'Dharamshala & McLeodganj Sightseeing', description: 'Visit Dalai Lama Temple, Tibetan Market, Bhagsu Waterfall, and HPCA Cricket Stadium.' },
      { day: 7, title: 'Dharamshala to Amritsar', description: 'Drive into the fertile plains of Punjab to Amritsar. Evening Golden Temple visit during magical illumination.' },
      { day: 8, title: 'Wagah Border & Jallianwala Bagh', description: 'Visit historic Jallianwala Bagh and witness the high-energy Wagah Border beating retreat ceremony.' },
      { day: 9, title: 'Amritsar to Chandigarh / Departure', description: 'Shopping for authentic Punjabi juttis and spices, followed by transfer to Airport/Railway Station.' }
    ],
    inclusions: [
      'Private AC Cab for the entire 9-day circuit',
      '8 Nights stay in verified hotels across 4 destinations',
      'Daily Breakfast & Dinner',
      'All toll, parking, driver night stay & fuel charges',
      'Sightseeing as per customized schedule'
    ],
    exclusions: ['Monuments fees & personal expenses', 'Lunch and snacks on transit'],
    pickupLocation: 'Chandigarh / Amritsar / Delhi',
    dropLocation: 'Amritsar / Chandigarh',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'tour-3',
    title: 'Manali Luxury Honeymoon Special with Private Cab',
    destinationName: 'Manali & Solang',
    duration: '5 Days / 4 Nights',
    category: 'Honeymoon Tours',
    shortDescription: 'Romantic mountain escape with candle-light dinner, flower bed decoration, honeymoon cake, and scenic private sightseeing.',
    thumbnail: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
    route: 'Chandigarh / Delhi ➔ Manali ➔ Solang Valley ➔ Atal Tunnel ➔ Naggar Castle ➔ Chandigarh',
    highlights: ['Romantic Candle-Light Dinner with Wine/Mocktail', 'Special Flower Bed Decoration on arrival night', 'Honeymoon Cake & Kesar Badam Milk', 'Private Cab exclusively for the couple', 'Naggar Castle & Art Gallery visit', 'Atal Tunnel & Solang Valley photo sessions'],
    itinerary: [
      { day: 1, title: 'Chandigarh to Manali Romantic Drive', description: 'Scenic hill drive with picturesque stops, arriving at your luxury honeymoon resort in Manali.' },
      { day: 2, title: 'Manali Local Romance & Nature Walks', description: 'Visit Hadimba Temple, Van Vihar cedar forest nature walk, Club House, and cozy cafes.' },
      { day: 3, title: 'Solang Valley & Atal Tunnel Adventure', description: 'Snow photography, couple cable car ride at Solang, and passing through Atal Tunnel.' },
      { day: 4, title: 'Naggar Castle & Jana Waterfall Picnic', description: 'Visit historic heritage Naggar Castle, Nicholas Roerich Art Gallery, and peaceful apple orchards.' },
      { day: 5, title: 'Manali to Chandigarh Return', description: 'Check out with unforgettable romantic memories and transfer to Chandigarh.' }
    ],
    inclusions: [
      'Dedicated AC Sedan / SUV for 5 days',
      '4 Nights in Luxury Honeymoon Valley-View Room',
      'Daily Breakfast and Gourmet Dinner',
      '1 Romantic Candle-light Dinner Setup',
      'Special Honeymoon Cake & Bed Decoration',
      'Tolls, taxes, and driver charges'
    ],
    exclusions: ['Activity tickets & personal purchases'],
    pickupLocation: 'Chandigarh / Delhi / Kalka',
    dropLocation: 'Chandigarh / Delhi',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'tour-4',
    title: 'Spiti Valley Grand Road Expedition (Kinnaur & Kaza Loop)',
    destinationName: 'Spiti Valley',
    duration: '8 Days / 7 Nights',
    category: 'Adventure Tours',
    shortDescription: 'The ultimate high-altitude road trip exploring Sangla, Chitkul, Kalpa, Nako, Tabo, Kaza, Key Monastery, and Chandratal Lake.',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    route: 'Chandigarh ➔ Shimla ➔ Sangla/Chitkul ➔ Kalpa ➔ Nako/Tabo ➔ Kaza ➔ Chandratal ➔ Manali ➔ Chandigarh',
    highlights: ['Complete Trans-Himalayan Spiti Circuit', 'Chitkul - The Last Inhabited Village of India', 'Thousand-Year-Old Tabo & Dhankar Monasteries', 'Key Monastery & World’s Highest Post Office in Hikkim', 'Camping near mystical Chandratal Lake', 'Experienced 4x4 / Mountain-expert SUV driver'],
    itinerary: [
      { day: 1, title: 'Chandigarh to Shimla / Narkanda', description: 'Ascend into the Shivaliks and halt at apple capital Narkanda.' },
      { day: 2, title: 'Narkanda to Sangla Valley & Chitkul', description: 'Drive along the roaring Sutlej and Baspa rivers into Chitkul, India’s last village on the Indo-Tibetan border.' },
      { day: 3, title: 'Chitkul to Kalpa (Kinner Kailash View)', description: 'Marvel at the sacred 6050m Kinner Kailash peak and apple orchards of Kalpa.' },
      { day: 4, title: 'Kalpa to Nako & Tabo Monastery', description: 'Enter the rain-shadow Spiti desert. Visit Nako Lake and the UNESCO-listed 1000-year-old Tabo Monastery.' },
      { day: 5, title: 'Tabo to Dhankar & Kaza', description: 'Explore cliff-hanging Dhankar Monastery, Pin Valley national park base, and reach Kaza capital.' },
      { day: 6, title: 'Kaza High-Altitude Villages (Hikkim, Komic, Langza, Key)', description: 'Visit the highest post office at Hikkim, highest village Komic, fossil village Langza, and iconic Key Monastery.' },
      { day: 7, title: 'Kaza to Chandratal Lake (Moon Lake)', description: 'Cross high Kunzum Pass (4590m) and reach turquoise Chandratal lake for glamping under the Milky Way.' },
      { day: 8, title: 'Chandratal to Manali & Chandigarh Return', description: 'Cross Batal, Gramphu, Atal Tunnel to Manali, and onwards to Chandigarh.' }
    ],
    inclusions: [
      'Heavy-duty Mountain SUV (Innova / Scorpio / Tempo 4x4)',
      '7 Nights stay in Mountain Homestays, Hotels & Swiss Tents',
      'Daily Breakfast & Dinner',
      'Inner-line permits assistance & environmental fees',
      'Fuel, tolls, parking and seasoned Spiti driver charges'
    ],
    exclusions: ['Personal medicines & oxygen cylinder rental (if requested)', 'Meals during road transit'],
    pickupLocation: 'Chandigarh / Shimla',
    dropLocation: 'Chandigarh / Delhi',
    isFeatured: true,
    isActive: true
  },
  {
    _id: 'tour-5',
    title: 'Dharamshala, Dalhousie & Khajjiar Peaceful Escape',
    destinationName: 'Kangra & Chamba Hills',
    duration: '5 Days / 4 Nights',
    category: 'Family Tours',
    shortDescription: 'A serene Himalayan journey featuring Tibetan tranquility in McLeodganj and the breathtaking green meadows of Khajjiar.',
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    route: 'Chandigarh ➔ Dharamshala ➔ McLeodganj ➔ Dalhousie ➔ Khajjiar ➔ Chandigarh',
    highlights: ['Mini Switzerland (Khajjiar Meadow) day picnic', 'Dalai Lama Temple & Tibetan cultural immersion', 'St. John Church in deodar forest', 'Dainkund Peak panoramic trek & Panchpula', 'Peaceful, unhurried family itinerary'],
    itinerary: [
      { day: 1, title: 'Chandigarh to Dharamshala Drive', description: 'Drive through Punjab foothills into Kangra Valley with views of the soaring snowbound Dhauladhar range.' },
      { day: 2, title: 'McLeodganj & Kangra Sightseeing', description: 'Explore Dalai Lama Monastery, Bhagsu Waterfall, HPCA Stadium, and local handicraft bazaars.' },
      { day: 3, title: 'Dharamshala to Dalhousie Hill Station', description: 'Picturesque drive to Dalhousie. Evening walk along Subhash Chowk and colonial churches.' },
      { day: 4, title: 'Full Day Khajjiar & Kalatop Forest Excursion', description: 'Spend a dreamy day at saucer-shaped Khajjiar meadow, pine forest walks, and zorbing.' },
      { day: 5, title: 'Dalhousie to Chandigarh Departure', description: 'Descent to plains with drop at Chandigarh airport or railway station.' }
    ],
    inclusions: [
      'Private Cab with seasoned mountain driver',
      '4 Nights hotel stay with breakfast and dinner',
      'All toll, tax, and parking charges',
      'Sightseeing across Kangra & Chamba'
    ],
    exclusions: ['Entry tickets & personal expenses'],
    pickupLocation: 'Chandigarh / Pathankot / Amritsar',
    dropLocation: 'Chandigarh / Amritsar',
    isFeatured: false,
    isActive: true
  },
  {
    _id: 'tour-6',
    title: 'Amritsar & Wagah Border 2-Day Cultural Tour',
    destinationName: 'Amritsar',
    duration: '2 Days / 1 Night',
    category: 'Weekend Trips',
    shortDescription: 'A soul-stirring cultural & patriotic weekend covering the Golden Temple, Jallianwala Bagh, and the patriotic Wagah Border ceremony.',
    thumbnail: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
    route: 'Chandigarh / Amritsar ➔ Golden Temple ➔ Jallianwala Bagh ➔ Wagah Border ➔ Departure',
    highlights: ['Harmandir Sahib (Golden Temple) Darshan & Langar', 'Guaranteed on-time Wagah Border seating transfer', 'Jallianwala Bagh Martyrdom Well & Museum', 'Famous Amritsari Street Food & Shopping Trail'],
    itinerary: [
      { day: 1, title: 'Arrival Amritsar & Wagah Border Ceremony', description: 'Pickup and hotel check-in. In afternoon, proceed to India-Pakistan Wagah Border to experience the electrifying retreat ceremony. Evening visit to the illuminated Golden Temple.' },
      { day: 2, title: 'Golden Temple, Jallianwala Bagh & Departure', description: 'Morning serene Darshan, visit Jallianwala Bagh, Partition Museum, and enjoy famous Amritsari Kulcha breakfast before drop.' }
    ],
    inclusions: ['AC Cab for all transfers and border trips', '1 Night 4-Star Hotel stay', 'Breakfast included', 'All taxes and parking'],
    exclusions: ['Lunches & personal shopping'],
    pickupLocation: 'Amritsar / Chandigarh',
    dropLocation: 'Amritsar / Chandigarh',
    isFeatured: false,
    isActive: true
  }
];

export const INITIAL_BLOGS = [
  {
    _id: 'blog-1',
    title: 'Complete Guide to Planning a Shimla Manali Tour: Best Season, Routes & Itinerary',
    slug: 'complete-guide-shimla-manali-tour-itinerary',
    category: 'Travel Guides',
    author: 'Sunil Thakur (Founder & Lead Mountain Guide)',
    readTime: '6 min read',
    publishedDate: '2026-08-15',
    featuredImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Everything you need to know about planning the perfect Shimla-Manali circuit: when to go for snow vs pleasant weather, how to choose the right cab, and must-visit attractions.',
    content: `
### Why the Shimla-Manali Circuit is India's Favorite Hill Holiday

The journey connecting Chandigarh to the colonial ridge of Shimla and onwards to the soaring cedar valleys of Manali represents the quintessential Himalayan road trip. Whether you are traveling as a newlywed couple, with energetic kids, or aging parents, this circuit delivers an unmatched blend of accessibility, alpine beauty, and modern hospitality.

#### 1. Best Time to Visit
- **Summer (April to June):** Perfect daytime temperatures (15°C to 28°C), clear roads, and blossoming apple orchards.
- **Monsoon (July to August):** Lush greenery, cascading waterfalls, but requires seasoned mountain drivers due to occasional landslides.
- **Autumn (September to November):** Crisp air, crystal-clear views of snow-dusted peaks, and festive vibes in Kullu.
- **Winter (December to February):** A winter wonderland with snowfall in Kufri, Solang Valley, and Old Manali.

#### 2. Ideal Duration and Route
The most relaxed and rewarding itinerary spans **6 Days / 5 Nights**:
- **Day 1:** Arrival at Chandigarh / Delhi & Scenic ascent to Shimla (approx. 3.5 - 4 hours from Chandigarh).
- **Day 2:** Shimla Heritage walk & Kufri snow activities.
- **Day 3:** Scenic drive through Pandoh Dam and Kullu Valley to Manali.
- **Day 4:** Manali local culture (Hadimba Temple, Vashisht Hot Springs, Old Manali).
- **Day 5:** Solang Valley, Atal Tunnel, and Sissu in Lahaul Valley.
- **Day 6:** Return journey to Chandigarh / Delhi.

#### 3. Essential Packing & Travel Tips
1. **Layered Clothing:** Even during summers, evenings in Manali can drop to 10°C. Carry at least one heavy jacket and thermal innerwear during winter.
2. **Vehicle Selection:** Always insist on a vehicle with a dedicated hill driver. Innova Crysta is recommended for groups of 4-6 for comfortable motion sickness prevention on hairpin bends.
3. **Advance Atal Tunnel & Rohtang Planning:** Ensure your tour operator arranges permits well in advance during peak season.
    `,
    tags: ['Himachal', 'Manali', 'Shimla', 'Itinerary', 'Road Trip'],
    published: true
  },
  {
    _id: 'blog-2',
    title: 'Spiti Valley Road Trip: Route Guide via Kinnaur vs Manali, Permits & Essentials',
    slug: 'spiti-valley-road-trip-route-permits-guide',
    category: 'Adventure Expeditions',
    author: 'Vikram Thakur (Senior Mountain Operations)',
    readTime: '8 min read',
    publishedDate: '2026-07-28',
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'An expert comparison of entering Spiti Valley via the gradual Shimla-Kinnaur route versus the dramatic Manali-Kaza pass, with vital acclimatization advice.',
    content: `
### Demystifying Spiti Valley: The Middle Land Between India and Tibet

Spiti Valley is not just a destination; it is an expedition into a world where rugged mountains meet ancient Buddhist wisdom. At average elevations exceeding 3,800 meters (12,500 feet), proper planning is the difference between a life-changing adventure and altitude sickness.

#### The Golden Rule: Always Choose the Shimla - Kinnaur - Spiti - Manali Loop
When embarking on the full Spiti circuit, we strongly advise starting from **Chandigarh via Shimla and Kinnaur** rather than ascending directly from Manali:
1. **Gradual Acclimatization:** Starting via Narkanda (2,700m), Sangla (2,600m), and Kalpa (2,960m) allows your body to gently adapt to higher altitudes, drastically reducing the risk of Acute Mountain Sickness (AMS).
2. **Unmissable Kinnaur Wonders:** You get to visit Chitkul (the last Indian village on the border with Tibet) and witness the sacred Kinner Kailash peak.
3. **High Passes at the End:** By the time you cross Kunzum Pass (4,590m) to reach Chandratal Lake and exit via Atal Tunnel to Manali, your body is fully acclimatized and energised.

#### Key Highlights You Must Not Miss in Spiti
- **Key Monastery:** The majestic 11th-century cliffside monastery overlooking the Spiti River.
- **Hikkim Post Office:** Send a handwritten postcard to your loved ones from 4,400 meters!
- **Komic Village:** Recognized as the highest village connected by a motorable road in Asia.
- **Chandratal (Moon Lake):** A mystical crescent-shaped turquoise lake nestled under towering glaciated peaks.
    `,
    tags: ['Spiti Valley', 'Kinnaur', 'Road Trip', 'Chandratal', 'Adventure'],
    published: true
  },
  {
    _id: 'blog-3',
    title: 'Top 7 Offbeat & Serene Places in Himachal Pradesh for Peace Seekers',
    slug: 'top-offbeat-places-in-himachal-pradesh',
    category: 'Hidden Gems',
    author: 'Editorial Team',
    readTime: '5 min read',
    publishedDate: '2026-06-10',
    featuredImage: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Escape the crowded tourist spots. Discover tranquil pine villages, untouched rivers, and serene homestays in Jibhi, Tirthan, Barot, and Shoja.',
    content: `
### Beyond the Beaten Path: The Serene Side of Devbhoomi Himachal

While Shimla and Manali have their undeniable charm, Himachal Pradesh holds hundreds of peaceful sanctuaries where the only sounds are rushing glacial rivers and pine winds.

#### 1. Tirthan Valley (Great Himalayan National Park Gateway)
Located near Aut, Tirthan Valley is celebrated for its crystal-clear trout river, peaceful traditional wooden architecture, and UNESCO-protected forests. It is an ideal haven for fly-fishing, slow walking, and birdwatching.

#### 2. Jibhi & Shoja
A sleepy village filled with cozy wooden treehouses, hidden freshwater waterfalls, and the scenic Jalori Pass connecting Kullu to Shimla district. The hike from Jalori Pass to the pristine Serolsar Lake is an easy 5 km walk suitable for all ages.

#### 3. Barot Valley
Hidden in Mandi district, Barot is an untouched valley famous for its heritage colonial hydel project, reservoir, and lush deodar forests along the Uhl River.

#### 4. Bir Billing
Renowned globally as the world's second-highest paragliding takeoff site, Bir is also a remarkably serene colony of Tibetan monasteries, organic tea gardens, and artistic cafes.
    `,
    tags: ['Offbeat', 'Tirthan Valley', 'Jibhi', 'Nature', 'Peaceful'],
    published: true
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    _id: 'test-1',
    name: 'Vikas Sood',
    location: 'Delhi NCR',
    rating: 5,
    source: 'Google Review',
    verified: true,
    message: 'Booked cab pickup from Amb Andaura Railway Station for our Vande Bharat arrival. Driver was already waiting at the platform exit. Spotless Dzire with very polite driver. Dropped us smoothly to Chintpurni temple and Dharamshala. Highly recommended!',
    trip: 'Amb Andaura Station Pickup to Dharamshala',
    isPublished: true
  },
  {
    _id: 'test-2',
    name: 'Rajesh & Suman Sharma',
    location: 'New Delhi',
    rating: 5,
    source: 'Google Review',
    verified: true,
    message: 'We booked the 6-day Shimla Manali family package with Thakur Tour & Travels. The Innova Crysta was spotless, and our driver Mr. Mohan was extremely courteous, knowledgeable, and careful on mountain hairpin roads. Genuine 5-star service!',
    trip: 'Shimla Manali 6-Day Family Tour',
    isPublished: true
  },
  {
    _id: 'test-3',
    name: 'Sunil Kumar Aggarwal',
    location: 'Ludhiana, Punjab',
    rating: 5,
    source: 'Google Review',
    verified: true,
    message: 'Excellent taxi service in Amb Andaura. We hired an Ertiga for 2 days covering Mata Chintpurni, Jawala Ji, and Baglamukhi temples. Very transparent pricing, no hidden charges, and extremely respectful driver. 10/10 service in Una HP.',
    trip: 'Himachal Shaktipeeth Pilgrimage Tour',
    isPublished: true
  },
  {
    _id: 'test-4',
    name: 'Dr. Amit & Neha Verma',
    location: 'Mumbai',
    rating: 5,
    source: 'Google Review',
    verified: true,
    message: 'Our honeymoon trip to Manali & Atal Tunnel was seamlessly arranged by Thakur Travels. The resort selected by the team had an unobstructed view of the Beas river and snow peaks. The candle light dinner and flower bed setup were top quality!',
    trip: 'Manali Luxury Honeymoon Package',
    isPublished: true
  },
  {
    _id: 'test-5',
    name: 'Harpreet Singh Sandhu',
    location: 'Chandigarh',
    rating: 5,
    source: 'Google Review',
    verified: true,
    message: 'We took a 17-seater luxury Force Tempo Traveller for our Spiti Valley group circuit. The vehicle had supreme comfort with pushback seats and our mountain captain navigated all tricky passes with zero hassle. Best agency in the region!',
    trip: 'Spiti Valley Group Expedition',
    isPublished: true
  },
  {
    _id: 'test-6',
    name: 'Ananya Deshmukh',
    location: 'Pune',
    rating: 5,
    source: 'Google Review',
    verified: true,
    message: 'As a solo female traveler visiting Dharamshala, McLeodganj and Dalhousie, safety was my topmost priority. Thakur Tour & Travels provided a vetted driver and 24/7 coordinator assistance throughout my stay. I felt completely safe and cared for.',
    trip: 'Dharamshala Dalhousie Tour',
    isPublished: true
  }
];

export const FAQS = [
  {
    q: 'How do I get a custom quote for my tour or cab booking?',
    a: 'Simply click any "Get Custom Quote" or "Book Now" button on our website, or send us a message via WhatsApp / Phone. Tell us your travel dates, pickup location (e.g. Chandigarh, Delhi), group size, and hotel preferences (Standard, Deluxe, or Luxury). Our trip specialist will share a tailored itinerary with an all-inclusive transparent quote within 15 minutes.'
  },
  {
    q: 'Why are prices not fixed directly on the website?',
    a: 'Because every mountain journey is unique! Hotel tariffs in Himachal fluctuate based on seasons, peak snow periods, room categories, and specific group requirements. Rather than quoting inflated or misleading fixed prices, we curate custom quotes tailored to your exact dates, vehicle preference, and hotel category to give you the best value for money.'
  },
  {
    q: 'Are your drivers trained for high-altitude mountain terrain?',
    a: 'Yes, 100%. All our chauffeurs are licensed, background-verified locals with a minimum of 8 to 15 years of mountain driving experience across Himachal, Spiti, and Ladakh. They are familiar with all weather conditions, snow chains, route short-cuts, and courteous tourist hospitality.'
  },
  {
    q: 'Where do you provide pickup and drop services?',
    a: 'We provide seamless doorstep pickups from Chandigarh Airport (IXC), Chandigarh Railway Station, New Delhi Airport (DEL) & Railway Stations, Kalka, Ambala, Amritsar, Manali, Shimla, and all surrounding North Indian hubs.'
  },
  {
    q: 'Can we customize the day-wise itinerary and hotel stays?',
    a: 'Absolutely! All our packages are 100% customizable. You can add extra days in Manali, include offbeat destinations like Jibhi or Sissu, upgrade to boutique treehouse resorts, or request cab-only services.'
  },
  {
    q: 'What is your booking and advance policy?',
    a: 'To confirm your holiday package or cab, a nominal advance token is processed to reserve your vehicle and hotel vouchers. The remaining balance can be paid conveniently during your tour.'
  }
];
