import { useState } from 'react';
import { Clock, User, Calendar, Tag, ArrowRight, X, Sparkles, BookOpen, Share2, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useFetch, Skeleton, Empty, SectionHeader } from '../components/ui';
import BookingModal from '../components/BookingModal';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const { data, loading, error } = useFetch('/blog', {
    category: selectedCategory !== 'All' ? selectedCategory : undefined
  });

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Thakur Tour & Travel - Mountain Guides & Travel Blog',
    'description': 'Comprehensive guides, itineraries, weather updates, and packing advice for Himachal Pradesh, Spiti Valley, and North India.',
    'blogPost': (data?.items || []).map((b) => ({
      '@type': 'BlogPosting',
      'headline': b.title,
      'image': b.featuredImage,
      'author': {
        '@type': 'Person',
        'name': b.author || 'Thakur Tour & Travel Editorial Team'
      },
      'datePublished': b.publishedDate || '2026-08-01',
      'description': b.excerpt
    }))
  };

  const categories = ['All', 'Travel Guides', 'Adventure Expeditions', 'Hidden Gems', 'Road Trips'];

  return (
    <>
      <SEO
        title="Himachal & North India Travel Guides & Tips | Thakur Tour & Travel"
        description="Read expert mountain travel guides, Shimla-Manali itineraries, Spiti Valley route advice, Atal Tunnel rules, and high-altitude packing tips by Thakur Tour & Travel."
        keywords="himachal travel guide, manali itinerary guide, spiti valley road trip guide, rohtang pass tips, best time to visit himachal, thakur travel blog"
        schema={blogSchema}
      />

      {/* Hero Banner */}
      <div className="relative bg-navy py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <span className="rounded-full bg-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
            Expert Mountain Insights
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Travel Guides &amp; Mountain Blog
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
            Essential tips, route comparisons, permit guidelines, and offbeat recommendations written by seasoned Himalayan travel veterans.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-slate-100 text-navy/80 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <Skeleton n={3} />
        ) : error ? (
          <Empty text={error} />
        ) : !data?.items?.length ? (
          <Empty text="No articles published in this category yet." />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((art) => (
              <article
                key={art._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Featured Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    loading="lazy"
                    src={art.featuredImage || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'}
                    alt={art.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-navy/85 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-[11px] text-navy/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-sky" /> {art.readTime || '5 min read'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-sky" /> {art.publishedDate || '2026'}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-navy group-hover:text-sky transition leading-snug">
                    {art.title}
                  </h2>

                  <p className="mt-2 text-xs text-navy/70 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>

                  {/* Tags */}
                  {art.tags && art.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {art.tags.map((tag, idx) => (
                        <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-navy/70">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Trigger */}
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(art)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy group-hover:text-sky transition"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight size={14} className="transition transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Full Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="my-8 w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-navy/60 backdrop-blur text-white grid place-items-center hover:bg-navy transition"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full bg-navy">
              <img
                src={activeArticle.featuredImage}
                alt={activeArticle.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy mb-2 inline-block">
                  {activeArticle.category}
                </span>
                <h1 className="text-xl sm:text-3xl font-extrabold leading-tight">
                  {activeArticle.title}
                </h1>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/80">
                  <span>Author: <b>{activeArticle.author}</b></span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 max-h-[60vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-navy/85 leading-relaxed prose prose-navy">
              <div className="whitespace-pre-line">
                {activeArticle.content}
              </div>
            </div>

            {/* Reader Footer CTA */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-navy/70">
                Inspired to take this road trip? Let us handle all permits, cabs, and hotels.
              </span>
              <button
                onClick={() => {
                  const a = activeArticle;
                  setActiveArticle(null);
                  setQuoteOpen(true);
                }}
                className="btn-gold !py-2.5 !px-6 text-xs font-bold shadow-md w-full sm:w-auto"
              >
                Plan This Road Trip With Us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {quoteOpen && (
        <BookingModal
          onClose={() => setQuoteOpen(false)}
        />
      )}
    </>
  );
}
