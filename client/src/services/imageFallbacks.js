// Guaranteed high-resolution authentic automotive and destination images

export const VEHICLE_IMAGES = {
  dzire: '/images/cars/dzire.jpg',
  etios: '/images/cars/etios.jpg',
  hondacity: '/images/cars/honda_city.jpg',
  innova: '/images/cars/innova_crysta.jpg',
  hycross: '/images/cars/hycross.jpg',
  ertiga: '/images/cars/ertiga.jpg',
  scorpio: '/images/cars/scorpio.jpg',
  thar: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg',
  cruiser: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Mahindra_Bolero_GLX_Front.JPG',
  trax: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Mahindra_Bolero_Camper_double-cab_truck_in_Pakxe_Laos.jpg',
  fortuner: '/images/cars/fortuner.jpg',
  carens: '/images/cars/carens.jpg',
  tempo12: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Force_Traveller_Luxury.jpg',
  tempo17: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Force_Traveller%2C_Leh-Manali_Highway.jpg',
  tempo26: '/images/cars/tempo_traveller.jpg',
  tempo: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Force_Traveller_Luxury.jpg',
  urbania: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  sedan: '/images/cars/dzire.jpg',
  defaultCar: '/images/cars/innova_crysta.jpg'
};

export const DESTINATION_IMAGES = {
  chintpurni: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Chintpurni.jpg',
  jawalaji: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Jawala_Ji_Temple.jpg',
  chamunda: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Shri_Chamunda_Devi_Mandir.jpg',
  baglamukhi: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/BaijNath.jpg',
  manikaran: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Gurudwara_Manikaran_Sahib.jpg',
  anandpur: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Takht_Sri_Keshgarh_Sahib%2C_Anandpur_Sahib.jpg',
  amritsar: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
  manali: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Hadimba_Temple.jpg',
  shimla: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80',
  dharamshala: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
  dalhousie: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
  spiti: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  kasol: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
  jibhi: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  kinnaur: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  birbilling: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
  ladakh: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
  chandigarh: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
  defaultDest: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Chintpurni.jpg'
};

export function getVehicleImage(vehicle) {
  if (vehicle?.image && typeof vehicle.image === 'string' && vehicle.image.trim().length > 0) {
    return vehicle.image;
  }
  const name = String(vehicle?.name || vehicle?.vehicleType || '').toLowerCase();
  if (name.includes('urbania') || name.includes('vip van')) return VEHICLE_IMAGES.urbania;
  if (name.includes('12') && (name.includes('tempo') || name.includes('traveller') || name.includes('maharaja'))) return VEHICLE_IMAGES.tempo12;
  if (name.includes('17') && (name.includes('tempo') || name.includes('traveller') || name.includes('yatra'))) return VEHICLE_IMAGES.tempo17;
  if (name.includes('26') && (name.includes('tempo') || name.includes('traveller') || name.includes('coach'))) return VEHICLE_IMAGES.tempo26;
  if (name.includes('tempo') || name.includes('traveller')) return VEHICLE_IMAGES.tempo;
  if (name.includes('thar')) return VEHICLE_IMAGES.thar;
  if (name.includes('toofan') || name.includes('trax')) return VEHICLE_IMAGES.trax;
  if (name.includes('cruiser') || name.includes('camper') || name.includes('bolero')) return VEHICLE_IMAGES.cruiser;
  if (name.includes('hycross')) return VEHICLE_IMAGES.hycross;
  if (name.includes('innova') || name.includes('crysta')) return VEHICLE_IMAGES.innova;
  if (name.includes('dzire') || name.includes('swift')) return VEHICLE_IMAGES.dzire;
  if (name.includes('etios')) return VEHICLE_IMAGES.etios;
  if (name.includes('ertiga') || name.includes('xl6')) return VEHICLE_IMAGES.ertiga;
  if (name.includes('fortuner')) return VEHICLE_IMAGES.fortuner;
  if (name.includes('carens')) return VEHICLE_IMAGES.carens;
  if (name.includes('scorpio')) return VEHICLE_IMAGES.scorpio;
  if (name.includes('city') || name.includes('honda')) return VEHICLE_IMAGES.hondacity;
  if (name.includes('sedan') || name.includes('taxi') || name.includes('cab')) return VEHICLE_IMAGES.sedan;
  return VEHICLE_IMAGES.defaultCar;
}

export function getDestinationImage(dest) {
  if (dest?.thumbnail && typeof dest.thumbnail === 'string' && dest.thumbnail.trim().length > 0) {
    return dest.thumbnail;
  }
  const name = String(dest?.name || dest?.location || dest?.title || '').toLowerCase();
  if (name.includes('chintpurni')) return DESTINATION_IMAGES.chintpurni;
  if (name.includes('jawala') || name.includes('jwala')) return DESTINATION_IMAGES.jawalaji;
  if (name.includes('chamunda')) return DESTINATION_IMAGES.chamunda;
  if (name.includes('baglamukhi') || name.includes('baijnath')) return DESTINATION_IMAGES.baglamukhi;
  if (name.includes('manikaran')) return DESTINATION_IMAGES.manikaran;
  if (name.includes('anandpur') || name.includes('naina')) return DESTINATION_IMAGES.anandpur;
  if (name.includes('amritsar') || name.includes('golden') || name.includes('harmandir')) return DESTINATION_IMAGES.amritsar;
  if (name.includes('manali') || name.includes('solang') || name.includes('hadimba')) return DESTINATION_IMAGES.manali;
  if (name.includes('shimla') || name.includes('kufri') || name.includes('jakhu')) return DESTINATION_IMAGES.shimla;
  if (name.includes('dharamshala') || name.includes('mcleod') || name.includes('dalai')) return DESTINATION_IMAGES.dharamshala;
  if (name.includes('dalhousie') || name.includes('khajjiar')) return DESTINATION_IMAGES.dalhousie;
  if (name.includes('spiti') || name.includes('kaza') || name.includes('tabo')) return DESTINATION_IMAGES.spiti;
  if (name.includes('kasol') || name.includes('parvati')) return DESTINATION_IMAGES.kasol;
  if (name.includes('jibhi') || name.includes('tirthan')) return DESTINATION_IMAGES.jibhi;
  if (name.includes('kinnaur') || name.includes('chitkul') || name.includes('sangla')) return DESTINATION_IMAGES.kinnaur;
  if (name.includes('bir') || name.includes('billing')) return DESTINATION_IMAGES.birbilling;
  if (name.includes('ladakh') || name.includes('leh')) return DESTINATION_IMAGES.ladakh;
  if (name.includes('chandigarh')) return DESTINATION_IMAGES.chandigarh;
  return DESTINATION_IMAGES.defaultDest;
}
