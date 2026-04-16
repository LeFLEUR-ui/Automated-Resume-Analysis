import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 border-t border-gray-100 bg-white text-center">
      <div className="flex justify-center mb-6">
        <img 
          src="/src/assets/logo.png" 
          alt="Mariwasa Logo" 
          className="h-8 w-8 object-contain grayscale opacity-50" 
        />
      </div>

      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
        Mariwasa Siam Ceramics Inc.
      </p>

      <p className="text-gray-400 text-[10px]">
        © {new Date().getFullYear()} All rights reserved. Technology powered by AI.
      </p>
    </footer>
  );
};

export default Footer;