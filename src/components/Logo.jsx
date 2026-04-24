import React from 'react';

const Logo = ({ className = "h-16", variant = "dark" }) => {
  // Using a direct path to avoid Vite's import analysis error.
  // The user should place 'logo_final.png' in the 'public' folder.
  const logoPath = "/logo_final.png";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={logoPath} 
        alt="Himalay Neer" 
        className="h-full w-auto object-contain drop-shadow-2xl"
        onError={(e) => {
          // If image is missing, show a placeholder text to keep the app running
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = '<span class="text-blue-900 font-black text-xl italic">Himalay Neer</span>';
        }}
      />
    </div>
  );
};

export default Logo;
