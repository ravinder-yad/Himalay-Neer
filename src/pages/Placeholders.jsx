import React from 'react';

const Placeholder = ({ title }) => (
  <div className="pt-32 pb-20 container mx-auto px-6 min-h-[60vh] flex flex-col items-center justify-center text-center">
    <h1 className="text-4xl font-bold text-blue-900 mb-4">{title}</h1>
    <p className="text-slate-600 max-w-md">
      We are currently brewing some Himalayan freshness here. Stay tuned for our amazing {title.toLowerCase()} page!
    </p>
  </div>
);

export const About = () => <Placeholder title="About Us" />;
export const Products = () => <Placeholder title="Our Products" />;
export const Quality = () => <Placeholder title="Quality Control" />;
export const Contact = () => <Placeholder title="Contact Us" />;
