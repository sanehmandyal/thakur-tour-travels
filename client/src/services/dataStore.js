import {
  INITIAL_VEHICLES,
  INITIAL_DESTINATIONS,
  INITIAL_TOURS,
  INITIAL_BLOGS,
  INITIAL_TESTIMONIALS,
  DEFAULT_SETTINGS
} from './mockData';

const STORE_VERSION = 'v2026_authentic_destinations_v4';

const STORE_DEFAULTS = {
  vehicles: INITIAL_VEHICLES,
  destinations: INITIAL_DESTINATIONS,
  tours: INITIAL_TOURS,
  blog: INITIAL_BLOGS,
  testimonials: INITIAL_TESTIMONIALS,
  settings: DEFAULT_SETTINGS,
  bookings: [],
  inquiries: []
};

// Auto-migrate / seed if store version changed
export function ensureStoreInitialized() {
  try {
    const currentVer = localStorage.getItem('ttt_store_version');
    if (currentVer !== STORE_VERSION) {
      // Refresh default catalogs while keeping existing user bookings/inquiries if present
      const existingBookings = localStorage.getItem('ttt_bookings');
      const existingInquiries = localStorage.getItem('ttt_inquiries');

      localStorage.setItem('ttt_vehicles', JSON.stringify(INITIAL_VEHICLES));
      localStorage.setItem('ttt_destinations', JSON.stringify(INITIAL_DESTINATIONS));
      localStorage.setItem('ttt_tours', JSON.stringify(INITIAL_TOURS));
      localStorage.setItem('ttt_blog', JSON.stringify(INITIAL_BLOGS));
      localStorage.setItem('ttt_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
      localStorage.setItem('ttt_settings', JSON.stringify(DEFAULT_SETTINGS));

      if (!existingBookings) {
        localStorage.setItem('ttt_bookings', JSON.stringify([]));
      }
      if (!existingInquiries) {
        localStorage.setItem('ttt_inquiries', JSON.stringify([]));
      }

      localStorage.setItem('ttt_store_version', STORE_VERSION);
      window.dispatchEvent(new CustomEvent('ttt_store_change', { detail: { migrated: true } }));
    }
  } catch (e) {
    console.error('Store migration error', e);
  }
}

// Run immediately upon import
if (typeof window !== 'undefined') {
  ensureStoreInitialized();
}

// Get data from localStorage or default
export function getStore(resource) {
  const key = `ttt_${resource}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read store', resource, e);
  }
  const fallback = STORE_DEFAULTS[resource] || [];
  try {
    localStorage.setItem(key, JSON.stringify(fallback));
  } catch (e) {}
  return fallback;
}

// Set data to localStorage and notify all listeners
export function setStore(resource, data) {
  const key = `ttt_${resource}`;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('ttt_store_change', { detail: { resource, data } }));
  } catch (e) {
    console.error('Failed to write store', resource, e);
  }
}

// Add item to a resource list
export function addToStore(resource, item) {
  const list = getStore(resource);
  const newItem = {
    ...item,
    _id: item._id || `${resource.slice(0, 3)}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: item.createdAt || new Date().toISOString()
  };
  const updated = [newItem, ...list];
  setStore(resource, updated);
  return newItem;
}

// Update item in a resource list
export function updateInStore(resource, id, updates) {
  const list = getStore(resource);
  const updated = list.map((item) => (item._id === id ? { ...item, ...updates } : item));
  setStore(resource, updated);
  return updated;
}

// Delete item from a resource list
export function deleteFromStore(resource, id) {
  const list = getStore(resource);
  const updated = list.filter((item) => item._id !== id);
  setStore(resource, updated);
  return updated;
}

// Settings helpers
export function getSettingsStore() {
  return getStore('settings');
}

export function saveSettingsStore(newSettings) {
  setStore('settings', newSettings);
}
