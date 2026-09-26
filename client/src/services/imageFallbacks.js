// Guaranteed high-resolution authentic automotive and destination images

export const VEHICLE_IMAGES = {
  cruiser: '/images/cars/cruiser.jpg',
  trax: '/images/cars/cruiser.jpg',
  toofan: '/images/cars/cruiser.jpg',
  tempo: '/images/cars/tempo_traveller.jpg',
  tempo12: '/images/cars/tempo_traveller.jpg',
  tempo17: '/images/cars/tempo_traveller.jpg',
  tempo26: '/images/cars/tempo_traveller.jpg',
  innova: '/images/cars/innova_crysta.jpg',
  crysta: '/images/cars/innova_crysta.jpg',
  hycross: '/images/cars/hycross.jpg',
  dzire: '/images/cars/dzire.jpg',
  swift: '/images/cars/swift.jpg',
  ertiga: '/images/cars/ertiga.jpg',
  scorpio: '/images/cars/scorpio.jpg',
  bolero: '/images/cars/bolero.jpg',
  thar: '/images/cars/thar.jpg',
  fortuner: '/images/cars/fortuner.jpg',
  etios: '/images/cars/etios.jpg',
  carens: '/images/cars/carens.jpg',
  hondacity: '/images/cars/honda_city.jpg',
  urbania: '/images/cars/tempo_traveller.jpg',
  sedan: '/images/cars/dzire.jpg',
  defaultCar: '/images/cars/cruiser.jpg'
};

export const DESTINATION_IMAGES = {
  chintpurni: '/images/destinations/chintpurni.jpg',
  jawalaji: '/images/destinations/jawalaji.jpg',
  chamunda: '/images/destinations/chamunda.jpg',
  kangra: '/images/destinations/kangra.jpg',
  baglamukhi: '/images/destinations/baglamukhi.jpg',
  baijnath: '/images/destinations/baijnath.jpg',
  manikaran: '/images/destinations/manikaran.jpg',
  anandpur: '/images/destinations/anandpur.jpg',
  nainadevi: '/images/destinations/nainadevi.jpg',
  amritsar: '/images/destinations/amritsar.jpg',
  hadimba: '/images/destinations/hadimba.jpg',
  manali: '/images/destinations/hadimba.jpg',
  shimla: '/images/destinations/shimla.jpg',
  dharamshala: '/images/destinations/dharamshala.jpg',
  mcleodganj: '/images/destinations/mcleodganj.jpg',
  dalhousie: '/images/destinations/dalhousie.jpg',
  spiti: '/images/destinations/spiti.jpg',
  kasol: '/images/destinations/kasol.jpg',
  jibhi: '/images/destinations/jibhi.jpg',
  kinnaur: '/images/destinations/kinnaur.jpg',
  chitkul: '/images/destinations/chitkul.jpg',
  birbilling: '/images/destinations/birbilling.jpg',
  khajjiar: '/images/destinations/khajjiar.jpg',
  chandigarh: '/images/destinations/shimla.jpg',
  defaultDest: '/images/destinations/chintpurni.jpg'
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
  if (name.includes('creta')) return VEHICLE_IMAGES.creta;
  if (name.includes('xuv700') || name.includes('xuv')) return VEHICLE_IMAGES.xuv700;
  if (name.includes('safari')) return VEHICLE_IMAGES.safari;
  if (name.includes('harrier')) return VEHICLE_IMAGES.harrier;
  if (name.includes('rumion')) return VEHICLE_IMAGES.rumion;
  if (name.includes('vitara') || name.includes('grand vitara')) return VEHICLE_IMAGES.grandvitara;
  if (name.includes('neo') || (name.includes('bolero') && name.includes('plus'))) return VEHICLE_IMAGES.boleroneo;
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
