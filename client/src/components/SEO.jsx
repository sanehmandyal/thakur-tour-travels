import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  schema
}) {
  const siteTitle = 'Thakur Tour & Travel | Himachal, Punjab & Chandigarh Tours & Cabs';
  const fullTitle = title ? `${title} | Thakur Tour & Travel` : siteTitle;
  const defaultDesc = 'Book customized Himachal Pradesh, Punjab and Chandigarh tour packages and luxury cabs with Thakur Tour & Travel. Verified mountain drivers, 24/7 assistance, and best custom quotes.';
  const metaDesc = description || defaultDesc;
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://thakurtourandtravels.com');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Thakur Tour & Travel" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Schema Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
