import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineClock
} from 'react-icons/hi';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-blue-900 text-white pt-32 relative overflow-hidden">
      {/* 🌊 Wave Divider at Top */}
      <div className="absolute top-0 left-0 w-full leading-[0] rotate-180 transform -translate-y-[99%]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-blue-900">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 🔷 1. Top CTA Strip (Attention Grabber) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-12 md:p-16 mb-24 border border-white/10 flex flex-col md:flex-row items-center justify-between shadow-2xl"
        >
          <div className="text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Stay Fresh with Himalay Neer 💧</h2>
            <p className="text-blue-200 font-bold uppercase tracking-[0.4em] text-xs opacity-70">Pure Purity at Your Doorstep</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="contained" 
              className="!rounded-full !bg-gradient-to-r !from-blue-600 !to-blue-400 !text-white !px-16 !py-6 !font-black !text-2xl !normal-case !shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
            >
              Order Now <HiOutlineArrowRight className="ml-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* 🧭 2. Main Footer (4 Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24">
          
          {/* 🟦 Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="inline-block mb-10">
              <Logo variant="light" className="h-16 md:h-20" />
            </Link>
            <h3 className="text-xl font-black text-blue-300 mb-2">Pure Water Inspired by Nature</h3>
            <p className="text-blue-100/60 leading-relaxed font-medium text-sm">
              Delivering freshness from the Himalayas to your home. Bottled at source for ultimate purity.
            </p>
          </div>

          {/* 🟦 Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-black mb-8 tracking-wide uppercase text-white/40">Quick Links</h3>
            <ul className="space-y-4 text-center md:text-left">
              {['Home', 'About', 'Products', 'Quality', 'Contact'].map(link => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} 
                    className="text-blue-100/60 hover:text-blue-300 transition-all duration-300 font-bold text-lg"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🟦 Column 3: Our Products */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-black mb-8 tracking-wide uppercase text-white/40">Our Products</h3>
            <ul className="space-y-4 text-center md:text-left">
              {['250ml Bottle', '500ml Bottle', '1L Bottle', '20L Jar'].map(product => (
                <li key={product}>
                  <Link to="/products" className="text-blue-100/60 hover:text-blue-300 transition-all duration-300 font-bold text-lg">
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🟦 Column 4: Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-black mb-8 tracking-wide uppercase text-white/40">Contact Info</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-blue-100/60 text-sm">
                <HiOutlineLocationMarker className="text-blue-400 mt-1 shrink-0" size={24} />
                <span>Himalayan Spring Valley, Solan, HP - 173212</span>
              </li>
              <li className="flex items-center gap-4 text-blue-100/60 text-sm">
                <HiOutlinePhone className="text-blue-400 shrink-0" size={24} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4 text-blue-100/60 text-sm">
                <HiOutlineMail className="text-blue-400 shrink-0" size={24} />
                <span>purity@himalayneer.com</span>
              </li>
              <li className="flex items-center gap-4 text-blue-100/60 text-sm pt-4 border-t border-white/5">
                <HiOutlineClock className="text-blue-400 shrink-0" size={24} />
                <span>Open 24/7 for Freshness</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 🌐 3. Social Media Row */}
        <div className="flex justify-center gap-8 mb-24">
          {[
            { icon: <FaInstagram />, label: 'Instagram', color: 'hover:text-[#E1306C] hover:shadow-[#E1306C]/50' },
            { icon: <FaFacebook />, label: 'Facebook', color: 'hover:text-[#1877F2] hover:shadow-[#1877F2]/50' },
            { icon: <FaWhatsapp />, label: 'WhatsApp', color: 'hover:text-[#25D366] hover:shadow-[#25D366]/50' }
          ].map((s, i) => (
            <motion.a 
              key={i} 
              href="#" 
              whileHover={{ y: -10, scale: 1.1 }}
              className={`w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px] ${s.color}`}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* 📩 4. Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-24">
          <h3 className="text-2xl font-black mb-6">Join the Purity Club</h3>
          <p className="text-blue-100/60 mb-10">Get the latest news and health tips delivered to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-full py-5 px-8 focus:outline-none focus:border-blue-400 transition-all placeholder:text-white/20 text-lg"
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-full transition-all shadow-xl shadow-blue-900/20"
            >
              Subscribe
            </button>
          </form>
          <AnimatePresence>
            {subscribed && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-400 font-black uppercase tracking-widest mt-6 flex items-center justify-center gap-2"
              >
                <HiOutlineCheckCircle /> Welcome to the family!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ⚖️ 5. Bottom Bar (Final Strip) */}
        <div className="py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-white/30 text-xs font-black uppercase tracking-[0.2em]">
          <p className="mb-6 md:mb-0">© 2026 Himalay Neer. All Rights Reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>

      {/* Decorative Glows */}
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px] opacity-20 pointer-events-none" />
      <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[150px] opacity-10 pointer-events-none" />
    </footer>
  );
};

export default Footer;

