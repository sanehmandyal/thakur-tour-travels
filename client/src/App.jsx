import { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';

const Destinations = lazy(() => import('./pages/Destinations'));
const Tours = lazy(() => import('./pages/Tours'));
const Cabs = lazy(() => import('./pages/Cabs'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./admin/AdminApp'));

const NotFound = () => (
  <div className="mx-auto max-w-xl px-4 py-24 text-center">
    <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold uppercase text-amber-900">404 Error</span>
    <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">Oops! This journey doesn't exist.</h1>
    <p className="mt-2 text-xs text-navy/70">The page you were looking for could not be found or has moved.</p>
    <div className="mt-6 flex justify-center gap-3">
      <Link to="/" className="btn-navy text-xs font-bold">Back to Home</Link>
      <Link to="/tours" className="btn-gold text-xs font-bold">Explore Tour Packages</Link>
    </div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy border-t-gold mx-auto" />
          <p className="text-xs font-bold text-navy uppercase tracking-wider">Loading Thakur Tour &amp; Travels…</p>
        </div>
      </div>
    }>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login admin />} />
        <Route path="/admin/*" element={<Admin />} />

        {/* Public 7-Page Website */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="tours" element={<Tours />} />
          <Route path="cabs" element={<Cabs />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
