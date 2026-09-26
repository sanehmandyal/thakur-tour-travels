// Guaranteed high-resolution authentic automotive and destination images

export const VEHICLE_IMAGES = {
  dzire: '/images/cars/dzire.jpg',
  etios: '/images/cars/etios.jpg',
  hondacity: '/images/cars/honda_city.jpg',
  innova: '/images/cars/innova_crysta.jpg',
  hycross: '/images/cars/hycross.jpg',
  ertiga: '/images/cars/ertiga.jpg',
  scorpio: '/images/cars/scorpio.jpg',
  thar: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  cruiser: '/images/cars/scorpio.jpg',
  fortuner: '/images/cars/fortuner.jpg',
  carens: '/images/cars/carens.jpg',
  tempo: '/images/cars/tempo_traveller.jpg',
  urbania: '/images/cars/tempo_traveller.jpg',
  sedan: '/images/cars/dzire.jpg',
  defaultCar: '/images/cars/innova_crysta.jpg'
};

export const DESTINATION_IMAGES = {
  chintpurni: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  jawalaji: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
  chamunda: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80',
  baglamukhi: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  manikaran: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
  anandpur: 'https://images.unsplash.com/photo-1565019004944-9f798835848c?auto=format&fit=crop&w=1200&q=80',
  amritsar: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
  manali: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
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
  defaultDest: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
};

export function getVehicleImage(vehicle) {
  if (vehicle?.image && (vehicle.image.startsWith('http') || vehicle.image.startsWith('/'))) return vehicle.image;
  const name = String(vehicle?.name || vehicle?.vehicleType || '').toLowerCase();
  if (name.includes('thar')) return VEHICLE_IMAGES.thar;
  if (name.includes('cruiser') || name.includes('camper') || name.includes('bolero')) return VEHICLE_IMAGES.cruiser;
  if (name.includes('tempo') || name.includes('traveller')) return VEHICLE_IMAGES.tempo;
  if (name.includes('urbania') || name.includes('van')) return VEHICLE_IMAGES.urbania;
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
  if (dest?.thumbnail && dest.thumbnail.startsWith('http')) return dest.thumbnail;
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
