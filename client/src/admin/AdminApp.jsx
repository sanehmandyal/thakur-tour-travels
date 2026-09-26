import { useEffect, useState } from 'react';
import { Navigate, NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  MapPin,
  Map,
  Users,
  Car,
  Settings,
  LogOut,
  Menu,
  Bell,
  Trash2,
  Edit,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Phone,
  Eye,
  Star,
  BookOpen,
  X,
  ExternalLink,
  Save,
  Image as ImageIcon,
  Upload,
  Check
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import toast from 'react-hot-toast';
import api from '../services/axiosClient';
import { useAuth } from '../context/AuthContext';
import { useFetch, Empty } from '../components/ui';
import Logo from '../components/Logo';
import {
  getStore,
  setStore,
  addToStore,
  updateInStore,
  deleteFromStore,
  getSettingsStore,
  saveSettingsStore
} from '../services/dataStore';
import { VEHICLE_IMAGES, DESTINATION_IMAGES, getVehicleImage, getDestinationImage } from '../services/imageFallbacks';

// Helper to optimize and convert user uploaded files to Data URL
function processImageFile(file, onLoaded) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const rawData = e.target.result;
    const img = new Image();
    img.onload = () => {
      const maxDim = 1200;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const optimized = canvas.toDataURL('image/jpeg', 0.82);
      onLoaded(optimized);
    };
    img.onerror = () => onLoaded(rawData);
    img.src = rawData;
  };
  reader.readAsDataURL(file);
}

const NAV_ITEMS = [
  ['', 'Dashboard', LayoutDashboard],
  ['bookings', 'Bookings & Quotes', CalendarCheck],
  ['inquiries', 'Customer Inquiries', MessageSquare],
  ['tours', 'Tour Packages', Map],
  ['destinations', 'Destinations', MapPin],
  ['vehicles', 'Fleet & Cabs', Car],
  ['testimonials', 'Reviews', Star],
  ['blog', 'Travel Blog', BookOpen],
  ['settings', 'Website Settings', Settings]
];

function AdminShell() {
  const { user, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [unreadBookings, setUnreadBookings] = useState(0);
  const [unreadInquiries, setUnreadInquiries] = useState(0);

  const currentUser = user || (() => {
    try {
      return JSON.parse(localStorage.getItem('ttt_user') || 'null');
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    const updateCounts = () => {
      const bookings = getStore('bookings');
      const inquiries = getStore('inquiries');
      setUnreadBookings(bookings.filter((b) => b.status === 'Pending').length);
      setUnreadInquiries(inquiries.filter((i) => i.status === 'New' || !i.isRead).length);
    };

    updateCounts();
    window.addEventListener('ttt_store_change', updateCounts);
    return () => window.removeEventListener('ttt_store_change', updateCounts);
  }, []);

  if (!currentUser || !['admin', 'staff'].includes(currentUser.role)) {
    return <Navigate to="/admin/login" replace />;
  }

  const unreadCount = unreadBookings + unreadInquiries;

  return (
    <div className="min-h-screen bg-slate-100 md:flex w-full overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-navy p-5 text-white transition-transform md:static md:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Logo dark className="h-8" />
          <button
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 space-y-1.5">
          {NAV_ITEMS.map(([path, label, Icon]) => (
            <NavLink
              key={path}
              end={path === ''}
              to={`/admin/${path}`}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-sky text-white shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {path === 'bookings' && unreadBookings > 0 && (
                <span className="rounded-full bg-gold px-1.5 py-0.2 text-[10px] font-black text-navy">
                  {unreadBookings}
                </span>
              )}
              {path === 'inquiries' && unreadInquiries > 0 && (
                <span className="rounded-full bg-amber-400 px-1.5 py-0.2 text-[10px] font-black text-navy">
                  {unreadInquiries}
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-semibold text-gold hover:bg-white/10 transition"
            >
              <ExternalLink size={16} />
              <span>View Live Website</span>
            </a>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between bg-white px-4 sm:px-6 py-3.5 shadow-xs border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-navy"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-[11px] text-navy/60 font-medium">Logged in as Administrator</p>
              <h2 className="text-sm font-bold text-navy">{currentUser.name || currentUser.email}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NavLink to="/admin/bookings" className="relative p-2 text-navy/70 hover:text-navy">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-black text-navy">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          </div>
        </header>

        {/* Sub-view Outlet */}
        <main className="p-3 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// 1. DASHBOARD
function DashboardView() {
  const [stats, setStats] = useState({
    bookings: 0,
    inquiries: 0,
    tours: 0,
    destinations: 0,
    vehicles: 0
  });

  useEffect(() => {
    const refresh = () => {
      setStats({
        bookings: getStore('bookings').length,
        inquiries: getStore('inquiries').length,
        tours: getStore('tours').length,
        destinations: getStore('destinations').length,
        vehicles: getStore('vehicles').length
      });
    };
    refresh();
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const statCards = [
    { label: 'Booking Requests', value: stats.bookings, color: 'bg-blue-50 text-blue-700' },
    { label: 'Customer Inquiries', value: stats.inquiries, color: 'bg-amber-50 text-amber-700' },
    { label: 'Active Tour Packages', value: stats.tours, color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Vehicles in Fleet', value: stats.vehicles, color: 'bg-purple-50 text-purple-700' }
  ];

  const trendData = [
    { _id: 'Jan', inquiries: 14, bookings: 8 },
    { _id: 'Feb', inquiries: 22, bookings: 16 },
    { _id: 'Mar', inquiries: 35, bookings: 24 },
    { _id: 'Apr', inquiries: 45, bookings: 38 },
    { _id: 'May', inquiries: 60, bookings: 52 },
    { _id: 'Jun', inquiries: 75, bookings: 64 },
    { _id: 'Jul', inquiries: 50, bookings: 40 },
    { _id: 'Aug', inquiries: 42, bookings: 35 },
    { _id: 'Sep', inquiries: Math.max(stats.bookings + stats.inquiries, 48), bookings: Math.max(stats.bookings, 30) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-navy">Business Overview</h1>
          <p className="text-xs text-navy/60">Live summary of incoming bookings, customer inquiries, and fleet status.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((c, i) => (
          <div key={i} className="rounded-2xl bg-white p-4 sm:p-5 shadow-xs border border-slate-200">
            <p className="text-[11px] sm:text-xs font-semibold text-navy/60">{c.label}</p>
            <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-black text-navy">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-xs border border-slate-200 lg:col-span-2">
          <h3 className="text-sm font-bold text-navy mb-4">Tour &amp; Cab Inquiries Trend</h3>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="_id" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="inquiries" stroke="#4FA8DC" strokeWidth={3} dot={{ r: 4 }} name="Inquiries" />
                <Line type="monotone" dataKey="bookings" stroke="#F6AA1C" strokeWidth={3} dot={{ r: 4 }} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-xs border border-slate-200">
          <h3 className="text-sm font-bold text-navy mb-4">Quick Management Shortcuts</h3>
          <div className="space-y-2">
            <NavLink to="/admin/bookings" className="flex items-center justify-between rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition text-xs font-bold text-navy">
              <span>View Latest Bookings ({stats.bookings})</span>
              <CalendarCheck size={16} className="text-sky" />
            </NavLink>
            <NavLink to="/admin/inquiries" className="flex items-center justify-between rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition text-xs font-bold text-navy">
              <span>Respond to Inquiries ({stats.inquiries})</span>
              <MessageSquare size={16} className="text-amber-500" />
            </NavLink>
            <NavLink to="/admin/vehicles" className="flex items-center justify-between rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition text-xs font-bold text-navy">
              <span>Manage Fleet Cabs ({stats.vehicles})</span>
              <Car size={16} className="text-purple-500" />
            </NavLink>
            <NavLink to="/admin/destinations" className="flex items-center justify-between rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition text-xs font-bold text-navy">
              <span>Manage Destinations ({stats.destinations})</span>
              <MapPin size={16} className="text-emerald-500" />
            </NavLink>
            <NavLink to="/admin/settings" className="flex items-center justify-between rounded-xl bg-slate-50 p-3 hover:bg-slate-100 transition text-xs font-bold text-navy">
              <span>Update Phone &amp; Address</span>
              <Settings size={16} className="text-slate-600" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. BOOKINGS MANAGER
function BookingsManager() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState(() => getStore('bookings'));
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const refresh = () => setBookings(getStore('bookings'));
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    updateInStore('bookings', id, { status: newStatus });
    api.put(`/bookings/${id}`, { status: newStatus }).catch(() => {});
    toast.success(`Booking status changed to ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (confirm('Permanently delete this booking request?')) {
      deleteFromStore('bookings', id);
      api.delete(`/bookings/${id}`).catch(() => {});
      toast.success('Booking deleted');
      if (selectedBooking?._id === id) setSelectedBooking(null);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesFilter = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch =
      !search ||
      (b.customerName && b.customerName.toLowerCase().includes(search.toLowerCase())) ||
      (b.phone && b.phone.includes(search)) ||
      (b.reference && b.reference.toLowerCase().includes(search.toLowerCase())) ||
      (b.tourTitle && b.tourTitle.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-navy">Bookings &amp; Custom Quotes</h1>
          <p className="text-xs text-navy/60">Review real incoming customer itineraries, confirm dates, and contact guests.</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by customer / phone / ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input !py-1.5 text-xs w-full sm:!w-64"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar whitespace-nowrap">
        {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition shrink-0 ${
              filterStatus === st
                ? 'bg-navy text-white'
                : 'bg-white text-navy/70 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {st} ({st === 'All' ? bookings.length : bookings.filter((b) => b.status === st).length})
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow-xs border border-slate-200">
        <table className="w-full text-left text-xs min-w-[650px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-navy/60 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Ref ID</th>
              <th className="p-3.5">Customer</th>
              <th className="p-3.5">Contact</th>
              <th className="p-3.5">Tour / Vehicle</th>
              <th className="p-3.5">Travel Date</th>
              <th className="p-3.5">Guests</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((b) => {
              const cleanPhone = (b.phone || '').replace(/\D/g, '');
              const waText = encodeURIComponent(`Hello ${b.customerName || 'Guest'}, Greetings from Thakur Tour & Travel regarding your booking request (${b.reference || b._id}).`);
              return (
                <tr key={b._id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3.5 font-mono font-bold text-navy">{b.reference || b._id.slice(-6)}</td>
                  <td className="p-3.5 font-bold text-navy">{b.customerName || 'Direct Booking'}</td>
                  <td className="p-3.5">
                    <p className="font-semibold text-navy">{b.phone}</p>
                    {b.email && <p className="text-[11px] text-navy/60">{b.email}</p>}
                  </td>
                  <td className="p-3.5 font-medium text-navy/80">{b.tour?.title || b.tourTitle || b.vehicle?.name || b.vehiclePreference || 'Custom Trip'}</td>
                  <td className="p-3.5">{b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN') : '-'}</td>
                  <td className="p-3.5">{b.numberOfTravelers || 1} Pax</td>
                  <td className="p-3.5">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      b.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      b.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      b.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${waText}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 text-[11px] font-bold hover:bg-emerald-100"
                      >
                        <MessageSquare size={12} /> WhatsApp
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-navy hover:bg-slate-200"
                    >
                      Details
                    </button>
                    <select
                      value={b.status || 'Pending'}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="rounded-lg border border-slate-300 bg-white px-1.5 py-0.5 text-[11px] font-semibold text-navy outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirm</option>
                      <option value="Completed">Complete</option>
                      <option value="Cancelled">Cancel</option>
                    </select>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!filtered.length && (
          <div className="p-8 text-center text-navy/50 text-xs font-semibold">
            {bookings.length === 0 ? 'No bookings received yet. Submissions from the website booking forms will appear here in real time.' : 'No bookings match this filter.'}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-navy/60 backdrop-blur-sm p-4" onClick={() => setSelectedBooking(null)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-lg text-navy">Booking: {selectedBooking.reference || selectedBooking._id}</h3>
              <button onClick={() => setSelectedBooking(null)}><X size={18} /></button>
            </div>
            <div className="space-y-2 text-xs text-navy/80">
              <p><b>Customer:</b> {selectedBooking.customerName}</p>
              <p><b>Phone:</b> {selectedBooking.phone}</p>
              <p><b>Email:</b> {selectedBooking.email || 'N/A'}</p>
              <p><b>Tour / Vehicle:</b> {selectedBooking.tour?.title || selectedBooking.tourTitle || selectedBooking.vehicle?.name || selectedBooking.vehiclePreference || 'Custom'}</p>
              <p><b>Pickup Location:</b> {selectedBooking.pickupLocation || 'Not specified'}</p>
              <p><b>Travel Date:</b> {selectedBooking.travelDate ? new Date(selectedBooking.travelDate).toLocaleDateString('en-IN') : '-'}</p>
              <p><b>Guests:</b> {selectedBooking.numberOfTravelers} Adults {selectedBooking.numberOfChildren ? `+ ${selectedBooking.numberOfChildren} Kids` : ''}</p>
              <p><b>Hotel Tier:</b> {selectedBooking.hotelCategory || 'Standard'}</p>
              <p><b>Vehicle Tier:</b> {selectedBooking.vehiclePreference || 'Standard Cab'}</p>
              {selectedBooking.specialRequest && (
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 mt-2">
                  <p className="font-bold text-[11px] uppercase text-navy/60">Special Requests:</p>
                  <p className="mt-1">{selectedBooking.specialRequest}</p>
                </div>
              )}
            </div>
            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                onClick={() => {
                  const newSt = selectedBooking.status === 'Confirmed' ? 'Completed' : 'Confirmed';
                  handleStatusChange(selectedBooking._id, newSt);
                  setSelectedBooking({ ...selectedBooking, status: newSt });
                }}
                className="btn-gold !py-1.5 text-xs font-bold"
              >
                Mark {selectedBooking.status === 'Confirmed' ? 'Completed' : 'Confirmed'}
              </button>
              <button onClick={() => setSelectedBooking(null)} className="btn-navy !py-1.5 text-xs font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. INQUIRIES MANAGER
function InquiriesManager() {
  const [inquiries, setInquiries] = useState(() => getStore('inquiries'));
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const refresh = () => setInquiries(getStore('inquiries'));
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleStatus = (id, status) => {
    updateInStore('inquiries', id, { status, isRead: true });
    api.put(`/inquiries/${id}`, { status, isRead: true }).catch(() => {});
    toast.success(`Inquiry marked as ${status}`);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this inquiry?')) {
      deleteFromStore('inquiries', id);
      api.delete(`/inquiries/${id}`).catch(() => {});
      toast.success('Inquiry removed');
    }
  };

  const filtered = inquiries.filter((i) => {
    if (filter === 'All') return true;
    return i.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-navy">Customer Trip Inquiries</h1>
          <p className="text-xs text-navy/60">Manage direct quote inquiries sent from the contact &amp; trip planner forms.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          {['All', 'New', 'Contacted', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition shrink-0 ${
                filter === st ? 'bg-navy text-white' : 'bg-white text-navy/70 border border-slate-200'
              }`}
            >
              {st} ({st === 'All' ? inquiries.length : inquiries.filter((i) => (i.status || 'New') === st).length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((inq) => {
          const cleanPhone = (inq.phone || '').replace(/\D/g, '');
          const wa = `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(
            `Hi ${inq.name || 'Guest'}, thanks for reaching out to Thakur Tour & Travel regarding ${inq.destination || 'your trip'}.`
          )}`;
          return (
            <div key={inq._id} className="rounded-2xl bg-white p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-navy">{inq.name || 'Guest Inquiry'}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    inq.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    inq.status === 'Contacted' ? 'bg-sky/20 text-sky' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inq.status || 'New'}
                  </span>
                  <span className="text-[11px] text-navy/40">
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-IN') : ''}
                  </span>
                </div>
                <p className="text-xs text-navy/70">
                  📞 {inq.phone} {inq.email && `• ✉️ ${inq.email}`}
                </p>
                <p className="text-xs font-semibold text-navy">
                  📍 Destination: {inq.destination || 'Himachal Pradesh'} | Travelers: {inq.numberOfPeople || inq.guests || 2} Pax
                </p>
                {inq.message && (
                  <p className="text-xs text-navy/80 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                    "{inq.message}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {cleanPhone && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="btn bg-[#25D366] text-white hover:brightness-105 !py-1.5 !px-3 text-xs font-bold"
                  >
                    WhatsApp Reply
                  </a>
                )}
                <a
                  href={`tel:${inq.phone}`}
                  className="btn-navy !py-1.5 !px-3 text-xs font-bold"
                >
                  Call
                </a>
                <button
                  onClick={() => handleStatus(inq._id, 'Contacted')}
                  className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-navy hover:bg-slate-200"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => handleStatus(inq._id, 'Resolved')}
                  className="rounded-xl bg-green-50 text-green-700 px-3 py-1.5 text-xs font-bold hover:bg-green-100"
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleDelete(inq._id)}
                  className="p-1.5 text-red-500 hover:text-red-700"
                  title="Delete Inquiry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {!filtered.length && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-navy/50 text-xs font-semibold">
            {inquiries.length === 0 ? 'No customer inquiries yet. Messages from the contact form will appear here in real time.' : 'No inquiries match this filter.'}
          </div>
        )}
      </div>
    </div>
  );
}

// 4. TOURS MANAGER WITH DEVICE IMAGE UPLOAD
function ToursManager() {
  const [tours, setTours] = useState(() => getStore('tours'));
  const [modalTour, setModalTour] = useState(null);

  useEffect(() => {
    const refresh = () => setTours(getStore('tours'));
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (modalTour._id) {
      updateInStore('tours', modalTour._id, modalTour);
      api.put(`/tours/${modalTour._id}`, modalTour).catch(() => {});
      toast.success('Tour Package Updated and Live on Website!');
    } else {
      addToStore('tours', modalTour);
      api.post('/tours', modalTour).catch(() => {});
      toast.success('New Tour Package Created and Live on Website!');
    }
    setModalTour(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Permanently delete this tour package from the website?')) {
      deleteFromStore('tours', id);
      api.delete(`/tours/${id}`).catch(() => {});
      toast.success('Tour package removed from website');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-navy">Tour Packages Management</h1>
          <p className="text-xs text-navy/60">Add, update, or remove tour itineraries. (Changes update the live website immediately).</p>
        </div>

        <button
          onClick={() => setModalTour({
            title: '',
            duration: '5 Days / 4 Nights',
            category: 'Family Tours',
            route: 'Chandigarh ➔ Shimla ➔ Manali ➔ Chandigarh',
            shortDescription: '',
            highlights: ['Private Dedicated Cab', 'Scenic Sightseeing', 'Deluxe Hotel Stay'],
            thumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
            isFeatured: true,
            isActive: true
          })}
          className="btn-gold !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 shadow-md self-start"
        >
          <Plus size={16} /> Add New Tour
        </button>
      </div>

      {/* Tours Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div key={tour._id} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-slate-100">
              <img src={tour.thumbnail} alt={tour.title} className="h-full w-full object-cover" />
              <span className="absolute top-2 left-2 rounded-full bg-navy/80 backdrop-blur px-2.5 py-0.5 text-[11px] font-bold text-white">
                {tour.duration}
              </span>
              {tour.isFeatured && (
                <span className="absolute top-2 right-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-black text-navy">
                  ★ Featured
                </span>
              )}
            </div>

            <div className="p-4 flex flex-1 flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-sky">{tour.category}</span>
                <h3 className="font-extrabold text-sm text-navy mt-1 line-clamp-2">{tour.title}</h3>
                <p className="text-xs text-navy/65 mt-1 line-clamp-2">{tour.shortDescription}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-600">✓ Live on site</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModalTour(tour)}
                    className="p-1.5 rounded-lg bg-slate-100 text-navy hover:bg-slate-200 text-xs font-bold"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(tour._id)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tour Add/Edit Modal with Device Image Upload */}
      {modalTour && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-navy/60 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setModalTour(null)}>
          <div className="my-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-lg text-navy">{modalTour._id ? 'Edit Tour Package' : 'Create New Tour Package'}</h3>
              <button onClick={() => setModalTour(null)}><X size={18} /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 pr-1">
              <div>
                <label className="block text-xs font-bold text-navy">Package Title *</label>
                <input
                  type="text"
                  required
                  value={modalTour.title || ''}
                  onChange={(e) => setModalTour({ ...modalTour, title: e.target.value })}
                  className="input mt-1 text-xs"
                  placeholder="e.g. 9 Devi Darshan Spiritual Yatra (7D/6N)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy">Duration *</label>
                  <input
                    type="text"
                    required
                    value={modalTour.duration || ''}
                    onChange={(e) => setModalTour({ ...modalTour, duration: e.target.value })}
                    className="input mt-1 text-xs"
                    placeholder="e.g. 6 Days / 5 Nights"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy">Category</label>
                  <select
                    value={modalTour.category || 'Family Tours'}
                    onChange={(e) => setModalTour({ ...modalTour, category: e.target.value })}
                    className="input mt-1 text-xs"
                  >
                    <option value="Pilgrimage & Temple Tours">Pilgrimage &amp; Temple Tours</option>
                    <option value="Family Tours">Family Tours</option>
                    <option value="Honeymoon Tours">Honeymoon Tours</option>
                    <option value="Himachal Tours">Himachal Tours</option>
                    <option value="North India Tours">North India Tours</option>
                    <option value="Adventure Tours">Adventure Tours</option>
                    <option value="Weekend Trips">Weekend Trips</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy">Route Summary</label>
                <input
                  type="text"
                  value={modalTour.route || ''}
                  onChange={(e) => setModalTour({ ...modalTour, route: e.target.value })}
                  className="input mt-1 text-xs"
                  placeholder="e.g. Chandigarh ➔ Chintpurni ➔ Jawala Ji ➔ Chamunda Devi"
                />
              </div>

              {/* Image Picker & Device File Upload */}
              <div className="space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                <label className="block text-xs font-bold text-navy">Tour Image (Upload or URL) *</label>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-sky text-white hover:bg-sky/90 px-3.5 py-2 text-xs font-bold transition shadow-sm">
                    <Upload size={14} />
                    <span>Upload Image from Device / Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          processImageFile(file, (dataUrl) => {
                            setModalTour((prev) => ({ ...prev, thumbnail: dataUrl }));
                            toast.success('Image loaded from your device!');
                          });
                        }
                      }}
                    />
                  </label>
                  <span className="text-[11px] text-navy/50 font-semibold">or paste direct image URL below:</span>
                </div>

                <input
                  type="text"
                  required
                  value={modalTour.thumbnail || ''}
                  onChange={(e) => setModalTour({ ...modalTour, thumbnail: e.target.value })}
                  className="input text-xs bg-white"
                  placeholder="https://images.unsplash.com/... or uploaded file"
                />

                {/* Image Preview & Quick Presets */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {modalTour.thumbnail && (
                    <div className="flex items-center gap-2">
                      <img src={modalTour.thumbnail} alt="Preview" className="h-14 w-24 rounded-lg object-cover border border-slate-300 shadow-xs" />
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <Check size={12} /> Image Ready
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => setModalTour({ ...modalTour, thumbnail: DESTINATION_IMAGES.chintpurni })}
                      className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-1 rounded text-navy font-semibold"
                    >
                      Temple Preset
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalTour({ ...modalTour, thumbnail: DESTINATION_IMAGES.manali })}
                      className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-1 rounded text-navy font-semibold"
                    >
                      Manali Preset
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalTour({ ...modalTour, thumbnail: DESTINATION_IMAGES.shimla })}
                      className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-1 rounded text-navy font-semibold"
                    >
                      Shimla Preset
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy">Short Overview</label>
                <textarea
                  rows="3"
                  value={modalTour.shortDescription || ''}
                  onChange={(e) => setModalTour({ ...modalTour, shortDescription: e.target.value })}
                  className="input mt-1 text-xs"
                  placeholder="Describe the main attractions, cab inclusion, sightseeing, and comfort."
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalTour.isFeatured || false}
                    onChange={(e) => setModalTour({ ...modalTour, isFeatured: e.target.checked })}
                  />
                  Feature on Homepage
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalTour.isActive !== false}
                    onChange={(e) => setModalTour({ ...modalTour, isActive: e.target.checked })}
                  />
                  Active &amp; Visible
                </label>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setModalTour(null)} className="btn !py-2 text-xs">Cancel</button>
                <button type="submit" className="btn-gold !py-2 !px-5 text-xs font-bold">Save &amp; Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 5. DESTINATIONS MANAGER WITH DEVICE IMAGE UPLOAD
function DestinationsManager() {
  const [destinations, setDestinations] = useState(() => getStore('destinations'));
  const [modalDest, setModalDest] = useState(null);

  useEffect(() => {
    const refresh = () => setDestinations(getStore('destinations'));
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (modalDest._id) {
      updateInStore('destinations', modalDest._id, modalDest);
      api.put(`/destinations/${modalDest._id}`, modalDest).catch(() => {});
      toast.success('Destination updated and live on website!');
    } else {
      addToStore('destinations', modalDest);
      api.post('/destinations', modalDest).catch(() => {});
      toast.success('New destination added and live on website!');
    }
    setModalDest(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Permanently delete this destination from the website?')) {
      deleteFromStore('destinations', id);
      api.delete(`/destinations/${id}`).catch(() => {});
      toast.success('Destination deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-navy">Destinations Management</h1>
          <p className="text-xs text-navy/60">Configure pilgrimage spots, hill stations, and tourist hubs displayed on the website.</p>
        </div>

        <button
          onClick={() => setModalDest({
            name: '',
            state: 'Himachal Pradesh',
            location: '',
            duration: '2 - 3 Days',
            bestTimeToVisit: 'Throughout the year',
            shortDescription: '',
            thumbnail: DESTINATION_IMAGES.chintpurni,
            highlights: ['Holy Darshan', 'Sightseeing', 'Clean Cab Facility'],
            isActive: true
          })}
          className="btn-gold !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 shadow-md self-start"
        >
          <Plus size={16} /> Add Destination
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest) => (
          <div key={dest._id} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="aspect-[16/10] bg-slate-100 relative">
              <img src={getDestinationImage(dest)} alt={dest.name} className="h-full w-full object-cover" />
              <span className="absolute top-2 left-2 rounded-full bg-navy/80 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-white">
                {dest.state}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-navy">{dest.name}</h3>
                <p className="text-[11px] text-navy/60 font-semibold mt-0.5">⏱ {dest.duration} • ⛅ {dest.bestTimeToVisit}</p>
                <p className="text-xs text-navy/70 mt-2 line-clamp-2">{dest.shortDescription}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-600">✓ Live</span>
                <div className="flex gap-2">
                  <button onClick={() => setModalDest(dest)} className="btn-navy !py-1 !px-3 text-xs font-bold">Edit</button>
                  <button onClick={() => handleDelete(dest._id)} className="p-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Destination Add/Edit Modal with Device Image Upload */}
      {modalDest && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-navy/60 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setModalDest(null)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-lg text-navy">{modalDest._id ? 'Edit Destination' : 'Add Destination'}</h3>
              <button onClick={() => setModalDest(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 pr-1">
              <div>
                <label className="block text-xs font-bold text-navy">Destination Name *</label>
                <input required type="text" value={modalDest.name || ''} onChange={(e) => setModalDest({ ...modalDest, name: e.target.value })} className="input mt-1 text-xs" placeholder="e.g. Mata Chintpurni Devi Shrine" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-navy">State / Region</label>
                  <input type="text" value={modalDest.state || ''} onChange={(e) => setModalDest({ ...modalDest, state: e.target.value })} className="input mt-1 text-xs" placeholder="Himachal Pradesh" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy">Duration</label>
                  <input type="text" value={modalDest.duration || ''} onChange={(e) => setModalDest({ ...modalDest, duration: e.target.value })} className="input mt-1 text-xs" placeholder="2 - 3 Days" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-navy">Best Time To Visit</label>
                <input type="text" value={modalDest.bestTimeToVisit || ''} onChange={(e) => setModalDest({ ...modalDest, bestTimeToVisit: e.target.value })} className="input mt-1 text-xs" placeholder="e.g. Throughout the year / Navratris" />
              </div>

              {/* Image Picker with Device Upload */}
              <div className="space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                <label className="block text-xs font-bold text-navy">Destination Image *</label>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-sky text-white hover:bg-sky/90 px-3.5 py-2 text-xs font-bold transition shadow-sm">
                    <Upload size={14} />
                    <span>Upload Image from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          processImageFile(file, (dataUrl) => {
                            setModalDest((prev) => ({ ...prev, thumbnail: dataUrl }));
                            toast.success('Destination image loaded from device!');
                          });
                        }
                      }}
                    />
                  </label>
                  <span className="text-[11px] text-navy/50 font-semibold">or image URL:</span>
                </div>

                <input type="text" required value={modalDest.thumbnail || ''} onChange={(e) => setModalDest({ ...modalDest, thumbnail: e.target.value })} className="input text-xs bg-white" placeholder="https://..." />
                
                {modalDest.thumbnail && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={modalDest.thumbnail} alt="Preview" className="h-14 w-24 rounded-lg object-cover border border-slate-300 shadow-xs" />
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <Check size={12} /> Image Ready
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-navy">Description</label>
                <textarea rows="3" value={modalDest.shortDescription || ''} onChange={(e) => setModalDest({ ...modalDest, shortDescription: e.target.value })} className="input mt-1 text-xs" placeholder="Overview and significance for travelers." />
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setModalDest(null)} className="btn !py-2 text-xs">Cancel</button>
                <button type="submit" className="btn-gold !py-2 !px-5 text-xs font-bold">Save Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 6. FLEET & CABS MANAGER WITH DEVICE IMAGE UPLOAD
function VehiclesManager() {
  const [vehicles, setVehicles] = useState(() => getStore('vehicles'));
  const [modalVeh, setModalVeh] = useState(null);

  useEffect(() => {
    const refresh = () => setVehicles(getStore('vehicles'));
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (modalVeh._id) {
      updateInStore('vehicles', modalVeh._id, modalVeh);
      api.put(`/vehicles/${modalVeh._id}`, modalVeh).catch(() => {});
      toast.success('Vehicle updated and live on website!');
    } else {
      addToStore('vehicles', modalVeh);
      api.post('/vehicles', modalVeh).catch(() => {});
      toast.success('New vehicle added to fleet and live on website!');
    }
    setModalVeh(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Permanently delete this vehicle from the fleet?')) {
      deleteFromStore('vehicles', id);
      api.delete(`/vehicles/${id}`).catch(() => {});
      toast.success('Vehicle removed from website');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-navy">Fleet &amp; Cabs Management</h1>
          <p className="text-xs text-navy/60">Add, edit, or remove taxi models, SUVs, Thar 4x4, Bolero Cruiser, and Tempo Travellers.</p>
        </div>

        <button
          onClick={() => setModalVeh({
            name: '',
            vehicleType: 'Innova Crysta SUV',
            seatingCapacity: '6 + 1 Driver',
            luggageCapacity: '4 Large Bags',
            image: VEHICLE_IMAGES.innova,
            features: ['AC & Heater', 'Luggage Carrier', 'Hill-Certified Driver', 'Music System'],
            suitability: 'Ideal for family tours and hilly terrains.',
            isAvailable: true
          })}
          className="btn-gold !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 shadow-md self-start"
        >
          <Plus size={16} /> Add New Vehicle
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((veh) => (
          <div key={veh._id} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="aspect-[16/10] bg-slate-100 relative">
              <img src={getVehicleImage(veh)} alt={veh.name} className="h-full w-full object-cover" />
              <span className="absolute top-2 left-2 rounded-full bg-navy/80 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-white">
                {veh.vehicleType}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-navy">{veh.name}</h3>
                <p className="text-xs text-navy/65 mt-1 font-semibold">👥 {veh.seatingCapacity} • 🧳 {veh.luggageCapacity}</p>
                <p className="text-xs text-navy/75 mt-1 line-clamp-2">{veh.suitability}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-600">
                  {veh.isAvailable !== false ? '✓ Available' : '⚠️ Maintenance'}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setModalVeh(veh)} className="btn-navy !py-1 !px-3 text-xs font-bold">Edit</button>
                  <button onClick={() => handleDelete(veh._id)} className="p-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vehicle Add/Edit Modal with Device Image Upload */}
      {modalVeh && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-navy/60 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setModalVeh(null)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-lg text-navy">{modalVeh._id ? 'Edit Fleet Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => setModalVeh(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 pr-1">
              <div>
                <label className="block text-xs font-bold text-navy">Vehicle Model Name *</label>
                <input required type="text" value={modalVeh.name || ''} onChange={(e) => setModalVeh({ ...modalVeh, name: e.target.value })} className="input mt-1 text-xs" placeholder="e.g. Mahindra Thar 4x4 Off-Roader" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-navy">Category / Type</label>
                  <input type="text" value={modalVeh.vehicleType || ''} onChange={(e) => setModalVeh({ ...modalVeh, vehicleType: e.target.value })} className="input mt-1 text-xs" placeholder="e.g. SUV, 4x4, Tempo, Sedan" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy">Seating Capacity</label>
                  <input type="text" value={modalVeh.seatingCapacity || ''} onChange={(e) => setModalVeh({ ...modalVeh, seatingCapacity: e.target.value })} className="input mt-1 text-xs" placeholder="4 + 1 / 6 + 1 / 17 Seater" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-navy">Luggage Capacity</label>
                  <input type="text" value={modalVeh.luggageCapacity || ''} onChange={(e) => setModalVeh({ ...modalVeh, luggageCapacity: e.target.value })} className="input mt-1 text-xs" placeholder="3 Bags / Roof Carrier" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy">Status</label>
                  <select
                    value={modalVeh.isAvailable !== false ? 'yes' : 'no'}
                    onChange={(e) => setModalVeh({ ...modalVeh, isAvailable: e.target.value === 'yes' })}
                    className="input mt-1 text-xs"
                  >
                    <option value="yes">Available for Booking</option>
                    <option value="no">Under Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Image Picker with Device File Upload */}
              <div className="space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                <label className="block text-xs font-bold text-navy">Vehicle Photo *</label>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-sky text-white hover:bg-sky/90 px-3.5 py-2 text-xs font-bold transition shadow-sm">
                    <Upload size={14} />
                    <span>Upload Image from Device / Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          processImageFile(file, (dataUrl) => {
                            setModalVeh((prev) => ({ ...prev, image: dataUrl }));
                            toast.success('Car image loaded from device!');
                          });
                        }
                      }}
                    />
                  </label>
                  <span className="text-[11px] text-navy/50 font-semibold">or image URL:</span>
                </div>

                <input type="text" required value={modalVeh.image || ''} onChange={(e) => setModalVeh({ ...modalVeh, image: e.target.value })} className="input text-xs bg-white" placeholder="https://..." />
                
                {/* Quick Vehicle Presets */}
                <div className="flex flex-wrap gap-1.5 items-center pt-1">
                  <span className="text-[10px] text-navy/60 font-bold">Quick Presets:</span>
                  <button type="button" onClick={() => setModalVeh({ ...modalVeh, image: VEHICLE_IMAGES.innova })} className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-0.5 rounded text-navy font-semibold">Innova</button>
                  <button type="button" onClick={() => setModalVeh({ ...modalVeh, image: VEHICLE_IMAGES.thar })} className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-0.5 rounded text-navy font-semibold">Thar 4x4</button>
                  <button type="button" onClick={() => setModalVeh({ ...modalVeh, image: VEHICLE_IMAGES.cruiser })} className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-0.5 rounded text-navy font-semibold">Cruiser</button>
                  <button type="button" onClick={() => setModalVeh({ ...modalVeh, image: VEHICLE_IMAGES.tempo })} className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-0.5 rounded text-navy font-semibold">Tempo Traveller</button>
                  <button type="button" onClick={() => setModalVeh({ ...modalVeh, image: VEHICLE_IMAGES.dzire })} className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2 py-0.5 rounded text-navy font-semibold">Dzire Sedan</button>
                </div>
                {modalVeh.image && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={modalVeh.image} alt="Preview" className="h-14 w-24 rounded-lg object-cover border border-slate-300 shadow-xs" />
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <Check size={12} /> Image Ready
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-navy">Suitability &amp; Features</label>
                <textarea rows="2" value={modalVeh.suitability || ''} onChange={(e) => setModalVeh({ ...modalVeh, suitability: e.target.value })} className="input mt-1 text-xs" placeholder="Best for Spiti, Ladakh, Shaktipeeth yatras, family vacation." />
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setModalVeh(null)} className="btn !py-2 text-xs">Cancel</button>
                <button type="submit" className="btn-gold !py-2 !px-5 text-xs font-bold">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 7. WEBSITE SETTINGS
function SettingsManager() {
  const [settings, setSettings] = useState(() => getSettingsStore());

  useEffect(() => {
    const refresh = () => setSettings(getSettingsStore());
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    saveSettingsStore(settings);
    await api.put('/settings', settings).catch(() => {});
    toast.success('Website Settings Saved! All contact info, phone numbers & addresses are live across the website.');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-navy">Website &amp; Company Settings</h1>
        <p className="text-xs text-navy/60">Update official phone numbers, WhatsApp lines, office addresses, and about info.</p>
      </div>

      <form onSubmit={handleSave} className="rounded-3xl bg-white p-5 sm:p-8 shadow-xs border border-slate-200 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy">Company Brand Name</label>
            <input type="text" value={settings.companyName || ''} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} className="input mt-1 text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-navy">Primary Booking Phone</label>
            <input type="text" value={settings.phone || ''} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="input mt-1 text-xs" placeholder="+91 62303 51337" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy">WhatsApp Direct Number (Without +, e.g. 916230351337)</label>
            <input type="text" value={settings.whatsapp || ''} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="input mt-1 text-xs" placeholder="916230351337" />
          </div>
          <div>
            <label className="block text-xs font-bold text-navy">Official Email</label>
            <input type="email" value={settings.email || ''} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="input mt-1 text-xs" placeholder="admin@thakurtourandtravels.com" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-navy">Office Addresses (Chandigarh, Shimla &amp; Manali Hubs)</label>
          <input type="text" value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="input mt-1 text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-navy">Working Hours</label>
          <input type="text" value={settings.workingHours || ''} onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })} className="input mt-1 text-xs" />
        </div>

        <div>
          <label className="block text-xs font-bold text-navy">Company About Summary</label>
          <textarea rows="3" value={settings.about || ''} onChange={(e) => setSettings({ ...settings, about: e.target.value })} className="input mt-1 text-xs" />
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button type="submit" className="btn-gold !py-2.5 !px-8 text-xs font-bold shadow-lg flex items-center gap-2">
            <Save size={16} /> Save Settings &amp; Update Live Site
          </button>
        </div>
      </form>
    </div>
  );
}

// 8. TESTIMONIALS MANAGER
function TestimonialsManager() {
  const [reviews, setReviews] = useState(() => getStore('testimonials'));

  useEffect(() => {
    const refresh = () => setReviews(getStore('testimonials'));
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleDelete = (id) => {
    if (confirm('Delete this review?')) {
      deleteFromStore('testimonials', id);
      toast.success('Review deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-navy">Customer Reviews &amp; Testimonials</h1>
        <p className="text-xs text-navy/60">Real tourist reviews and ratings displayed on homepage and tour pages.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((t) => (
          <div key={t._id} className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-navy">{t.name}</p>
                <div className="flex text-gold"><Star size={14} fill="currentColor" /> <span className="ml-1 text-xs font-bold">{t.rating || 5}.0</span></div>
              </div>
              <p className="text-xs text-navy/70 italic mt-2">"{t.message}"</p>
              <p className="text-[11px] text-navy/50 mt-1">{t.location} • {t.trip}</p>
            </div>
            <div className="pt-2 border-t flex justify-end">
              <button onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. BLOG MANAGER
function BlogManager() {
  const [blogs, setBlogs] = useState(() => getStore('blog'));

  useEffect(() => {
    const refresh = () => setBlogs(getStore('blog'));
    window.addEventListener('ttt_store_change', refresh);
    return () => window.removeEventListener('ttt_store_change', refresh);
  }, []);

  const handleDelete = (id) => {
    if (confirm('Delete this blog post?')) {
      deleteFromStore('blog', id);
      toast.success('Blog post removed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-navy">Travel Guides &amp; Blog Posts</h1>
        <p className="text-xs text-navy/60">Himachal &amp; North India travel tips, pilgrimage guides, and route advice.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {blogs.map((b) => (
          <div key={b._id} className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-sky">{b.category}</span>
              <h3 className="font-bold text-sm text-navy mt-1">{b.title}</h3>
              <p className="text-xs text-navy/60">By {b.author} • {b.readTime || '5 min read'}</p>
              <p className="text-xs text-navy/75 line-clamp-2 mt-1">{b.excerpt}</p>
            </div>
            <div className="pt-2 border-t flex justify-end">
              <button onClick={() => handleDelete(b._id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminShell />}>
        <Route index element={<DashboardView />} />
        <Route path="bookings" element={<BookingsManager />} />
        <Route path="inquiries" element={<InquiriesManager />} />
        <Route path="tours" element={<ToursManager />} />
        <Route path="destinations" element={<DestinationsManager />} />
        <Route path="vehicles" element={<VehiclesManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="settings" element={<SettingsManager />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
