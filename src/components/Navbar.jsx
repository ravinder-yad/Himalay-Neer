import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiOutlineShoppingBag, HiPhone, HiTruck, HiOutlineLogin, HiOutlineUserAdd, HiOutlineUser } from 'react-icons/hi';
import { Button, Badge } from '@mui/material';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';

const TopBar = () => {
  return (
    <div className="bg-blue-950 py-2.5 border-b border-blue-900/50 hidden md:block relative z-[110]">
      <div className="container mx-auto px-6 flex justify-between items-center text-[10px] font-bold tracking-[0.15em] uppercase text-blue-100/90">
        <div className="flex items-center space-x-8">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2.5 cursor-pointer">
            <div className="bg-blue-500/20 p-1.5 rounded-full">
               <HiPhone className="text-cyan-400" size={14} />
            </div>
            <span className="hover:text-white transition-colors">8000490844</span>
          </motion.div>
          <div className="flex items-center space-x-2.5 border-l border-blue-800/50 pl-8">
            <div className="bg-blue-500/20 p-1.5 rounded-full">
               <HiTruck className="text-cyan-400" size={14} />
            </div>
            <span>Free Delivery Across India</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-blue-900/50 px-4 py-1.5 rounded-full border border-blue-800/50 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-white font-black tracking-[0.2em]">100% Pure Himalayan Water</span>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Oops I need useNavigate

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
          isSolid ? 'bg-white/80 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border-b border-slate-200/50' : 'bg-transparent'
        }`}>
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-[80px] md:h-[90px] flex items-center"
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center"
              >
                <Logo 
                  variant="dark" 
                  className={`transition-all duration-500 ${isScrolled ? 'h-8 md:h-9' : 'h-10 md:h-11'}`} 
                />
              </motion.div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-slate-50/50 p-1.5 rounded-full border border-slate-200/50 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.name} to={link.path} className="relative px-5 py-2 rounded-full group">
                    <span className={`relative z-10 text-[12px] font-black tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? 'text-blue-700' : 'text-slate-500 group-hover:text-blue-600'
                    }`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
              <Link to="/cart">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-sm">
                   <Badge badgeContent={2} sx={{ '& .MuiBadge-badge': { backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', height: '22px', minWidth: '22px', borderRadius: '11px', border: '2px solid white' } }}>
                     <HiOutlineShoppingBag className="text-2xl text-slate-700" />
                   </Badge>
                </motion.div>
              </Link>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/checkout">
                  <Button 
                    variant="contained" 
                    className="!rounded-full !bg-gradient-to-r !from-blue-600 !to-cyan-500 hover:!from-blue-700 hover:!to-cyan-600 !px-6 !py-2.5 !text-white !font-black !text-[13px] !tracking-widest !uppercase !shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)]"
                  >
                    Buy Now
                  </Button>
                </Link>
              </motion.div>

              <div className="hidden lg:block w-px h-8 bg-slate-200 mx-1"></div>

              {user ? (
                <div className="hidden lg:flex items-center space-x-2 bg-white px-2 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 ml-4">
                  <Link to="/dashboard" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors font-semibold pr-3 border-r border-slate-100">
                    {user.profileImage ? (
                      <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden xl:inline-block text-sm pr-1">{user.name.split(' ')[0]}'s Dashboard</span>
                  </Link>
                  <button onClick={onLogout} className="px-3 py-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 font-black text-[10px] uppercase tracking-widest rounded-full transition-all flex items-center">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="hidden lg:flex items-center space-x-1 text-slate-500 hover:text-blue-600 font-black text-[11px] uppercase tracking-widest transition-colors group">
                    <HiOutlineLogin className="text-lg group-hover:scale-110 transition-transform" />
                    <span>Login</span>
                  </Link>
                  <Link to="/signup" className="hidden lg:flex items-center space-x-1 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all group border border-blue-100">
                    <HiOutlineUserAdd className="text-lg group-hover:scale-110 transition-transform" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-4">
               <Link to="/cart">
                <Badge badgeContent={2} sx={{ '& .MuiBadge-badge': { backgroundColor: '#2563eb', color: 'white' } }}>
                    <HiOutlineShoppingBag className="text-slate-700 text-2xl" />
                  </Badge>
               </Link>
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 rounded-full text-slate-700 bg-slate-50 border border-slate-200 shadow-sm active:scale-95 transition-transform">
                <HiMenuAlt3 size={24} />
              </button>
            </div>
          </div>
        </motion.nav>

      </header>

      {/* Mobile Drawer - Moved outside header to fix backdrop-filter fixed positioning bug */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1000]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-[100dvh] w-[85%] sm:w-[400px] bg-white z-[1001] shadow-2xl p-6 md:p-8 flex flex-col rounded-l-[2rem] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 shrink-0">
                <div className="w-[140px]">
                  <Logo variant="dark" />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors shrink-0"><HiX size={24} className="text-slate-700" /></button>
              </div>
              <div className="flex flex-col space-y-2 shrink-0">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-black py-4 px-6 rounded-2xl transition-colors block ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-800'}`}>
                      {link.name}
                    </Link>
                  )
                })}
                
                <div className="h-px bg-slate-100 my-4 w-full"></div>
                
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-2xl font-black py-4 px-6 rounded-2xl transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 block">
                      <div className="flex items-center space-x-3">
                        <HiOutlineUser />
                        <span>{user.name.split(' ')[0]}'s Dashboard</span>
                      </div>
                    </Link>
                    <button onClick={() => { setIsMobileMenuOpen(false); onLogout(); }} className="flex items-center space-x-3 text-2xl font-black py-4 px-6 rounded-2xl transition-colors text-slate-400 hover:bg-slate-50 hover:text-red-500 text-left w-full">
                      <HiOutlineLogin />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-2xl font-black py-4 px-6 rounded-2xl transition-colors text-slate-400 hover:bg-slate-50 hover:text-slate-800 block">
                      <div className="flex items-center space-x-3">
                        <HiOutlineLogin />
                        <span>Login</span>
                      </div>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-2xl font-black py-4 px-6 rounded-2xl transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100 block">
                      <div className="flex items-center space-x-3">
                        <HiOutlineUserAdd />
                        <span>Sign Up</span>
                      </div>
                    </Link>
                  </>
                )}
              </div>
              <div className="mt-auto pt-8 border-t border-slate-100 shrink-0">
                <Link to="/checkout" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <Button variant="contained" fullWidth className="!rounded-2xl !bg-gradient-to-r !from-blue-600 !to-cyan-500 !py-4 !text-white !font-black !text-lg !normal-case shadow-xl shadow-blue-500/20">Buy Now</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
