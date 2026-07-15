import React from 'react';

const Logo = ({ className = "h-9 md:h-11", variant = "dark" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon: Vector Re-creation of Uploaded Image */}
      <svg 
        className="h-full w-auto flex-shrink-0"
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <clipPath id="cut-bottom">
          <rect x="0" y="0" width="100" height="72" />
        </clipPath>
        {/* Mountain Silhouette */}
        <path 
          d="M -10 78 L 20 20 L 35 48 L 50 10 L 65 48 L 80 20 L 110 78" 
          fill="none" 
          stroke={variant === 'dark' ? "#1E40AF" : "#FFFFFF"} 
          strokeWidth="15" 
          strokeLinejoin="miter" 
          clipPath="url(#cut-bottom)"
        />
        {/* Water Droplet */}
        <path 
          d="M 50 25 C 68 55 75 66 75 80 C 75 93 64 100 50 100 C 36 100 25 93 25 80 C 25 66 32 55 50 25 Z" 
          fill="#3B82F6" 
        />
        {/* Droplet Highlight Crescent */}
        <path 
          d="M 66 75 A 14 14 0 0 1 54 96" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
      </svg>
      
      {/* Text Container */}
      <div className="flex flex-col justify-center h-full pt-1">
        <div className={`font-black text-[20px] md:text-[23px] leading-[0.85] tracking-tight uppercase flex items-center ${variant === 'dark' ? '' : 'drop-shadow-md'}`}>
          <span style={{ color: variant === 'dark' ? '#1E40AF' : '#FFFFFF' }}>HIMALAY</span>
          <span style={{ color: '#3B82F6' }}>NEER</span>
        </div>
        <div 
          className={`text-[6px] md:text-[7px] font-black uppercase leading-tight mt-0.5 w-full ${variant === 'dark' ? 'text-[#1E40AF]' : 'text-blue-100 drop-shadow-sm'}`}
          style={{ textAlignLast: 'justify' }}
        >
          Himalayan Natural Mineral Water
        </div>
      </div>
    </div>
  );
};

export default Logo;
