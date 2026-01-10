import React, { useState, useEffect } from 'react';

export default function CarLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden z-50">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 text-center">
        {/* Realistic Car Animation */}
        <div className="relative w-80 h-40 mb-12 mx-auto">
          {/* Road */}
          <div className="absolute bottom-8 left-0 right-0 h-1 bg-gray-300"></div>
          
          {/* Moving road lines */}
          <div className="absolute bottom-8 left-0 right-0 h-0.5 overflow-hidden">
            <div className="h-full w-full flex gap-12" style={{ animation: 'slideRoad 1.5s linear infinite' }}>
              <div className="w-20 h-full bg-yellow-400"></div>
              <div className="w-20 h-full bg-yellow-400"></div>
              <div className="w-20 h-full bg-yellow-400"></div>
              <div className="w-20 h-full bg-yellow-400"></div>
              <div className="w-20 h-full bg-yellow-400"></div>
            </div>
          </div>

          {/* Realistic Car SVG */}
          <svg viewBox="0 0 280 120" className="w-full h-full" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}>
            {/* Car shadow */}
            <ellipse cx="140" cy="105" rx="65" ry="6" fill="rgba(0,0,0,0.1)" />
            
            {/* Car body */}
            <g transform="translate(70, 45)">
              {/* Underbody */}
              <rect x="5" y="35" width="130" height="8" rx="2" fill="#2d3748"/>
              
              {/* Main body - lower */}
              <path d="M 15 35 L 125 35 L 125 42 L 15 42 Z" 
                    fill="url(#bodyGradient)"/>
              
              {/* Main body - upper */}
              <path d="M 25 20 L 45 10 L 90 10 L 110 20 L 120 30 L 120 35 L 25 35 Z" 
                    fill="url(#bodyGradient)" 
                    stroke="#e53e3e" 
                    strokeWidth="0.5"/>
              
              {/* Body shine highlight */}
              <path d="M 30 15 L 50 12 L 85 12 L 105 15 L 105 25 L 30 25 Z" 
                    fill="url(#shineGradient)" 
                    opacity="0.4"/>
              
              {/* Windshield */}
              <path d="M 47 11 L 58 11 L 58 20 L 50 20 Z" 
                    fill="url(#glassGradient)"/>
              
              {/* Front side window */}
              <path d="M 61 11 L 72 11 L 72 20 L 61 20 Z" 
                    fill="url(#glassGradient)"/>
              
              {/* Rear side window */}
              <path d="M 75 11 L 87 11 L 95 20 L 75 20 Z" 
                    fill="url(#glassGradient)"/>
              
              {/* Door lines */}
              <line x1="60" y1="20" x2="60" y2="35" stroke="#b91c1c" strokeWidth="0.5" opacity="0.6"/>
              <line x1="73" y1="20" x2="73" y2="35" stroke="#b91c1c" strokeWidth="0.5" opacity="0.6"/>
              
              {/* Door handles */}
              <rect x="55" y="27" width="4" height="1.5" rx="0.5" fill="#4a5568"/>
              <rect x="68" y="27" width="4" height="1.5" rx="0.5" fill="#4a5568"/>
              
              {/* Side mirror */}
              <ellipse cx="43" cy="18" rx="3" ry="2.5" fill="#1a202c" stroke="#2d3748" strokeWidth="0.5"/>
              
              {/* Front bumper detail */}
              <path d="M 10 35 L 15 35 L 15 40 L 12 42 L 10 40 Z" fill="#2d3748"/>
              
              {/* Rear bumper detail */}
              <path d="M 125 35 L 130 35 L 132 40 L 130 42 L 125 40 Z" fill="#2d3748"/>
              
              {/* Front grille */}
              <rect x="8" y="30" width="8" height="3" fill="#1a202c"/>
              <line x1="9" y1="30" x2="9" y2="33" stroke="#4a5568" strokeWidth="0.3"/>
              <line x1="11" y1="30" x2="11" y2="33" stroke="#4a5568" strokeWidth="0.3"/>
              <line x1="13" y1="30" x2="13" y2="33" stroke="#4a5568" strokeWidth="0.3"/>
              <line x1="15" y1="30" x2="15" y2="33" stroke="#4a5568" strokeWidth="0.3"/>
              
              {/* Headlights */}
              <ellipse cx="12" cy="28" rx="2.5" ry="2" fill="#fff8dc" stroke="#f6e05e" strokeWidth="0.5"/>
              <ellipse cx="12" cy="28" rx="1" ry="0.8" fill="#fef3c7" className="animate-pulse"/>
              
              {/* Taillights */}
              <ellipse cx="128" cy="28" rx="2" ry="1.5" fill="#dc2626"/>
              <ellipse cx="128" cy="28" rx="0.8" ry="0.6" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
              
              {/* Front wheel */}
              <g>
                <circle cx="35" cy="42" r="9" fill="#1a202c"/>
                <circle cx="35" cy="42" r="7" fill="#2d3748"/>
                <circle cx="35" cy="42" r="5" fill="#4a5568"/>
                <circle cx="35" cy="42" r="2.5" fill="#718096"/>
                <circle cx="35" cy="42" r="1.5" fill="#a0aec0"/>
                <line x1="35" y1="37" x2="35" y2="47" stroke="#718096" strokeWidth="0.5"/>
                <line x1="30" y1="42" x2="40" y2="42" stroke="#718096" strokeWidth="0.5"/>
                <line x1="31" y1="38" x2="39" y2="46" stroke="#718096" strokeWidth="0.5"/>
                <line x1="31" y1="46" x2="39" y2="38" stroke="#718096" strokeWidth="0.5"/>
              </g>
              
              {/* Rear wheel */}
              <g>
                <circle cx="105" cy="42" r="9" fill="#1a202c"/>
                <circle cx="105" cy="42" r="7" fill="#2d3748"/>
                <circle cx="105" cy="42" r="5" fill="#4a5568"/>
                <circle cx="105" cy="42" r="2.5" fill="#718096"/>
                <circle cx="105" cy="42" r="1.5" fill="#a0aec0"/>
                <line x1="105" y1="37" x2="105" y2="47" stroke="#718096" strokeWidth="0.5"/>
                <line x1="100" y1="42" x2="110" y2="42" stroke="#718096" strokeWidth="0.5"/>
                <line x1="101" y1="38" x2="109" y2="46" stroke="#718096" strokeWidth="0.5"/>
                <line x1="101" y1="46" x2="109" y2="38" stroke="#718096" strokeWidth="0.5"/>
              </g>
              
              {/* Wheel arches shadows */}
              <path d="M 26 35 Q 35 30 44 35" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
              <path d="M 96 35 Q 105 30 114 35" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
            </g>

            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <linearGradient id="shineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand name */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-wider">
          ALPHA CARS
        </h1>

        <p className="text-gray-500 text-sm mb-8 tracking-wide">
          Premium Pre-Owned Vehicles
        </p>

        {/* Loading bar */}
        <div className="w-80 max-w-md mx-auto mb-4">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #E8B923, #34495E, #E8B923)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite'
              }}
            >
            </div>
          </div>
        </div>

        {/* Progress percentage */}
        <div className="text-xl font-semibold" style={{ color: '#E8B923' }}>
          {progress}%
        </div>
      </div>

      <style>{`
        @keyframes slideRoad {
          0% { transform: translateX(0); }
          100% { transform: translateX(-140px); }
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}