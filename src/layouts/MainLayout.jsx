import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const MainLayout = () => {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/signup', '/forgot-password', '/dashboard'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  
  const hideNavbarRoutes = ['/dashboard'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
