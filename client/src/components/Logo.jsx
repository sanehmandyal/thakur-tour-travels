export default function Logo({ dark = false, className = 'h-12' }) {
  const textColor = dark ? '#FFFFFF' : '#0B2545';
  const subtitleColor = dark ? '#F59E0B' : '#0284C7';
  const goldLight = '#FDE047';
  const goldMain = '#F59E0B';

  return (
    <div className="inline-flex items-center gap-3.5 select-none group cursor-pointer">
      {/* High-Resolution Emblem with Name Embedded inside Shield */}
      <svg
        viewBox="0 0 140 140"
        className={`${className} aspect-square shrink-0 drop-shadow-md transition-transform duration-300 group-hover:scale-105`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="60%" stopColor="#123B68" />
            <stop offset="100%" stopColor="#06162A" />
          </linearGradient>

          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Curved Text Path for Top Arc */}
          <path
            id="topTextPath"
            d="M 18, 70 A 52, 52 0 1, 1 122, 70"
            fill="none"
          />
        </defs>

        {/* Outer Shield with Gold Border */}
        <circle cx="70" cy="70" r="66" fill="url(#shieldGrad)" stroke="url(#goldRing)" strokeWidth="4" />
        <circle cx="70" cy="70" r="60" stroke="rgba(253, 224, 71, 0.3)" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Arched Name around the top of the emblem */}
        <text className="font-display font-black text-[9.5px] uppercase tracking-[0.2em]" fill="url(#goldRing)">
          <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
            ★ THAKUR TOUR &amp; TRAVELS ★
          </textPath>
        </text>

        {/* Inner Scenic Landscape Circle */}
        <g clipPath="url(#innerClip)">
          <clipPath id="innerClip">
            <circle cx="70" cy="76" r="42" />
          </clipPath>

          <circle cx="70" cy="76" r="42" fill="#071930" />

          {/* Golden Sun */}
          <circle cx="70" cy="62" r="22" fill="url(#sunGrad)" opacity="0.95" />

          {/* Background Peaks */}
          <polygon points="26,104 54,54 82,104" fill="#0284C7" opacity="0.8" />
          <polygon points="54,54 46,68 52,64 54,71 58,65 64,69" fill="#FFFFFF" />

          <polygon points="58,104 88,48 116,104" fill="#0369A1" opacity="0.8" />
          <polygon points="88,48 80,62 86,58 88,65 93,59 98,63" fill="#FFFFFF" />

          {/* Foreground Major Peak */}
          <polygon points="34,112 70,38 106,112" fill="#0B2545" />
          {/* Main Snow Cap */}
          <polygon points="70,38 58,62 66,57 70,66 76,57 84,63" fill="#FFFFFF" />

          {/* Winding Golden Mountain Highway */}
          <path d="M70 68 Q 74 84, 56 114 L 84 114 Q 78 88, 71 68 Z" fill="url(#roadGrad)" />
          <path d="M70.5 74 L 70.5 79 M70 85 L 69.5 91 M69 97 L 68 106" stroke="#0B2545" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Inner Ring Separator */}
        <circle cx="70" cy="76" r="42" stroke="url(#goldRing)" strokeWidth="2" fill="none" />

        {/* Bottom Banner Tag */}
        <rect x="36" y="108" width="68" height="18" rx="9" fill="#0B2545" stroke="url(#goldRing)" strokeWidth="1.8" />
        <text x="70" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800" letterSpacing="1.2">
          ESTD. 2010
        </text>
      </svg>

      {/* Brand Typography Header */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-2">
          <span
            className="font-display text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: textColor }}
          >
            THAKUR
          </span>
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.22em]"
            style={{ color: subtitleColor }}
          >
            TOUR &amp; TRAVELS
          </span>
        </div>

        <span className="text-[9px] font-bold text-slate-400 tracking-[0.12em] mt-1 hidden sm:block uppercase">
          Himachal • Punjab • Luxury Cabs
        </span>
      </div>
    </div>
  );
}
