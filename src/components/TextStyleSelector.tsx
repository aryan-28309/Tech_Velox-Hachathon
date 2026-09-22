import React, { useState, useRef, useEffect } from 'react';
import { TextStyle, TextStyleOption } from '../types';
import { Type, Check, ChevronDown } from 'lucide-react';

export const TEXT_STYLE_OPTIONS: TextStyleOption[] = [
  {
    id: 'sans',
    name: 'Modern Sans',
    fontClass: 'font-style-sans',
    description: 'Clean, contemporary and balanced sans-serif',
    sample: 'Aa Bb 123 (Plus Jakarta)',
  },
  {
    id: 'serif',
    name: 'Classic Serif',
    fontClass: 'font-style-serif',
    description: 'Traditional editorial font for official documents',
    sample: 'Aa Bb 123 (Merriweather)',
  },
  {
    id: 'accessible',
    name: 'Easy Read',
    fontClass: 'font-style-accessible',
    description: 'Dyslexia-friendly font engineered for fast comprehension',
    sample: 'Aa Bb 123 (Lexend)',
  },
  {
    id: 'mono',
    name: 'Monospace',
    fontClass: 'font-style-mono',
    description: 'Fixed-width font ideal for numbers & codes',
    sample: 'Aa Bb 123 (JetBrains)',
  },
];

interface TextStyleSelectorProps {
  currentStyle: TextStyle;
  onStyleChange: (style: TextStyle) => void;
  isHighContrast: boolean;
}

export const TextStyleSelector: React.FC<TextStyleSelectorProps> = ({
  currentStyle,
  onStyleChange,
  isHighContrast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = TEXT_STYLE_OPTIONS.find((opt) => opt.id === currentStyle) || TEXT_STYLE_OPTIONS[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        id="btn-text-style-selector"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Text Style: ${activeOption.name}. Click to change font style.`}
        className={`flex items-center gap-1.5 px-3 py-2 sm:px-2.5 sm:py-1 min-h-[38px] sm:min-h-0 rounded-sm text-xs font-semibold cursor-pointer transition-colors ${
          isHighContrast
            ? isOpen
              ? 'bg-white text-black font-black border-2 border-white'
              : 'border-2 border-white text-white hover:bg-neutral-900'
            : isOpen
              ? 'bg-indigo-600 text-white font-bold shadow-xs'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
        }`}
      >
        <Type className="w-4.5 h-4.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="hidden xs:inline">Text Style:</span>
        <span className="font-bold">{activeOption.name}</span>
        <ChevronDown className={`w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover / Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute right-0 mt-1.5 w-64 md:w-72 rounded-xl shadow-2xl border z-50 p-2 animate-in fade-in duration-100 ${
            isHighContrast
              ? 'bg-black border-2 border-white text-white'
              : 'bg-[#0f172a] border-slate-700 text-slate-100 shadow-black/80'
          }`}
        >
          <div className={`px-2.5 py-1.5 mb-1 border-b flex items-center justify-between ${
            isHighContrast ? 'border-white' : 'border-slate-800'
          }`}>
            <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
              isHighContrast ? 'text-white' : 'text-slate-400'
            }`}>
              Select Reading Font Style
            </span>
            <span className={`text-[10px] font-bold ${
              isHighContrast ? 'text-white underline' : 'text-indigo-400'
            }`}>Live Preview</span>
          </div>

          <div className="space-y-1">
            {TEXT_STYLE_OPTIONS.map((option) => {
              const isSelected = option.id === currentStyle;
              return (
                <button
                  key={option.id}
                  id={`text-style-opt-${option.id}`}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onStyleChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start justify-between gap-2 cursor-pointer ${
                    option.fontClass
                  } ${
                    isSelected
                      ? isHighContrast
                        ? 'bg-white text-black font-black border-2 border-white'
                        : 'bg-indigo-600/30 text-white border border-indigo-500 font-bold shadow-2xs'
                      : isHighContrast
                        ? 'hover:bg-neutral-900 text-neutral-200 border border-transparent hover:border-white'
                        : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-black tracking-tight">
                        {option.name}
                      </span>
                    </div>
                    <span className={`text-[10px] block leading-tight mt-0.5 ${
                      isHighContrast ? 'text-neutral-300' : 'text-slate-400'
                    }`}>
                      {option.description}
                    </span>
                    <span className={`text-xs font-semibold block mt-1 ${
                      isHighContrast ? 'text-white font-mono' : 'text-indigo-300'
                    }`}>
                      {option.sample}
                    </span>
                  </div>

                  {isSelected && (
                    <div className={`mt-0.5 p-1 rounded-full ${
                      isHighContrast ? 'bg-black text-white border border-black' : 'bg-indigo-500 text-white'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className={`mt-2 pt-1.5 border-t px-2 text-[10px] leading-tight ${
            isHighContrast ? 'border-white text-neutral-300' : 'border-slate-800 text-slate-400'
          }`}>
            💡 Changes the typography style across the entire portal for optimal readability.
          </div>
        </div>
      )}
    </div>
  );
};
