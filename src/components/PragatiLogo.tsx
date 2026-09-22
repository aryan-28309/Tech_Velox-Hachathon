import React from 'react';
import pragatiLogoImg from '../assets/images/regenerated_image_1789747511949.jpg';

interface PragatiLogoProps {
  className?: string;
  variant?: 'header' | 'mark' | 'full' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isHighContrast?: boolean;
  themeMode?: 'dark' | 'light';
}

export const PragatiLogo: React.FC<PragatiLogoProps> = ({
  className = '',
  variant = 'header',
  size = 'md',
  isHighContrast = false,
  themeMode = 'dark',
}) => {
  // Dimensions mapping for emblem mark
  const markDimensions = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32',
  }[size];

  // The Master Emblem Element (Loaded from the updated image asset)
  const EmblemImage = (
    <img
      src={pragatiLogoImg}
      alt="Pragati Bharat Emblem"
      referrerPolicy="no-referrer"
      className={`${markDimensions} object-contain rounded-2xl shrink-0 drop-shadow-md transition-transform hover:scale-105 select-none`}
    />
  );

  // Variant: Just the mark icon
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} title="Pragati Bharat">
        {EmblemImage}
      </div>
    );
  }

  // Variant: Luxury Badge presentation (full standalone app icon badge matching user design)
  if (variant === 'badge') {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl border shadow-2xl overflow-hidden transition-all text-center max-w-sm mx-auto ${
          isHighContrast
            ? 'bg-black border-2 border-white text-white'
            : 'bg-gradient-to-b from-[#182a5c] via-[#0e1c3e] to-[#081026] border-blue-500/40 text-white'
        } ${className}`}
      >
        {/* Ambient Top Backlight */}
        {!isHighContrast && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.25),transparent_70%)] pointer-events-none" />
        )}

        {/* Large Central Emblem */}
        <div className="relative mb-3 flex items-center justify-center">
          <img
            src={pragatiLogoImg}
            alt="Pragati Bharat App Logo"
            referrerPolicy="no-referrer"
            className="w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-3xl shadow-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Brand Details */}
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">Pragati</span>
            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent tracking-tight">
              Bharat
            </span>
          </div>

          <p className="text-[11px] sm:text-xs font-semibold text-blue-200/90 mt-1 tracking-wide">
            Find Your Scholarship • Build Your Future
          </p>

          <div className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-900/60 border border-blue-400/30 text-[10px] font-bold text-amber-300 tracking-wider uppercase">
            <span>By Tech Velox</span>
            <span className="text-blue-300">•</span>
            <span className="text-emerald-300">National Portal</span>
          </div>
        </div>
      </div>
    );
  }

  // Variant: Full stacked composition
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative mb-2">
          {EmblemImage}
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span
              className={`font-black tracking-tight text-xl sm:text-2xl ${
                isHighContrast ? 'text-white' : themeMode === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Pragati
            </span>
            <span className="font-black tracking-tight text-xl sm:text-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Bharat
            </span>
          </div>
          <span
            className={`block text-[10px] sm:text-xs font-bold tracking-[0.24em] uppercase mt-0.5 ${
              isHighContrast ? 'text-neutral-200' : themeMode === 'light' ? 'text-amber-800' : 'text-amber-300'
            }`}
          >
            BY TECH VELOX
          </span>
        </div>
      </div>
    );
  }

  // Default Variant: 'header' (Horizontal layout for navigation bar & brand headings)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Emblem Frame with soft border and subtle hover feedback */}
      <div className="relative flex items-center justify-center shrink-0">
        {EmblemImage}
      </div>

      {/* Typography with Tech Velox Sub-Branding */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          {/* "Pragati" in Crisp High-Contrast Display Font */}
          <span
            className={`text-lg xs:text-xl sm:text-2xl font-black tracking-tight leading-none ${
              isHighContrast
                ? 'text-white font-black'
                : themeMode === 'light'
                  ? 'text-slate-950 font-black'
                  : 'text-white font-black drop-shadow-sm'
            }`}
          >
            Pragati
          </span>

          {/* "Bharat" in Radiant Saffron/Gold with Subtle Underline Glow */}
          <span
            className={`text-lg xs:text-xl sm:text-2xl font-black tracking-tight leading-none ${
              isHighContrast
                ? 'text-white underline underline-offset-4'
                : 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent drop-shadow-sm'
            }`}
          >
            Bharat
          </span>
        </div>

        {/* Tagline / Subtitle */}
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`text-[10px] sm:text-[11px] font-extrabold tracking-[0.22em] uppercase shrink-0 ${
              isHighContrast
                ? 'text-neutral-200 font-bold'
                : themeMode === 'light'
                  ? 'text-amber-700 font-extrabold'
                  : 'text-amber-300 font-bold'
            }`}
          >
            BY TECH VELOX
          </span>
          <span
            className={`text-[10px] ${
              isHighContrast ? 'text-white' : themeMode === 'light' ? 'text-slate-400' : 'text-blue-400/60'
            }`}
          >
            •
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-medium truncate ${
              isHighContrast ? 'text-white' : themeMode === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            National Scholarship Portal
          </span>
        </div>
      </div>
    </div>
  );
};
