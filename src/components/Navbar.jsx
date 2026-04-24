import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiOutlineShoppingBag, HiPhone, HiTruck } from 'react-icons/hi';
import { Button, Badge, IconButton } from '@mui/material';
import Logo from './Logo';

const TopBar = () => {
  return (
    <div className="bg-blue-50 py-2 border-b border-blue-100 hidden md:block">
      <div className="container mx-auto px-6 flex justify-between items-center text-[12px] font-black tracking-widest uppercase text-blue-900/80">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <HiPhone className="text-blue-500" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-2 border-l border-blue-200 pl-6">
            <HiTruck className="text-blue-500" size={14} />
            <span>Free Delivery across India</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span>100% Pure Himalayan Water</span>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Quality', path: '/quality' },
    { name: 'Contact', path: '/contact' },
  ];

  // Helper to determine if navbar should be solid
  const isSolid = isScrolled || location.pathname !== '/';

  return (
    <>
      {/* 1. Top Bar - Absolute at the top, scrolls away */}
      <TopBar />

      {/* 2. Main Navbar - Sticky at the top */}
      <header className={`sticky top-0 z-[100] transition-all duration-500 ${
          isSolid ? 'bg-white shadow-2xl border-b border-blue-50' : 'bg-transparent'
        }`}>
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-[80px] md:h-[100px] flex items-center"
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                className="relative flex items-center justify-center"
              >
                <Logo 
                  variant={isSolid ? "dark" : "light"} 
                  className={`transition-all duration-500 ${isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'}`} 
                />
              </motion.div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="relative group py-2">
                  <span className={`text-[16px] font-black tracking-wide transition-colors duration-300 ${
                    location.pathname === link.path 
                      ? 'text-blue-600' 
                      : 'text-blue-900 group-hover:text-blue-500'
                  }`}>
                    {link.name}
                  </span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 rounded-full"
                    animate={{ width: location.pathname === link.path ? '100%' : '0%' }}
                  />
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/cart" className="flex items-center group cursor-pointer no-underline">
                <IconButton className="!bg-transparent">
                  <Badge badgeContent={2} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold' } }}>
                    <HiOutlineShoppingBag className="text-3xl text-blue-900" />
                  </Badge>
                </IconButton>
                <span className="hidden lg:inline text-[13px] font-black uppercase tracking-widest ml-2 text-blue-900/60 group-hover:text-blue-600 transition-colors">Cart</span>
              </Link>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/checkout">
                  <Button 
                    variant="contained" 
                    className="!rounded-full !bg-gradient-to-r !from-blue-900 !to-blue-600 !px-10 !py-3 !text-white !font-black !text-[15px] !normal-case !shadow-2xl"
                  >
                    Buy Now
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-4">
               <Link to="/cart">
                <Badge badgeContent={2} color="primary">
                    <HiOutlineShoppingBag className="text-blue-900 text-2xl" />
                  </Badge>
               </Link>
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-xl text-blue-900 bg-blue-50">
                <HiMenuAlt3 size={28} />
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-[110]" />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-[85%] bg-white z-[111] shadow-2xl p-10 flex flex-col">
                <div className="flex justify-between items-center mb-16">
                  <Logo variant="dark" className="h-12" />
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full"><HiX size={28} /></button>
                </div>
                <div className="flex flex-col space-y-8">
                  {navLinks.map((link) => (
                    <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-3xl font-black ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-300'}`}>
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link to="/checkout">
                    <Button variant="contained" fullWidth className="!rounded-2xl !bg-gradient-to-r !from-blue-900 !to-blue-600 !py-5 !text-white !font-black !text-xl !normal-case">Buy Now</Button>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
